<template>
  <canvas ref="canvas" class="stars"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const canvas = ref(null)

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')
  function resize() {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.5 + 0.3,
    d: Math.random() * 0.1 + 0.05,
  }))

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.fillStyle = 'rgba(200,200,255,0.4)'
    stars.forEach(s => {
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
      s.y += s.d
      if (s.y > c.height) s.y = 0
    })
    requestAnimationFrame(draw)
  }
  draw()
})
</script>

<style scoped>
.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
}
</style>
