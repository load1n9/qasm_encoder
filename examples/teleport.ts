import {
  Cbit,
  Gate,
  If,
  Op,
  OpenQASMEncoder,
  QuantumCircuit,
  Qubit,
} from "../mod.ts";

const example_circuit = new QuantumCircuit();

example_circuit.add_qubit(new Qubit("q", 3));
example_circuit.add_cbit(new Cbit("c0", 1));
example_circuit.add_cbit(new Cbit("c1", 1));
example_circuit.add_cbit(new Cbit("c2", 1));

example_circuit.add_gate(
  new Gate(
    "post",
    ["q"],
    [],
  ),
);

example_circuit.add_op(new Op("U", ["0.3", "0.2", "0.1"], ["q[0]"]));
example_circuit.add_op(new Op("h", ["q[1]"]));
example_circuit.add_op(new Op("cx", ["q[1]", "q[2]"]));
example_circuit.add_op(new Op("barrier", ["q"]));
example_circuit.add_op(new Op("cx", ["q[0]", "q[1]"]));
example_circuit.add_op(new Op("h", ["q[0]"]));
example_circuit.add_op(new Op("measure", ["q[0]", "c0"]));
example_circuit.add_op(new Op("measure", ["q[1]", "c1"]));
// example_circuit.add_op(new Op("if", ["c0==1", "z", "q[2]"]));
// example_circuit.add_op(new Op("if", ["c1==1", "x", "q[2]"]));
example_circuit.add_op(new If("c0==1", ["z", "q[2]"]));
example_circuit.add_op(new If("c1==1", ["x", "q[2]"], true));
example_circuit.add_op(new Op("post", ["q[2]"]));
example_circuit.add_op(new Op("measure", ["q[2]", "c2"]));

const encoder = new OpenQASMEncoder(example_circuit);
await Deno.writeTextFile("teleport.qasm", encoder.encode());
