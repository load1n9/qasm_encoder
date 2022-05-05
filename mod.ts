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
    this.#qasm += "OPENQASM 2.0;\n";
    this.#qasm += 'include "qelib1.inc";\n';
    this.#qasm += "qreg q[" + this.#circuit.qubits.length + "];\n";
    this.#qasm += "creg c[" + this.#circuit.cbits.length + "];\n";
    this.#circuit.gates.forEach((gate) => {
      this.#qasm += this.#encodeGate(gate);
    });
    return this.#qasm;
  }

  #encodeGate(gate: Gate): string {
    let qasm = "";
    switch (gate.type) {
      case "u1":
        qasm += this.#encodeU1(gate);
        break;
      case "u2":
        qasm += this.#encodeU2(gate);
        break;
      case "u3":
        qasm += this.#encodeU3(gate);
        break;
      case "cx":
        qasm += this.#encodeCX(gate);
        break;
      case "id":
        qasm += this.#encodeID(gate);
        break;
      case "x":
        qasm += this.#encodeX(gate);
        break;
      case "y":
        qasm += this.#encodeY(gate);
        break;
      case "z":
        qasm += this.#encodeZ(gate);
        break;
      case "h":
        qasm += this.#encodeH(gate);
        break;
      case "s":
        qasm += this.#encodeS(gate);
        break;
      case "sdg":
        qasm += this.#encodeSDG(gate);
        break;
      case "t":
        qasm += this.#encodeT(gate);
        break;
      case "tdg":
        qasm += this.#encodeTDG(gate);
        break;
      case "rx":
        qasm += this.#encodeRX(gate);
        break;
      case "ry":
        qasm += this.#encodeRY(gate);
        break;
      case "rz":
        qasm += this.#encodeRZ(gate);
        break;
      case "measure":
        qasm += this.#encodeMeasure(gate);
        break;
      case "reset":
        qasm += this.#encodeReset(gate);
        break;
      default:
        throw new Error("Gate type not supported: " + gate.type);
    }
    return qasm;
  }

  #encodeU1(gate: Gate): string {
    let qasm = "";
    qasm += "u1(" + gate.params[0] + ") q[" +
      this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeU2(gate: Gate): string {
    let qasm = "";
    qasm += "u2(" + gate.params[0] + ", " + gate.params[1] + ") q[" +
      this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeU3(gate: Gate): string {
    let qasm = "";
    qasm += "u3(" + gate.params[0] + ", " + gate.params[1] + ", " +
      gate.params[2] + ") q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeCX(gate: Gate): string {
    let qasm = "";
    qasm += "cx q[" + this.#getQubitIndex(gate.qubits[0]) + "], q[" +
      this.#getQubitIndex(gate.qubits[1]) + "];\n";
    return qasm;
  }

  #encodeID(gate: Gate): string {
    let qasm = "";
    qasm += "id q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeX(gate: Gate): string {
    let qasm = "";
    qasm += "x q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeY(gate: Gate): string {
    let qasm = "";
    qasm += "y q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeZ(gate: Gate): string {
    let qasm = "";
    qasm += "z q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeH(gate: Gate): string {
    let qasm = "";
    qasm += "h q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeS(gate: Gate): string {
    let qasm = "";
    qasm += "s q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeSDG(gate: Gate): string {
    let qasm = "";
    qasm += "sdg q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeT(gate: Gate): string {
    let qasm = "";
    qasm += "t q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeTDG(gate: Gate): string {
    let qasm = "";
    qasm += "tdg q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeRX(gate: Gate): string {
    let qasm = "";
    qasm += "rx(" + gate.params[0] + ") q[" +
      this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeRY(gate: Gate): string {
    let qasm = "";
    qasm += "ry(" + gate.params[0] + ") q[" +
      this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeRZ(gate: Gate): string {
    let qasm = "";
    qasm += "rz(" + gate.params[0] + ") q[" +
      this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #encodeMeasure(gate: Gate): string {
    let qasm = "";
    qasm += "measure q[" + this.#getQubitIndex(gate.qubits[0]) + "] -> c[" +
      this.#getCbitIndex(gate.cbits[0]) + "];\n";
    return qasm;
  }

  #encodeReset(gate: Gate): string {
    let qasm = "";
    qasm += "reset q[" + this.#getQubitIndex(gate.qubits[0]) + "];\n";
    return qasm;
  }

  #getQubitIndex(qubit: string): number {
    if (this.#qubit_map.has(qubit)) {
      return this.#qubit_map.get(qubit)!;
    } else {
      this.#qubit_map.set(qubit, this.#qubit_count);
      this.#qubit_count++;
      return this.#qubit_count - 1;
    }
  }

  #getCbitIndex(cbit: string): number {
    if (this.#cbit_map.has(cbit)) {
      return this.#cbit_map.get(cbit)!;
    } else {
      this.#cbit_map.set(cbit, this.#cbit_count);
      this.#cbit_count++;
      return this.#cbit_count - 1;
    }
  }
}
export class QuantumCircuit {
  constructor(
    public qubits: string[],
    public cbits: string[],
    public gates: Gate[],
  ) {
  }
}

export class Gate {
  constructor(
    public type: string,
    public qubits: string[],
    public cbits: string[],
    public params: number[],
  ) {
  }
}
