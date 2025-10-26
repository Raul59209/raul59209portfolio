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
let particleLayers = 3
const particlesData = []

let scrollProgress = 0
let displayedScroll = 0
const MIN_Z = 2
const MAX_Z = 8
let particlesHidden = false
let isMobile = false

function detectMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 768
}

function init() {
  const canvas = canvasRef.value
  isMobile = detectMobile()
  
  // Reduce complexity on mobile
  if (isMobile) {
    particleLayers = 2
  }
  
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050510)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = MAX_Z

  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: !isMobile, // Disable antialiasing on mobile for performance
    powerPreference: 'high-performance'
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2)) // Limit pixel ratio on mobile

  // === Create particle layers ===
  for (let layer = 0; layer < particleLayers; layer++) {
    const geometry = new THREE.BufferGeometry()
    // Significantly reduce particle count on mobile
    const baseCount = isMobile ? 150 : 500
    const particleCount = baseCount + layer * (isMobile ? 75 : 250)
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
      size: isMobile ? 0.12 : 0.09 - layer * 0.015, // Slightly larger on mobile for visibility
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)
    particlesData.push({ geometry, pointCloud, particleCount })
  }

  // === Lines (more subtle on mobile or disabled) ===
  if (!isMobile) {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1a2235,
      opacity: 0.03,
      transparent: true,
    })
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(5000 * 3), 3))
    lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)
  }

  animate()
}

let frameCount = 0
function animate() {
  animationId = requestAnimationFrame(animate)
  frameCount++
  
  displayedScroll += (scrollProgress - displayedScroll) * 0.08

  // Rotate particles
  if (!particlesHidden) {
    particlesData.forEach((layerData, idx) => {
      layerData.pointCloud.rotation.y += 0.0025 + idx * 0.0012
      layerData.pointCloud.rotation.x += 0.001
    })
    
    // Update lines less frequently on mobile, or skip entirely
    if (lines && (!isMobile || frameCount % 3 === 0)) {
      updateLines()
    }
  }

  // Zoom with scroll
  const targetZ = THREE.MathUtils.lerp(MAX_Z, MIN_Z, displayedScroll)
  camera.position.z += (targetZ - camera.position.z) * 0.08

  // Fade effect for particles
  particlesData.forEach(({ pointCloud }) => {
    pointCloud.material.opacity = Math.max(0.5, 1 - displayedScroll * 0.6)
  })
  if (lines) {
    lines.material.opacity = Math.max(0.015, 0.03 * (1 - displayedScroll * 0.6))
  }

  // Animate intro text
  if (introText.value) {
    const opacity = Math.max(0, 1 - displayedScroll * 1.5)
    introText.value.style.opacity = opacity
    introText.value.style.transform = `translate(-50%, calc(-50% + ${displayedScroll * 100}px))`
  }

  renderer.render(scene, camera)
}

function updateLines() {
  if (!lines) return
  
  const maxDistance = 1.5
  const positions = lines.geometry.attributes.position.array
  let ptr = 0

  // Limit line calculations for performance
  const maxLines = isMobile ? 100 : 300

  particlesData.forEach((layerData) => {
    const posAttr = layerData.geometry.attributes.position
    const count = layerData.particleCount
    const step = isMobile ? 3 : 1 // Check fewer particles on mobile
    
    for (let i = 0; i < count && ptr < maxLines * 6; i += step) {
      for (let j = i + step; j < count && ptr < maxLines * 6; j += step) {
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

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  const intensity = isMobile ? 2 : 4 // Reduce parallax intensity on mobile
  camera.position.x += (mouse.x * intensity - camera.position.x) * 0.08
  camera.position.y += (mouse.y * intensity - camera.position.y) * 0.08
  camera.lookAt(scene.position)
}

// Add touch support
function onTouchMove(event) {
  if (event.touches.length > 0) {
    const touch = event.touches[0]
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1
    const intensity = 2
    camera.position.x += (mouse.x * intensity - camera.position.x) * 0.08
    camera.position.y += (mouse.y * intensity - camera.position.y) * 0.08
    camera.lookAt(scene.position)
  }
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('wheel', onWheel)
  
  // Proper cleanup
  particlesData.forEach(({ geometry, pointCloud }) => {
    geometry.dispose()
    pointCloud.material.dispose()
  })
  if (lines) {
    lines.geometry.dispose()
    lines.material.dispose()
  }
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
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .intro-text {
    font-size: 2rem;
  }
}
</style>
