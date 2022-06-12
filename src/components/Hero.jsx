import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { forwardRef, Suspense, useEffect, useState } from "react";
import { ChakraFlex } from "./AnimatedComponents";
import gsap from "gsap";
import useStore from "./customHooks/useStore";

const  App = forwardRef((props, ref) => {
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        data-scroll-section
        pointerEvents="none"
        cursor={"none"}
        overflow="hidden"
        ref={ref}
        id={"view1"}
        bgGradient="linear(to-b, transparent , rgba(255,255,255,1))"
      >
        <Flex
          position={"relative"}
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          justify={"center"}
          align="flex-start"
          pointerEvents="none"
          flexWrap={"wrap"}
        >
          <Flex h="50%"  justifyContent={"center"} alignItems="center" w="100%">
            <Heading
              fontSize={"40rem"}
              className="outline"
              pointerEvents="none"
            >
              hjopel
            </Heading>
          </Flex>
          <Flex h="50%" justifyContent={"center"} alignItems="center" w="100%">
            
          </Flex>
        </Flex>
        <Box className="section-inner"></Box>
      </Box>
    </>
  );
})

export default App;
