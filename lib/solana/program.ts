import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { BTB_PROGRAM_ID } from './config';
import idl from './idl.json';

export async function getProgramInstance() {
  if (typeof window === 'undefined') throw new Error('Window is undefined');
  
  const provider = new AnchorProvider(
    new web3.Connection(web3.clusterApiUrl('devnet')),
    window.solana,
    { commitment: 'confirmed' }
  );

  return new Program(idl, BTB_PROGRAM_ID, provider);
}