"use client";
import * as React from "react";
import { cj, KEY_CODES } from "../../utils";
import { SliderContext } from "../helpers/sliderContext";
import type { Props } from "../../types";

type SliderDotProps = {
  index: number;
  focusedDot: number | null;
  handleFocus: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  setFocusedDot: React.Dispatch<React.SetStateAction<number | null>>;
};

const SliderDot = React.forwardRef<HTMLDivElement, SliderDotProps>(
  function SliderDot(
    { index, focusedDot, handleFocus, setFocusedDot }: SliderDotProps,
    ref
  ) {
    const {
      slideAmount,
      navSpacing,
      navNumbers,
      slide: { current: selectedSlide },
      setCurrentSlide,
    } = React.useContext(SliderContext);

    const innerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (focusedDot === index) {
        innerRef.current?.focus();
      }
    }, [focusedDot, index]);

    const isSlideActive = selectedSlide === index;
    const label = navNumbers ? index + 1 : "";

    return (
      <div
        className={`w-slider-dot ${isSlideActive ? "w-active" : ""}`}
        aria-label={`Show slide ${index + 1} of ${slideAmount}`}
        aria-pressed={isSlideActive}
        role="button"
        tabIndex={isSlideActive ? 0 : -1}
        style={{
          marginRight: `${navSpacing}px`,
          marginLeft: `${navSpacing}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setFocusedDot(index);
          setCurrentSlide(index);
        }}
        ref={innerRef}
        onKeyDown={handleFocus}
      >
        {label}
      </div>
    );
  }
);

type SliderNavProps = Props<"div">;

export type { SliderNavProps };

const SliderNav = React.forwardRef<HTMLDivElement, SliderNavProps>(
  function SliderNav({ className = "", ...props }, ref) {
    const {
      slideAmount,
      navInvert,
      navNumbers,
      navRound,
      navShadow,
      setAutoplayPause,
      setCurrentSlide,
    } = React.useContext(SliderContext);

    const [focusedDot, setFocusedDot] = React.useState<number | null>(null);

    const handleFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case KEY_CODES.ENTER:
        case KEY_CODES.SPACE:
          e.preventDefault();
          if (focusedDot !== null) {
            setCurrentSlide(focusedDot);
          }
          break;
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.ARROW_UP:
          e.preventDefault();
          setFocusedDot((prev) => Math.max((prev ?? 0) - 1, 0));
          break;
        case KEY_CODES.ARROW_RIGHT:
        case KEY_CODES.ARROW_DOWN:
          e.preventDefault();
          setFocusedDot((prev) => Math.min((prev ?? 0) + 1, slideAmount - 1));
          break;
        case KEY_CODES.HOME:
          e.preventDefault();
          setFocusedDot(0);
          break;
        case KEY_CODES.END:
          e.preventDefault();
          setFocusedDot(slideAmount - 1);
          break;
        default:
          return;
      }
    };

    const dots = [...Array(slideAmount).keys()].map((_, i) => (
      <SliderDot
        key={i}
        index={i}
        focusedDot={focusedDot}
        handleFocus={handleFocus}
        setFocusedDot={setFocusedDot}
      />
    ));

    return (
      <div
        {...props}
        onFocus={(e) => {
          e.stopPropagation();
          setAutoplayPause(true);
        }}
        onBlur={() => setAutoplayPause(false)}
        onMouseLeave={(e) => e.stopPropagation()}
        className={cj(
          className,
          `w-slider-nav ${navInvert ? "w-slider-nav-invert" : ""} ${
            navShadow ? "w-shadow" : ""
          } ${navRound ? "w-round" : ""} ${navNumbers ? "w-num" : ""}`
        )}
        ref={ref}
      >
        {dots}
      </div>
    );
  }
);

export default SliderNav;
