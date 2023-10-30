import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation } from "swiper/modules";
import { ENV } from "@/utils";

export const SliderImages = ({imagenes}) => {
    console.log('images', imagenes.data[0])
  return (
    <Swiper
          effect={"fade"}
          navigation={true}
          modules={[EffectFade, Navigation]}
          className="mt-5"
        >
          {imagenes.data?.[0]
            ? imagenes.data.flat().map((file, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <>
                      <img
                        src={`${ENV.SERVER_HOST}${file.attributes.url}`}
                        className="w-full max-h-[150px] min-h-[150px] rounded-xl object-contain"
                        alt="presupuesto"
                      />
                    </>
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
  )
}
