import { Cbit, Comment, Gate, Input, Measure, Op, Qubit } from "../mod.ts";

export class QuantumCircuit {
  #gates: Gate[] = [];
  #qubits: Qubit[] = [];
  #cbits: Cbit[] = [];
  #inputs: Input[] = [];
  #comments: Comment[] = [];
  #ops: Op[] = [];
  #measures: Measure[] = [];

  get gates(): Gate[] {
    return this.#gates;
  }

  get qubits(): Qubit[] {
    return this.#qubits;
  }

  get cbits(): Cbit[] {
    return this.#cbits;
  }

  get inputs(): Input[] {
    return this.#inputs;
  }

  get ops(): Op[] {
    return this.#ops;
  }

  get measures(): Measure[] {
    return this.#measures;
  }

  get comments(): Comment[] {
    return this.#comments;
  }

  add_gate(gate: Gate): void {
    this.#gates.push(gate);
  }

  add_qubit(qubit: Qubit): void {
    this.#qubits.push(qubit);
  }

  add_cbit(cbit: Cbit): void {
    this.#cbits.push(cbit);
  }

  add_input(input: Input): void {
    this.#inputs.push(input);
  }
  add_comment(comment: Comment): void {
    this.#comments.push(comment);
  }

  add_op(op: Op): void {
    this.#ops.push(op);
  }

  add_measure(measure: Measure): void {
    this.#measures.push(measure);
  }
}
