import { Box, Flex, Heading, Spacer, VStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletMultiButton from "@/components/WalletMultiButton";
import DisplayGameState from "@/components/DisplayGameState";
import InitPlayerButton from "@/components/InitPlayerButton";
import SessionKeyButton from "@/components/SessionKeyButton";
import ChopTreeButton from "@/components/ChopTreeButton";
import RequestAirdrop from "@/components/RequestAirdrop";
import DisplayNfts from "@/components/DisplayNfts";
import { useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();

  const [sessionStarted, setSessionStarted] = useState(false);

  return (
    <Box>
      <Flex px={4} py={4}>
        <Spacer />
        <WalletMultiButton />
      </Flex>
      <VStack>
        <Heading>Blockchain Beats</Heading>
        {!publicKey && <Text>Connect to devnet wallet!</Text>}
        <DisplayGameState />
        <InitPlayerButton />
        <SessionKeyButton 
        onStartSession={() => {
          setSessionStarted(true);
        }}/>
        <ChopTreeButton
          onStartSession={() => {
            setSessionStarted(true);
          }}
        />
        <RequestAirdrop />
        {sessionStarted && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              justifyContent: "center",
            }}
          >
            <iframe
              style={{ width: "30%", height: "100vh" }}
              src={`index.html`}
            ></iframe>
          </div>
        )}
      </VStack>
    </Box>
  );
}
