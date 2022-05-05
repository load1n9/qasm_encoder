import { Gate, OpenQASMEncoder, QuantumCircuit } from "../mod.ts";
const example_circuit = new QuantumCircuit(
  ["q0", "q1"],
  ["c0", "c1"],
  [
    new Gate("h", ["q0"], [], []),
    new Gate("cx", ["q0", "q1"], [], []),
    new Gate("measure", ["q0"], ["c0"], []),
    new Gate("measure", ["q1"], ["c1"], []),
  ],
);

const encoder = new OpenQASMEncoder(example_circuit);
console.log(encoder.encode());
