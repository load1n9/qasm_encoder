export class Measure {
  #qubit: string;
  #cbit: string;

  constructor(qubit: string, cbit: string) {
    this.#qubit = qubit;
    this.#cbit = cbit;
  }

  get qubit(): string {
    return this.#qubit;
  }

  get cbit(): string {
    return this.#cbit;
  }
}
