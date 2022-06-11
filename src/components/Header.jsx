import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useLocation } from "wouter";
import useStore from "./customHooks/useStore";
const Links = ["About", "Projects", "Contact"];

const NavLink = ({ children }) => (
  <Link px={2} py={1} rounded={"md"} href={"#"}>
    <Heading fontSize={"xl"} fontWeight={"normal"}>
      {children}
    </Heading>
  </Link>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useLocation();
  const setActiveRef = useStore((state) => state.setActiveRef);
  return (
    <>
      <Box bg={"transparent"} pb={6}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
        >
          <IconButton
            size={"lg"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            // display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            pointerEvents={"all"}
          />
          <Heading fontSize={"3xl"} pointerEvents={"all"}>
            hjopel
          </Heading>

          <Button pointerEvents={"all"} variant="ghost">
            <Heading fontSize={"3xl"}>Contact me</Heading>
          </Button>
        </Flex>
      </Box>
    </>
  );
}
