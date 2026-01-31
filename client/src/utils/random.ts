
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}


export function getRandomElement<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error("Array is empty");
  const index = getRandomInt(0, arr.length - 1);
  return arr[index];
}

export function randomBool(): boolean {
  return Math.random() < 0.5;
}


export interface WeightedItem<T> {
  item: T;
  weight: number;
}


export function getWeightedRandom<T>(items: WeightedItem<T>[]): T {
  if (items.length === 0) throw new Error("Items array is empty");
  
  const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
  if (totalWeight <= 0) throw new Error("Total weight must be greater than 0");
  
  let random = Math.random() * totalWeight;
  for (const i of items) {
    if (random < i.weight) return i.item;
    random -= i.weight;
  }
  
  return items[items.length - 1].item;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


export function getRandomElements<T>(arr: T[], count: number): T[] {
  if (count > arr.length) {
    throw new Error("Count cannot be greater than array length");
  }
  if (count < 0) {
    throw new Error("Count cannot be negative");
  }
  
  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
}
