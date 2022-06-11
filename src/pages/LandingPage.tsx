import { Box, useColorModeValue, Flex, Text, chakra } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import Header from "../components/Header";
import gsap from "gsap";
import useStore, { Image } from "../components/customHooks/useStore";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Scene from "../components/idk";
import ProjectGallery from "../components/ProjectGallery";
import CTASection from "../components/CTASection";
import useLocoScroll from "../components/customHooks/useLocoScroll";

// import * as oida from "framer-motion/three"
function App({ children }) {
  InitApp();
  const [ref, hero, project, view3, view4, view5, scrollRef] = useRefs();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    gsap.timeline().to(".lateReveal", {
      clipPath: "polygon(0 1%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: 0.3,
      duration: 2,
    });
    setTimeout(() => setIsLoading(false), 3000);
  });

  useLocoScroll(true);

  return (
    <>
      {/* <Flex
        w="100%"
        position={"absolute"}
        top={0}
        left={0}
        zIndex={1000}
        px={{ base: 0, lg: 20 }}
        py={{ base: 0, lg: 10 }}
        pointerEvents="none"
      >
        <Header />
      </Flex> */}

      {children}
      {/* <Projects ref={project} /> */}
      {/* <Flex h="100vh" w="100%" /> */}
      {/* <Footer /> */}
    </>
  );
}

const InitApp = () => {
  const setImgs = useStore((state) => state.setImgs);
  const imgs: Image[] = [
    {
      src: "/ss.png",
      category: "website",
      id: "hjopel",
      title: "hjopel.at",
      tags: ["react", "webgl", "three.js"],
      width: 1920,
      height: 1080,
      subtitle: "Fugiat magna sunt ipsum",
    },
    {
      src: "/florist.png",
      category: "mockup",
      id: "florist",
      title: "florist",
      tags: ["react", "webgl", "three.js", "prototype"],
      width: 1920,
      height: 1080,
      subtitle: "Fugiat magna sunt ipsum ",
    },
    {
      src: "/naturjuwelgaas.png",
      category: "website",
      id: "naturjuwel",
      title: "naturjuwel",
      tags: ["wordpress", "smoobu"],
      width: 1920,
      height: 1080,
      subtitle: "Fugiat magna sunt ipsum ",
    },
    {
      src: "/lp_admissio.png",
      category: "application",
      id: "admissio",
      title: "admissio",
      tags: ["angular", "node.js", "fullstack"],
      width: 2021,
      height: 2475,
      subtitle: "Fugiat magna sunt ipsum ",
    },
    {
      src: "/lp_hgoe.png",
      category: "application",
      id: "hgoe",
      title: "hgoe-burgenland",
      tags: ["angular", "wp", "node.js", "fullstack"],
      width: 1287,
      height: 2012,
      subtitle: "Fugiat magna sunt ipsum ",
    },
  ];
  setImgs(imgs);
};
export default App;
