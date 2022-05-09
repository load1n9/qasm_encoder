import { QuantumCircuit } from "../mod.ts"

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
      this.encode_comments();
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
    encode_comments(): void {
      for (const comment of this.#circuit.comments) {
        this.#qasm += comment.value instanceof Array ? `/*\n${comment.value.map((c: string) => ` * ${c}`).join("\n")}\n*/\n`: `//${comment.value}\n`;
      }
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