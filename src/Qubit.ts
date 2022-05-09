export class Qubit {
    #name: string;
    #size: number;
  
    constructor(name: string, size: number) {
      this.#name = name;
      this.#size = size;
    }
  
    get name(): string {
      return this.#name;
    }
  
    get size(): number {
      return this.#size;
    }
  }