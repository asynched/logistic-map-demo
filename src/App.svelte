<script lang="ts">
  import LogisticMapGraph from './components/LogisticMapGraph.svelte'
  import EquilibriumPopulationGraph from './components/EquilibriumPopulationGraph.svelte'

  let initialPopulation = 0.5
  let rateOfGrowth = 2.9
  let animate = false

  function toggleAnimate() {
    animate = !animate
  }

  const STEPS = 100
</script>

<div class="controls">
  <h1>Logistic map</h1>
  <div>
    <p>Initial population: {initialPopulation}</p>
    <input
      type="range"
      bind:value={initialPopulation}
      min="0"
      max="1"
      step="0.01"
    />
  </div>
  <div>
    <p>Rate of growth: {rateOfGrowth.toFixed(2)}</p>
    <input
      type="range"
      bind:value={rateOfGrowth}
      min="0"
      max="4"
      step="0.005"
    />
  </div>
  <button disabled={animate} on:click={toggleAnimate}> Animate </button>
</div>

<LogisticMapGraph
  initial={initialPopulation}
  rate={rateOfGrowth}
  steps={STEPS}
/>
<EquilibriumPopulationGraph
  bind:rate={rateOfGrowth}
  bind:initial={initialPopulation}
  bind:animate
  steps={STEPS}
/>

<style>
  .controls {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
  }
</style>
