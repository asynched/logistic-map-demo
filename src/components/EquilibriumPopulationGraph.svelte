<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { calculateEquilibrium } from '../domain/equations'

  export let initial = 0.5
  export let steps = 100
  export let rate = 0
  export let animate = false

  type State = 'idle' | 'animating'

  let animationState: State = 'idle'

  let cleanup: (() => void) | undefined
  let canvas: HTMLCanvasElement

  function onAnimationStart() {
    rate = 0
    animationState = 'animating'
  }

  function onAnimationEnd() {
    animationState = 'idle'
    animate = false
    rate = 4
  }

  function startAnimation() {
    onAnimationStart()

    const interval = setInterval(() => {
      if (rate >= 4) {
        onAnimationEnd()
        return clearInterval(interval)
      }

      rate += 0.025
    }, 100)

    cleanup = () => {
      animationState = 'idle'
      clearInterval(interval)
    }
  }

  function stopAnimation() {
    cleanup?.()
  }

  $: {
    if (!canvas) {
      break $
    }

    if (!animate) {
      stopAnimation()
      break $
    }

    if (animate && animationState !== 'animating') {
      startAnimation()
      break $
    }

    const ctx = canvas.getContext('2d')

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate equilibrium population rate based on
    // the logistic map for each iteration of the rate
    for (let currentRate = 0; currentRate < rate; currentRate += 0.0025) {
      const equilibriumPoints = calculateEquilibrium({
        initialPopulation: initial,
        growthRate: currentRate,
        steps,
      })

      // Draw a white pixel at the rate's equilibrium population
      for (const point of equilibriumPoints) {
        ctx.fillStyle = '#fff'
        ctx.fillRect(
          (currentRate * canvas.width) / rate,
          canvas.height - point * canvas.height,
          1,
          1,
        )
      }
    }
  }

  onMount(() => {
    canvas.height = window.innerHeight / 2
    canvas.width = window.innerWidth
  })

  onDestroy(() => {
    cleanup?.()
  })
</script>

<canvas bind:this={canvas} />
