"use client";
import * as React from "react";
import { EASING_FUNCTIONS } from "../../utils";

export type SliderConfig = {
  navSpacing: number;
  navShadow: boolean;
  autoplay: boolean;
  delay: number;
  iconArrows: boolean;
  animation: "slide" | "cross" | "outin" | "fade" | "over";
  navNumbers: boolean;
  easing: keyof typeof EASING_FUNCTIONS;
  navRound: boolean;
  hideArrows: boolean;
  disableSwipe: boolean;
  duration: number;
  infinite: boolean;
  autoMax: number;
  navInvert: boolean;
};

export type SlideState = { current: number; previous: number };

export const DEFAULT_SLIDER_CONFIG: SliderConfig = {
  navSpacing: 3,
  navShadow: false,
  autoplay: false,
  delay: 4000,
  iconArrows: true,
  animation: "slide",
  navNumbers: true,
  easing: "ease",
  navRound: true,
  hideArrows: false,
  disableSwipe: false,
  duration: 500,
  infinite: true,
  autoMax: 0,
  navInvert: false,
};

export const SliderContext = React.createContext<
  SliderConfig & {
    slideAmount: number;
    setSlideAmount: React.Dispatch<React.SetStateAction<number>>;
    slide: SlideState;
    setCurrentSlide: (current: number) => void;
    goToNextSlide: () => void;
    goToPreviousSlide: () => void;
    isAutoplayPaused: boolean;
    setAutoplayPause: React.Dispatch<React.SetStateAction<boolean>>;
  }
>({
  ...DEFAULT_SLIDER_CONFIG,
  slideAmount: 0,
  setSlideAmount: () => undefined,
  setCurrentSlide: () => undefined,
  goToNextSlide: () => undefined,
  goToPreviousSlide: () => undefined,
  slide: { current: 0, previous: 0 },
  isAutoplayPaused: false,
  setAutoplayPause: () => undefined,
});
