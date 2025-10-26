<template>
  <canvas ref="canvasRef" class="fixed top-0 left-0 w-full h-full"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'


const canvasRef = ref(null)
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

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = MAX_Z

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // === Create particle layers ===
  for (let layer = 0; layer < particleLayers; layer++) {
    const geometry = new THREE.BufferGeometry()
    const particleCount = 500 + layer * 200
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const color = new THREE.Color(`hsl(${Math.random() * 360}, 70%, 60%)`)
    const material = new THREE.PointsMaterial({
      color,
      size: 0.08 - layer * 0.015,
      transparent: true,
      opacity: 0.9,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)
    particlesData.push({ geometry, pointCloud, particleCount })
  }

  // === Lines ===
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2, transparent: true })
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(5000 * 3), 3))
  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)

  animate()
}

function animate() {
  animationId = requestAnimationFrame(animate)
  displayedScroll += (scrollProgress - displayedScroll) * 0.1

  if (!particlesHidden) {
    particlesData.forEach((layerData, idx) => {
      layerData.pointCloud.rotation.y += 0.0018 + idx * 0.001
      layerData.pointCloud.rotation.x += 0.0009
    })
    updateLines()
  }

  // Zoom based on scroll
  const targetZ = THREE.MathUtils.lerp(MAX_Z, MIN_Z, displayedScroll)
  camera.position.z += (targetZ - camera.position.z) * 0.08

  // Fade out as user scrolls
  particlesData.forEach(({ pointCloud }) => {
    pointCloud.material.opacity = 1 - displayedScroll * 1.2
  })
  lines.material.opacity = 1 - displayedScroll * 1.2

  // When fully scrolled, hide the whole scene
  if (displayedScroll >= 1 && !particlesHidden) {
    particlesData.forEach(({ pointCloud }) => (pointCloud.visible = false))
    lines.visible = false
    particlesHidden = true
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
  const maxScroll = window.innerHeight * 1.2
  scrollProgress = Math.min(window.scrollY / maxScroll, 1)
}

function onWheel(e) {
  const sensitivity = 0.002
  scrollProgress = Math.min(Math.max(scrollProgress + e.deltaY * sensitivity, 0), 1)
}

function onMouseMove(event) {
  if (particlesHidden) return
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.07
  camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.07
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
canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  pointer-events: none;
}
</style>
