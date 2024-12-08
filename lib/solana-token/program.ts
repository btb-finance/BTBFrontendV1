// program-instance.ts

import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { PdaVesting } from "@/pda_vesting";
import idl from "./pda_vesting.json";

let _program: Program<PdaVesting> | null = null;

export const getProgramInstance = (provider: AnchorProvider): Program<PdaVesting> => {
  if (!_program) {
    _program = new Program<PdaVesting>(
      JSON.parse(JSON.stringify(idl)),
      provider
    );
  }
  return _program;
};

export type { PdaVesting };