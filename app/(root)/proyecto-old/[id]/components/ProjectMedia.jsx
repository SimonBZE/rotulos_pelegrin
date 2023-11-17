import { ENV } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation } from "swiper/modules";

export const ProjectMedia = ({ proyecto }) => {
  const { fotos, videos, audios } = proyecto.attributes;
  
  return (
    <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <p className="labels">Contenido</p>
      </div>
      <div className="grid grid-cols-1 auto-cols-auto gap-4 md:grid-cols-3 lg:grid-cols-3 xl:auto-cols-min p-5">
        <div className="flex-1">
          <Swiper
            effect={"fade"}
            navigation={true}
            modules={[EffectFade, Navigation]}
            className="mt-5"
          >
            {audios.data?.[0]
              ? audios.data.map((file, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <>
                        <div className="w-full max-h-[150px] min-h-[150px] rounded-xl flex flex-col items-center justify-center bg-secondary rounded-xl p-3">
                          <p className="text-xl font-black text-black mb-2 uppercase">
                            Audio #{index + 1}
                          </p>
                          <audio
                            src={`${ENV.SERVER_HOST}${file.attributes.url}`}
                            controls
                            className="w-[70%]"
                          />
                        </div>
                        
                      </>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>

        <div>
          <Swiper
            effect={"fade"}
            navigation={true}
            modules={[EffectFade, Navigation]}
            className="mt-5"
          >
            {videos.data?.[0]
              ? videos.data.map((file, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <>
                        <video
                          src={`${ENV.SERVER_HOST}${file.attributes.url}`}
                          className="w-full max-h-[150px] min-h-[150px] rounded-xl"
                          controls
                        />
                        
                      </>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>

        <div>
          <Swiper
            effect={"fade"}
            navigation={true}
            modules={[EffectFade, Navigation]}
            className="mt-5"
          >
            {fotos.data?.[0]
              ? fotos.data.map((file, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <>
                        <img
                          src={`${ENV.SERVER_HOST}${file.attributes.url}`}
                          className="w-full max-h-[150px] min-h-[150px] rounded-xl object-cover"
                          alt="presupuesto"
                        />
                        
                      </>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
