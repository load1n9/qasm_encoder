export class OpenQASMEncoder {
  #circuit: QuantumCircuit;
  #qasm: string;
  #qubit_map: Map<string, number>;
  #cbit_map: Map<string, number>;
  #qubit_count: number;
  #cbit_count: number;

  constructor(circuit: QuantumCircuit) {
    this.#circuit = circuit;
    this.#qasm = "";
    this.#qubit_map = new Map<string, number>();
    this.#cbit_map = new Map<string, number>();
    this.#qubit_count = 0;
    this.#cbit_count = 0;
  }

  encode(): string {
    this.#qasm += "OPENQASM 3;\n";
    this.#qasm += 'include "stdgates.inc";\n';
    this.#qasm += "\n";
    this.encode_gates();
    this.encode_circuit();
    return this.#qasm;
  }

  encode_gates(): void {
    for (const gate of this.#circuit.gates) {
      this.#qasm += `gate ${gate.name}`;
      for (const param of gate.params) {
        this.#qasm += ` ${param}`;
      }
      this.#qasm += " {\n";
      for (const op of gate.ops) {
        this.#qasm += `    ${op.name}`;
        for (const arg of op.args) {
          this.#qasm += ` ${arg}`;
        }
        this.#qasm += ";\n";
      }
      this.#qasm += "}\n";
    }
    this.#qasm += "\n";
  }

  encode_circuit(): void {
    this.encode_qubits();
    this.encode_cbits();
    this.encode_reset();
    this.encode_input();
    this.encode_ops();
    this.encode_measure();
  }

  encode_qubits(): void {
    for (const qubit of this.#circuit.qubits) {
      this.#qasm += `qubit[${qubit.size}] ${qubit.name};\n`;
      this.#qubit_map.set(qubit.name, this.#qubit_count);
      this.#qubit_count += qubit.size;
    }
    this.#qasm += "\n";
  }

  encode_cbits(): void {
    for (const cbit of this.#circuit.cbits) {
      this.#qasm += `bit[${cbit.size}] ${cbit.name};\n`;
      this.#cbit_map.set(cbit.name, this.#cbit_count);
      this.#cbit_count += cbit.size;
    }
    this.#qasm += "\n";
  }

  encode_reset(): void {
    for (const qubit of this.#circuit.qubits) {
      this.#qasm += `reset ${qubit.name};\n`;
    }
    this.#qasm += "\n";
  }

  encode_input(): void {
    for (const input of this.#circuit.inputs) {
      this.#qasm += `uint[${input.size}] ${input.name} = ${input.value};\n`;
    }
    this.#qasm += "\n";
  }

  encode_ops(): void {
    for (const op of this.#circuit.ops) {
      this.#qasm += `${op.name}`;
      for (const arg of op.args) {
        this.#qasm += ` ${arg}`;
      }
      this.#qasm += ";\n";
    }
    this.#qasm += "\n";
  }

  encode_measure(): void {
    for (const measure of this.#circuit.measures) {
      this.#qasm += `measure ${measure.qubit} -> ${measure.cbit};\n`;
    }
    this.#qasm += "\n";
  }
}
export class QuantumCircuit {
  #gates: Gate[];
  #qubits: Qubit[];
  #cbits: Cbit[];
  #inputs: Input[];
  #ops: Op[];
  #measures: Measure[];

  constructor() {
    this.#gates = [];
    this.#qubits = [];
    this.#cbits = [];
    this.#inputs = [];
    this.#ops = [];
    this.#measures = [];
  }

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

  add_op(op: Op): void {
    this.#ops.push(op);
  }

  add_measure(measure: Measure): void {
    this.#measures.push(measure);
  }
}

export class Gate {
  #name: string;
  #params: string[];
  #ops: Op[];

  constructor(name: string, params: string[], ops: Op[]) {
    this.#name = name;
    this.#params = params;
    this.#ops = ops;
  }

  get name(): string {
    return this.#name;
  }

  get params(): string[] {
    return this.#params;
  }

  get ops(): Op[] {
    return this.#ops;
  }
}

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

export class Cbit {
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

export class Input {
  #name: string;
  #size: number;
  #value: number;

  constructor(name: string, size: number, value: number) {
    this.#name = name;
    this.#size = size;
    this.#value = value;
  }

  get name(): string {
    return this.#name;
  }

  get size(): number {
    return this.#size;
  }

  get value(): number {
    return this.#value;
  }
}

export class Op {
  #name: string;
  #args: string[];

  constructor(name: string, args: string[]) {
    this.#name = name;
    this.#args = args;
  }

  get name(): string {
    return this.#name;
  }

  get args(): string[] {
    return this.#args;
  }
}

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

