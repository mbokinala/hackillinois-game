import Image from "next/image";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGameState } from "@/contexts/GameStateProvider";
import { TOTAL_WOOD_AVAILABLE } from "@/utils/anchor";
import { useEffect } from "react";

declare global {
  interface Window {
    nextNote: number[];
  }
}

const DisplayPlayerData = () => {
  const { publicKey } = useWallet();
  const { gameState, nextEnergyIn, totalWoodAvailable, nextNote } =
    useGameState();

  useEffect(() => {
    // console.log("nextNote", gameState?.nextNote);
    window.nextNote = gameState?.nextNote.map((x) =>
      Number.parseInt(x.toString())
    ) ?? [0, 0];
    // console.log("window nextnote", window.nextNote);
  }, [gameState?.nextNote]);

  return (
    <>
      {gameState && publicKey && (
        <HStack justifyContent="center" spacing={4}>
        </HStack>
      )}
    </>
  );
};

export default DisplayPlayerData;
