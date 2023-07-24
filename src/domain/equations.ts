type CalculatePopulationOptions = {
  steps: number
  initialPopulation: number
  growthRate: number
}

export function calculatePopulation({
  growthRate,
  initialPopulation,
  steps,
}: CalculatePopulationOptions) {
  const x0 = initialPopulation
  const r = growthRate

  const x: number[] = Array(steps).fill(0)
  const y: number[] = Array(steps).fill(0)

  x[0] = x0
  y[0] = 0

  for (let i = 1; i < steps; i++) {
    x[i] = x[i - 1] * r * (1 - x[i - 1])
    y[i] = i / steps
  }

  return { x, y }
}

type CalculateEquilibriumOptions = {
  initialPopulation: number
  growthRate: number
  steps: number
}

export function calculateEquilibrium({
  growthRate,
  initialPopulation,
  steps,
}: CalculateEquilibriumOptions) {
  let population = initialPopulation
  let equilibriumPoints = new Set<number>()

  for (let i = 0; i < steps; i++) {
    population = growthRate * population * (1 - population)

    if (i > steps / 2) {
      equilibriumPoints.add(population)
    }
  }

  return equilibriumPoints
}
