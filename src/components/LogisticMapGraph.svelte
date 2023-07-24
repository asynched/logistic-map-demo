<script lang="ts">
  import { onMount } from 'svelte'
  import { calculatePopulation } from '../domain/equations'

  export let rate: number
  export let initial: number
  export let steps: number

  let canvas: HTMLCanvasElement

  $: {
    if (!canvas) break $

    const ctx = canvas.getContext('2d')

    const width = canvas.width
    const height = canvas.height

    const { x, y } = calculatePopulation({
      initialPopulation: initial,
      growthRate: rate,
      steps,
    })

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.moveTo(y[0] * width, x[0] * height)

    for (let i = 1; i < steps; i++) {
      ctx.lineTo(y[i] * width, x[i] * height)
    }

    ctx.strokeStyle = '#fff'
    ctx.stroke()
  }

  onMount(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight / 2
  })
</script>

<canvas bind:this={canvas} class="graph" />
