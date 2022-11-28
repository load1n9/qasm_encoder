import { Op } from "./Op.ts";

export class If extends Op {
  constructor(condition: string, block: string[], braces = false) {
    super("if", [condition], [...block], braces);
  }
}
