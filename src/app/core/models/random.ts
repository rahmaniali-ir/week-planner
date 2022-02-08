export class Random {
  public static generate(min: number = 0, max: number = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  public static from(arr: any[]) {
    return arr[Random.generate(0, arr.length)];
  }
}
