import { Program, IdlAccounts, BN } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { WrappedConnection } from "./wrappedConnection";
import { HackillinoisGame, IDL } from "@/idl/hackillinois-game";

export const CONNECTION = new WrappedConnection(
  process.env.NEXT_PUBLIC_RPC
    ? process.env.NEXT_PUBLIC_RPC
    : "https://rpc.magicblock.app/devnet",
  {
    wsEndpoint: process.env.NEXT_PUBLIC_WSS_RPC
      ? process.env.NEXT_PUBLIC_WSS_RPC
      : "wss://rpc.magicblock.app/devnet",
    commitment: "confirmed",
  }
);

export const METAPLEX_READAPI =
  "https://devnet.helius-rpc.com/?api-key=78065db3-87fb-431c-8d43-fcd190212125";

// Here you can basically use what ever seed you want. For example one per level or city or whatever.
export const GAME_DATA_SEED = "level_2";

// HackillinoisGame game program ID
const programId = new PublicKey("Fc7CuRGs32n9LAHcwBhwAGzAtr5AzfC4wVmnXCCvti8g");

// Create the program interface using the idl, program ID, and provider
export const program = new Program<HackillinoisGame>(IDL as any, programId, {
  connection: CONNECTION,
}) as unknown as any;

export const [gameDataPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from(GAME_DATA_SEED, "utf8")],
  program.programId
);

// Player Data Account Type from Idl
export type PlayerData = IdlAccounts<HackillinoisGame>["playerData"];
export type GameData = IdlAccounts<HackillinoisGame>["gameData"];

// Constants for the game
export const TIME_TO_REFILL_ENERGY: BN = new BN(60);
export const MAX_ENERGY = 100;
export const ENERGY_PER_TICK: BN = new BN(1);
export const TOTAL_WOOD_AVAILABLE: BN = new BN(100000);
