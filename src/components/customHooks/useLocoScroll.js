import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start) {
  // useEffect(() => {
  //   if (!start) return;
  //   let locoScroll = null;

    // if (scroll) {
    //   const scrollEl = document.getElementById("mainContainer");

    //   scroll.on("scroll", () => {
    //     ScrollTrigger.update();
    //   });

    //   ScrollTrigger.scrollerProxy(scrollEl, {
    //     scrollTop(value) {
    //       if (scroll) {
    //         return arguments.length
    //           ? scroll.scrollTo(value, 0, 0)
    //           : scroll.scroll.instance.scroll.y;
    //       }
    //       return null;
    //     },
    //     scrollLeft(value) {
    //       if (scroll) {
    //         return arguments.length
    //           ? scroll.scrollTo(value, 0, 0)
    //           : scroll.scroll.instance.scroll.x;
    //       }
    //       return null;
    //     },
    //   });

    //   const lsUpdate = () => {
    //     if (scroll) {
    //       scroll.update();
    //     }
    //   };

    //   ScrollTrigger.addEventListener("refresh", lsUpdate);
    //   ScrollTrigger.refresh();
    // }

    // return () => {
    //   // if (scroll) {
    //   //   ScrollTrigger.removeEventListener("refresh", lsUpdate);
    //   // }
    // };
  // }, [scroll]);
}
