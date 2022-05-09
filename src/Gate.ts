import { Op } from "../mod.ts"

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