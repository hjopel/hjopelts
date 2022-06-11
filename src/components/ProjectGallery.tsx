import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "./customHooks/useOnScreen";
import useStore, { Image } from "./customHooks/useStore";
import { Flex, Box, Grid, Heading, Text } from "@chakra-ui/react";
gsap.registerPlugin(ScrollTrigger);

type GalleryItemProps = {
  img: Image;
  updateActiveImage: (idx: number) => void;
  idx: number;
};
const GalleryItem = ({ img, updateActiveImage, idx }: GalleryItemProps) => {
  const ref = useRef();

  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen) {
      updateActiveImage(idx);
    }
  }, [onScreen, idx]);
  // useEffect(() => {
  //   const tl = gsap.timeline();
  //   tl.to(ref.current, {
  //     scrollTrigger: {
  //       trigger: ref.current,
  //       start: "left center",
  //       end: () => "+=" + ref.current.offsetWidth,
  //       markers: true,
  //       scrub: true,
  //     },
  //   });
  // }, []);
  return (
    <Grid
      className="gallery-item-wrapper"
      h="80%"
      gridTemplateColumns={"20vw 1fr 200px"}
      width="100vw"
      ref={ref}
    >
      <Box></Box>
      <Box w="100%" h="100%" pos={"relative"}>
        <Box
          position={"absolute"}
          bottom="10%"
          zIndex={1}
          transform="translateX(-20%)"
          color={"white"}
        >
          <Heading as="h1" lineHeight={"6vw"} fontWeight={600} fontSize="6vw">
            {img.title}
          </Heading>
          <Heading
            as="h2"
            position={"relative"}
            lineHeight="6vw"
            color={"transparent"}
            fontWeight={400}
            fontSize={"6vw"}
            className="subtitle"
          >
            {img.subtitle}
          </Heading>
          <Text
            position={"relative"}
            lineHeight="24px"
            fontWeight={400}
            fontSize="24px"
            mt={"2vh"}
          >
            {img.category}
          </Text>
        </Box>
        <Box
          bgImage={img.src}
          bgSize="cover"
          bgPos={"center"}
          transformOrigin="center"
          width={"100%"}
          height="100%"
          transform={onScreen ? "scale(1)" : "scale(0.7)"}
          transition="all 1.5s cubic-bezier(0.77,0,0.175,1)"
          filter={
            onScreen ? "none" : "grayscale(100%) sepia(20%) brightness(80%)"
          }
        />
      </Box>
      <Box></Box>
    </Grid>
  );
};

const ProjectGallery = () => {
  const [activeImage, setActiveImage] = useState(0);
  const imgs = useStore((state) => state.imgs);

  // useEffect(() => {
  //   const elements = gsap.utils.toArray(".gallery-item-wrapper");
  //   const tl = gsap.timeline();
  //   gsap.to(elements, {
  //     xPercent: -100 * (elements.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       pin: true,
  //       trigger: ".gallery",
  //       markers: true,
  //       scroller: "#mainContainer" ,
  //       snap: 1 / (elements.length - 1),
  //       end: () => "+=" + document.getElementById("gallery").offsetWidth,
  //       scrub: 0.5,
  //       start: "top top",
  //     },
  //   });
  //   ScrollTrigger.refresh()
  // }, []);
  return (
    <Box
      // bgColor="#d53f41"
      // pos={"relative"}
      data-scroll-section
      className="horizontalScrolling"
    >
      <Box className="section-inner">
        <Flex
          // h="80vh"
          // p={"10vh 0"}
          // width="400%"
          // overflowX={"hidden"}
          // id="gallery"
          // className="gallery"
          // flexWrap="nowrap"
          // data-scroll
          data-scroll-in-section
        >
          {/* <Box
            id="galleryCounter"
            position={"absolute"}
            top={"10%"}
            left="100px"
            mixBlendMode={"difference"}
            zIndex={1}
            lineHeight="16px"
            fontWeight={"600"}
            fontSize="16px"
            display={"inline-block"}
            color="#dbd8d6"
          >
            <span>{activeImage + 1}</span>
            <Box
              as="span"
              width={"6.25vw"}
              margin="7px 10px"
              h="1px"
              display={"inline-block"}
              bgColor="#fff"
            />
            <span>{imgs.length}</span>
          </Box> */}
          {imgs.map((img, idx) => (
            <GalleryItem
              key={img.id}
              img={img}
              updateActiveImage={setActiveImage}
              idx={idx}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
const NewGallery = () => {
  const [activeImage, setActiveImage] = useState(0);
  const imgs = useStore((state) => state.imgs);
  return (
    <section className="horizontalScrolling" data-scroll-section>
      <div className="section-inner">
        <div data-scroll-in-section>
          {/* <div className="item">
              <p>hiii</p>
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div> */}
          {imgs.map((img, idx) => (
            <GalleryItem
              key={img.id}
              img={img}
              updateActiveImage={setActiveImage}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewGallery;
