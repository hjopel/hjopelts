import React, { forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "./customHooks/useOnScreen";
import useStore, { Image } from "./customHooks/useStore";
import { Flex, Box, Grid, Heading, Text, TagRightIcon } from "@chakra-ui/react";
import createGeometry from "three-bmfont-text";
import robotoFont from "./Roboto.json";
import * as THREE from "three";
// global.THREE = THREE;

gsap.registerPlugin(ScrollTrigger);

// const oldGItem = ( <Grid
//   className="gallery-item-wrapper"
//   h="80%"
//   gridTemplateColumns={"20vw 1fr 200px"}
//   width="100vw"
//   ref={ref}
// >
//   <Box></Box>
//   <Box w="100%" h="80%" pos={"relative"}>
//     <Box
//       position={"absolute"}
//       bottom="10%"
//       zIndex={1}
//       transform="translateX(-20%)"
//       color={"white"}
//     >
//       <Heading as="h1" lineHeight={"6vw"} fontWeight={600} fontSize="6vw">
//         {img.title}
//       </Heading>
//       <Heading
//         as="h2"
//         position={"relative"}
//         lineHeight="6vw"
//         color={"transparent"}
//         fontWeight={400}
//         fontSize={"6vw"}
//         className="subtitle"
//       >
//         {img.subtitle}
//       </Heading>
//       <Text
//         position={"relative"}
//         lineHeight="24px"
//         fontWeight={400}
//         fontSize="24px"
//         mt={"2vh"}
//       >
//         {img.category}
//       </Text>
//     </Box>
//     <Box
//       bgImage={img.src}
//       bgSize="cover"
//       bgPos={"center"}
//       transformOrigin="center"
//       width={"100%"}
//       height="100%"
//       transform={onScreen ? "scale(1)" : "scale(0.7)"}
//       transition="all 1.5s cubic-bezier(0.77,0,0.175,1)"
//       filter={
//         onScreen ? "none" : "grayscale(100%) sepia(20%) brightness(80%)"
//       }
//     />
//   </Box>
//   <Box></Box>
// </Grid>
// );)
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
    <>
      <Flex
        w="100vw"
        h="100%"
        position="absolute"
        bottom={0}
        left={0}
        zIndex={0}
        transform="rotate(-30deg) translate(-20%, 20%)"
      >
        <Heading
          fontSize={"60rem"}
          className="outlineBg"
          pointerEvents="none"
          fontWeight={100}
        >
          hjopel
        </Heading>
      </Flex>
      <Grid
        className="gallery-item-wrapper"
        h="100%"
        gridTemplateColumns={"40% 60%"}
        width="100vw"
        ref={ref}
      >
        <Flex
          w="100%"
          h="100%"
          justify="center"
          align="center"
          flexDir={"column"}
        >
          <Flex maxH="20%" justify="center" align="center" flexDir={"column"}>
            <Text
              fontSize={40}
              fontStyle="italic"
              fontWeight={100}
              textAlign="center"
              w="100%"
            >
              Design & Website-System
            </Text>
            <Text textAlign="center" w="100%">
              2022
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" h="100%" justify={"center"} align="center">
          <Box
            position={"absolute"}
            left={"30%"}
            transform={`rotate(-60deg) scale(${onScreen ? 1 : 0.7})`}
            transition="all 1.5s cubic-bezier(0.77,0,0.175,1)"
            w="50%"
            h="160%"
            bgImage={img.src}
            bgPos="center"
            bgSize={"contain"}
            bgRepeat="no-repeat"
            filter={
              onScreen ? "none" : "grayscale(100%) sepia(20%) brightness(80%)"
            }
            opacity={0}
          />
        </Flex>
      </Grid>
    </>
  );
};

// const ProjectGallery = () => {
//   const [activeImage, setActiveImage] = useState(0);
//   const imgs = useStore((state) => state.imgs);
//   return (
//     <Box
//       bgColor="#d53f41"
//       // pos={"relative"}
//       data-scroll-section
//       className="horizontalScrolling"
//     >
//       <Box className="section-inner">
//         <Flex
//           // h="80vh"
//           // p={"10vh 0"}
//           // width="400%"
//           // overflowX={"hidden"}
//           // id="gallery"
//           // className="gallery"
//           // flexWrap="nowrap"
//           // data-scroll
//           data-scroll-in-section
//         >
//           <Box
//             position={"relative"}
//             top={"10%"}
//             left="100px"
//             mixBlendMode={"difference"}
//             zIndex={1}
//             lineHeight="16px"
//             fontWeight={"600"}
//             fontSize="16px"
//             display={"inline-block"}
//             color="#ababab"
//           >
//             <span>{activeImage + 1}</span>
//             <Box
//               as="span"
//               width={"6.25vw"}
//               margin="7px 10px"
//               h="1px"
//               display={"inline-block"}
//               bgColor="#fff"
//             />
//             <span>{imgs.length}</span>
//           </Box>
//           {imgs.map((img, idx) => (
//             <GalleryItem
//               key={img.id}
//               img={img}
//               updateActiveImage={setActiveImage}
//               idx={idx}
//             />
//           ))}
//         </Flex>
//       </Box>
//     </Box>
//   );
// };
const NewGallery = forwardRef<any>((props, ref) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const imgs: Image[] = useStore((state) => state.imgs);
  const txtr: THREE.Texture = new THREE.TextureLoader().load("/Roboto.png");

  // const geom = createGeometry({
  //   align: "center",
  //   font: robotoFont,
  //   text: 'Hello',
  //   flipY: txtr.flipY
  // })

  // const mat = new THREE.RawShaderMaterial()
  return (
    <Box data-scroll-section ref={ref}>
      <Box
        position={"relative"}
        top={"10%"}
        left="100px"
        mixBlendMode={"difference"}
        zIndex={1}
        lineHeight="16px"
        fontWeight={"600"}
        fontSize="16px"
        display={"inline-block"}
        color="#ababab"
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
      </Box>
      <div className="section-inner">
        <div data-scroll-in-section>
          {/* {imgs.map((img, idx) => ( */}
          <GalleryItem
            // key={img.id}
            img={imgs[0]}
            updateActiveImage={setActiveImage}
            idx={0}
          />
          {/* ))} */}
        </div>
      </div>
    </Box>
  );
});
export default NewGallery;
