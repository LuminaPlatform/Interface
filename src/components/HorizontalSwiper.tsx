import React from "react";
import { Swiper } from "swiper/react";

interface HorizontalSwiperProps {
  children: React.ReactNode;
}

export const HorizontalSwiper = ({ children }: HorizontalSwiperProps) => {
  return (
    <Swiper
      direction="horizontal"
      spaceBetween="8"
      slidesPerView="auto"
      freeMode
      style={{ overflow: "visible" }}
    >
      {children}
    </Swiper>
  );
};
