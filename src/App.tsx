import "./App.css";
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  chakra,
  Heading,
} from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { View, Preload, Loader } from "@react-three/drei";
import Header from "./components/Header";
import gsap from "gsap";
import useStore, { Image } from "./components/customHooks/useStore";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Scene from "./components/idk";
import ProjectGallery from "./components/ProjectGallery";
import ProjectScene from "./components/ProjectScene";
import * as THREE from "three";

import LoadingOverlay from "./components/Loader";
import { AnimatePresence } from "framer-motion";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LandingPage from "./pages/LandingPage";

import ScrollTrigger from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./components/customHooks/useHorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const GsapTest = () => {
  const [ref, hero, projects, view3, view4, view5, scrollRef] = useRefs();

  InitApp();
  useEffect(() => {
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".smooth-scroll"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.getElementById("smooth-scroll").style.transform
        ? "transform"
        : "fixed",
    });

    const sections: HTMLElement[] = gsap.utils.toArray("section");

    // sections.forEach(function (section) {
    //   const inner = section.classList.contains("sectionLeftAndRight")
    //     ? section.querySelector(".leftText")
    //     : section.querySelector(".section-inner");

    //   ScrollTrigger.create({
    //     scroller: ".smooth-scroll",
    //     trigger: section,
    //     start:
    //       section.scrollHeight <= window.innerHeight
    //         ? "top top"
    //         : "bottom bottom",
    //     end: "+=100%",
    //     pin: inner,
    //     pinSpacing: false,
    //     pinType: "transform",
    //   });
    // });

    // const timeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".rightPinImage img",
    //     scroller: ".smooth-scroll",
    //     scrub: true,
    //     start: "50% 50%",
    //     endTrigger: ".sectionLeftAndRight .section-inner",
    //     end: "bottom bottom",
    //     anticipatePin: 1,
    //     pin: true,
    //     pinSpacing: false,
    //     pinType: "transform",
    //   },
    // });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      
      <div className="smooth-scroll" id="smooth-scroll" ref={ref}>
        <Hero ref={hero} />
        <ProjectGallery ref={projects} />
      </div>
      <Canvas
        onCreated={(state) => state.events.connect(ref.current)}
        className="canvas"
        id="canvasEl"
      >
        <Suspense fallback={null}>
          {/* @ts-ignore */}
          <View track={hero}>
            <Scene />
          </View>

          {/* @ts-ignore */}
          <View track={projects}>
           <ProjectScene target={projects.current} />
          </View>

          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
};

const InitApp = () => {
  const setImgs = useStore((state) => state.setImgs);
  const imgs: Image[] = [
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
      src: "/ss_blank.png",
      category: "website",
      id: "hjopel",
      title: "hjopel.at",
      tags: ["react", "webgl", "three.js"],
      width: 1920,
      height: 1080,
      subtitle: "Fugiat magna sunt ipsum",
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
export default GsapTest;
