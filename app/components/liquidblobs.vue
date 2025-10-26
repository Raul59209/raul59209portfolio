<template>
  <div class="liquid-container">
    <canvas ref="canvasRef" class="liquid-bg"></canvas>

    <!-- Intro text overlay -->
    <div
      ref="introText"
      class="intro-text text-4xl md:text-6xl font-bold text-white text-center"
    >
      Cherchez-vous un alternant ?
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
const introText = ref(null)
let scene, camera, renderer, lines, animationId
let mouse = new THREE.Vector2(0, 0)
const particleLayers = 3
const particlesData = []

let scrollProgress = 0
let displayedScroll = 0
const MIN_Z = 2
const MAX_Z = 8
let particlesHidden = false

function init() {
  const canvas = canvasRef.value
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050510) // dark space tone

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = MAX_Z

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // === Create particle layers ===
  for (let layer = 0; layer < particleLayers; layer++) {
    const geometry = new THREE.BufferGeometry()
    const particleCount = 500 + layer * 250
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const color = new THREE.Color(`hsl(${200 + Math.random() * 100}, 70%, 70%)`)
    const material = new THREE.PointsMaterial({
      color,
      size: 0.09 - layer * 0.015,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)
    particlesData.push({ geometry, pointCloud, particleCount })
  }

  // === Lines (subtle, faintly visible) ===
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x1a2235,
    opacity: 0.03,
    transparent: true,
  })
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(5000 * 3), 3))
  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)

  animate()
}

function animate() {
  animationId = requestAnimationFrame(animate)
  displayedScroll += (scrollProgress - displayedScroll) * 0.08

  // Rotate faster for more dynamic motion
  if (!particlesHidden) {
    particlesData.forEach((layerData, idx) => {
      layerData.pointCloud.rotation.y += 0.0025 + idx * 0.0012
      layerData.pointCloud.rotation.x += 0.001
    })
    updateLines()
  }

  // Zoom with scroll
  const targetZ = THREE.MathUtils.lerp(MAX_Z, MIN_Z, displayedScroll)
  camera.position.z += (targetZ - camera.position.z) * 0.08

  // Fade effect for particles
  particlesData.forEach(({ pointCloud }) => {
    pointCloud.material.opacity = Math.max(0.5, 1 - displayedScroll * 0.6)
  })
  lines.material.opacity = Math.max(0.015, 0.03 * (1 - displayedScroll * 0.6))

  // Animate intro text opacity and position
  if (introText.value) {
    const opacity = Math.max(0, 1 - displayedScroll * 1.5)
    introText.value.style.opacity = opacity
    introText.value.style.transform = `translate(-50%, calc(-50% + ${displayedScroll * 100}px))`
  }

  renderer.render(scene, camera)
}

function updateLines() {
  const maxDistance = 1.5
  const positions = lines.geometry.attributes.position.array
  let ptr = 0

  particlesData.forEach((layerData) => {
    const posAttr = layerData.geometry.attributes.position
    const count = layerData.particleCount
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posAttr.getX(i) - posAttr.getX(j)
        const dy = posAttr.getY(i) - posAttr.getY(j)
        const dz = posAttr.getZ(i) - posAttr.getZ(j)
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < maxDistance && ptr + 6 < positions.length) {
          positions[ptr++] = posAttr.getX(i)
          positions[ptr++] = posAttr.getY(i)
          positions[ptr++] = posAttr.getZ(i)
          positions[ptr++] = posAttr.getX(j)
          positions[ptr++] = posAttr.getY(j)
          positions[ptr++] = posAttr.getZ(j)
        }
      }
    }
  })
  lines.geometry.setDrawRange(0, ptr / 3)
  lines.geometry.attributes.position.needsUpdate = true
}

function onScroll() {
  const maxScroll = window.innerHeight * 1.8
  scrollProgress = Math.min(window.scrollY / maxScroll, 1)
}

function onWheel(e) {
  const sensitivity = 0.0015
  scrollProgress = Math.min(Math.max(scrollProgress + e.deltaY * sensitivity, 0), 1)
}

// 🌌 Restore floaty, light parallax movement
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  // more exaggerated parallax for “lighter” movement
  camera.position.x += (mouse.x * 4 - camera.position.x) * 0.08
  camera.position.y += (mouse.y * 4 - camera.position.y) * 0.08
  camera.lookAt(scene.position)
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('wheel', onWheel)
  renderer.dispose()
})
</script>

<style scoped>
.liquid-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.liquid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.intro-text {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 1px;
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
  z-index: 10;
}
</style>
