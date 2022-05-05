OPENQASM 3;
include "stdgates.inc";

gate post q {
}

qubit[3] q;

bit[1] c0;
bit[1] c1;
bit[1] c2;

reset q;


U 0.3 0.2 0.1 q[0];
h q[1];
cx q[1] q[2];
barrier q;
cx q[0] q[1];
h q[0];
measure q[0] c0;
measure q[1] c1;
if c0==1 z q[2];
if c1==1 x q[2];
post q[2];
measure q[2] c2;


