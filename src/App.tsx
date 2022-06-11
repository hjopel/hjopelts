import "./App.css";
import { Box, useColorModeValue, Flex, Text, chakra } from "@chakra-ui/react";
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
import CTASection from "./components/CTASection";
import * as THREE from "three";

import LoadingOverlay from "./components/Loader";
import { AnimatePresence } from "framer-motion";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LandingPage from "./pages/LandingPage";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// import * as oida from "framer-motion/three"
function App() {
  InitApp();
  const [ref, hero, project, view3, view4, view5, scrollRef] = useRefs();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      smooth: true,
      el: ref.current,
    });

    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#mainContainer", {
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
      pinType: document.getElementById("mainContainer").style.transform
        ? "transform"
        : "fixed",
    });
    const elements: HTMLElement[] = gsap.utils.toArray("[data-scroll-section]");
    elements?.forEach((section) => {
      if (section.classList.contains("horizontal")) {
        const scroll = section.querySelector("[data-scroll-in-section]");

        // the tween and the pinning have two different ScrollTriggers, because the will need different durations for that overlaying-effect to show

        ScrollTrigger.create({
          scroller: "#mainContainer",
          trigger: section,
          start: "center center",
          end: () => `+=${section.scrollWidth + window.innerHeight}`, // added an extra window.innerHeight to the end here in comparison to the tween
          pin: section.querySelector(".section-inner"),
          pinSpacing: true,
          pinType: "transform",
          anticipatePin: 1,
        });

        gsap.to(scroll, {
          x: () =>
            `${-(
              section.scrollWidth - document.documentElement.clientWidth
            )}px`,
          ease: "none",
          scrollTrigger: {
            trigger: scroll,
            scroller: "#mainContainer",
            start: "center center",
            end: () => `+=${section.scrollWidth}`,
            scrub: true,
          },
        });
      } else {
      }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {/* <AnimatePresence>{false && <LoadingOverlay />}</AnimatePresence>
      <Flex
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

      <main id="mainContainer" data-scroll-container ref={ref}>
        <LandingPage>
          <Hero view={hero} />
          <CTASection />
          <ProjectGallery />
          <Flex
            data-scroll-section
            w="100%"
            bgColor={"blue"}
            h="100vh"
            mt={"-100vh"}
          />
        </LandingPage>
      </main>
      {/* <Canvas
        onCreated={(state) => state.events.connect(ref.current)}
        className="canvas"
        id="canvasEl"
      >
        <Suspense fallback={null}> */}
      {/* @ts-ignore */}
      {/* <View track={hero}>
            <Scene />
          </View>
        
          <Preload all />
        </Suspense>
      </Canvas>
    </> */}
    </>
  );
}

const GsapTest = () => {
  InitApp()
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

    sections.forEach(function (section) {
      const inner = section.classList.contains("sectionLeftAndRight")
        ? section.querySelector(".leftText")
        : section.querySelector(".section-inner");

      if (!section.classList.contains("horizontalScrolling")) {
        ScrollTrigger.create({
          scroller: ".smooth-scroll",
          trigger: section,
          start:
            section.scrollHeight <= window.innerHeight
              ? "top top"
              : "bottom bottom",
          end: "+=100%",
          pin: inner,
          pinSpacing: false,
          pinType: "transform",
        });
      } else {
        const scroll = section.querySelector("[data-scroll-in-section]");

        // the tween and the pinning have two different ScrollTriggers, because the will need different durations for that overlaying-effect to show

        ScrollTrigger.create({
          scroller: ".smooth-scroll",
          trigger: section,
          start: "center center",
          end: () => `+=${section.scrollWidth + window.innerHeight}`, // added an extra window.innerHeight to the end here in comparison to the tween
          pin: inner,
          pinSpacing: true,
          pinType: "transform",
          anticipatePin: 1,
          markers: true
        });

        gsap.to(scroll, {
          x: () =>
            `${-(
              section.scrollWidth - document.documentElement.clientWidth
            )}px`,
          ease: "none",
          scrollTrigger: {
            trigger: scroll,
            scroller: ".smooth-scroll",
            start: "center center",
            end: () => `+=${section.scrollWidth}`,
            scrub: true,
          },
        });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".rightPinImage img",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "50% 50%",
        endTrigger: ".sectionLeftAndRight .section-inner",
        end: "bottom bottom",
        anticipatePin: 1,
        pin: true,
        pinSpacing: false,
        pinType: "transform",
      },
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }, []);
  return (
    <div className="smooth-scroll" id="smooth-scroll">
      <section className="red min-h-100" data-scroll-section>
        <div className="section-inner">Text</div>
      </section>

      <section
        className="blue sectionLeftAndRight min-h-100"
        data-scroll-section
      >
        <div className="section-inner">
          <div className="leftText">
            <p>START</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>LEFT TEXT</p>
            <p>END</p>
          </div>

          <div className="rightPinImage">
            <img src="https://picsum.photos/id/237/200/300" alt="" />
          </div>
        </div>
      </section>

      <section className="green min-h-50" data-scroll-section>
        <div className="section-inner">Text</div>
      </section>

      <section className="purple min-h-100" data-scroll-section>
        <div className="section-inner">Text</div>
      </section>

      {/* <section className="horizontalScrolling" data-scroll-section>
        <div className="section-inner">
          <div data-scroll-in-section>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </section> */}
      <ProjectGallery />

      <section className="blue min-h-100 afterHorizontal" data-scroll-section>
        <div className="section-inner">Text</div>
      </section>

      <section className="green min-h-100" data-scroll-section>
        <div className="section-inner">Text</div>
      </section>
    </div>
  );
};

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
export default GsapTest;
