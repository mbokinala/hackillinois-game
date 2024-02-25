import Image from "next/image"
import { HStack, VStack, Text } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useGameState } from "@/contexts/GameStateProvider"
import { TOTAL_WOOD_AVAILABLE } from "@/utils/anchor"
import { useEffect } from "react"

const DisplayPlayerData = () => {
  const { publicKey } = useWallet()
  const { gameState, nextEnergyIn, totalWoodAvailable, nextNote } = useGameState();

  useEffect(() => {
    console.log("next note is ", gameState?.nextNote.map(x => x.toString()));
    console.log("not index:", gameState?.noteIndex.toString());
  }, [gameState?.nextNote]);

  return (
    <>
      {gameState && publicKey && (
        <HStack justifyContent="center" spacing={4}>
          <HStack>
            <Image src="/Wood.png" alt="Wood Icon" width={64} height={64} />
            <Text>Wood: {Number(gameState.wood)}</Text>
          </HStack>
          <HStack>
            <Image src="/energy.png" alt="Energy Icon" width={64} height={64} />
            <VStack>
              <Text>Energy: {Number(gameState.energy)}</Text>
              <Text>Next in: {nextEnergyIn}</Text>
            </VStack>
          </HStack>
          <Text>Total Wood available: {Number(TOTAL_WOOD_AVAILABLE) - Number(totalWoodAvailable)}</Text>
        </HStack>
      )}
    </>
  )
}

export default DisplayPlayerData
