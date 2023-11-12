import { useRef, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import { ENV } from "@/utils/constants";
import useAudioRecorder from "@/hooks/audioRecorder";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation } from "swiper/modules";

export const Contenido = ({
  handleMultimediaChange,
  files,
  formik,
  loading,
  setFiles,
  uploadAudioFromBlob,
}) => {
  const fileVideoRef = useRef(null);
  const fileAudioRef = useRef(null);
  const fileFotoRef = useRef(null);

  const { audioURL, isRecording, startRecording, stopRecording, error } =
    useAudioRecorder();

    const handleChange = (e, mediaType, fieldId) => {
      handleMultimediaChange(e, mediaType, fieldId);
      // formik.setFieldValue(fieldId, files[fieldId] || []);
    };

  useEffect(() => {
    if (audioURL !== "") {
      uploadAudioFromBlob(audioURL, "audios");
    }
  }, [audioURL]);

  const handleMediaRemove = (mediaType, index) => {
    setFiles((prevFiles) => {
      // Crear una copia del array actual de medios.
      const newMediaArray = prevFiles[mediaType].flat();
      // Eliminar el medio en el índice proporcionado.
      newMediaArray.splice(index, 1);
      // Actualizar el estado con el nuevo array de medios.
      return {
        ...prevFiles,
        [mediaType]: newMediaArray,
      };
    });
  };

  return (
    <div className="rounded-xl mt-5 py-5 px-5 md:p-10 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark grid grid-cols-1 auto-cols-auto gap-4 md:grid-cols-3 lg:grid-cols-3 xl:auto-cols-min p-5">
      <div>
        <div
          className="border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white flex justify-center items-center gap-3"
          onClick={() => fileVideoRef.current.click()}
        >
          <input
            className="hidden"
            type="file"
            accept="video/*"
            onChange={(e) => handleChange(e, "video", "videos")}
            name="videos"
            ref={fileVideoRef}
          />
          {loading.video ? (
            <Loader tamano={30} />
          ) : (
            <Image
              src="/images/icon/movie.svg"
              width={24}
              height={24}
              alt="videos"
            />
          )}

          <p>Seleccionar vídeo</p>
        </div>

        <Swiper
          effect={"fade"}
          navigation={true}
          modules={[EffectFade, Navigation]}
          className="mt-5"
        >
          {files.videos?.[0]
            ? files.videos.flat().map((file, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <>
                      <video
                        src={`${ENV.SERVER_HOST}${file.url}`}
                        className="w-full max-h-[150px] min-h-[150px] rounded-xl"
                        controls
                      />
                      <a
                        onClick={() => handleMediaRemove("videos", index)}
                        className="absolute top-1 right-1 bg-black text-white px-2 py-1 rounded-full cursor-pointer shadow-whiten"
                      >
                        X
                      </a>
                    </>
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>

      <div>
        {error && <p>Error: {error.message}</p>}
        {!isRecording ? (
          <a
            onClick={startRecording}
            disabled={isRecording}
            className="border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white flex justify-center items-center gap-3 w-full"
          >
            {loading.audios ? (
              <Loader tamano={30} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-6 h-6 mr-3 text-gray-200"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                <path d="M9 17v-13h10v8"></path>
                <path d="M9 8h10"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
              </svg>
            )}
            Grabar
          </a>
        ) : (
          <a
            onClick={stopRecording}
            disabled={!isRecording}
            className="w-full p-4 mr-2 text-sm font-medium text-white bg-meta-1 rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:outline-none flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-6 h-6 mr-3 text-gray-200 animate-ping"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z"
                strokeWidth="0"
                fill="currentColor"
              ></path>
            </svg>
            Grabando...
          </a>
        )}

        <Swiper
          effect={"fade"}
          navigation={true}
          modules={[EffectFade, Navigation]}
          className="mt-5"
        >
          {files.audios?.[0]
            ? files.audios.flat().map((file, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <>
                      <div className="w-full max-h-[150px] min-h-[150px] rounded-xl flex flex-col items-center justify-center bg-secondary rounded-xl p-3">
                        <p className="text-xl font-black text-black mb-2 uppercase">
                          Audio #{index + 1}
                        </p>
                        <audio
                          src={`${ENV.SERVER_HOST}${file.url}`}
                          controls
                          className="w-[70%]"
                        />
                      </div>
                      <a
                        onClick={() => handleMediaRemove("audios", index)}
                        className="absolute top-1 right-1 bg-black text-white px-2 py-1 rounded-full cursor-pointer shadow-whiten"
                      >
                        X
                      </a>
                    </>
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
      <div>
        <div
          className="border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white flex justify-center items-center gap-3"
          onClick={() => fileFotoRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, "image", "fotos")}
            name="fotos"
            multiple
            ref={fileFotoRef}
            className="hidden"
          />
          {loading.image ? (
            <Loader tamano={30} />
          ) : (
            <Image
              src="/images/icon/photo-plus.svg"
              width={24}
              height={24}
              alt="videos"
            />
          )}
          <p>Seleccionar fotos</p>
        </div>
        <Swiper
          effect={"fade"}
          navigation={true}
          modules={[EffectFade, Navigation]}
          className="mt-5"
        >
          {files.fotos?.[0]
            ? files.fotos.flat().map((file, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <>
                      <img
                        src={`${ENV.SERVER_HOST}${file.url}`}
                        className="w-full max-h-[150px] min-h-[150px] rounded-xl object-cover"
                        alt="presupuesto"
                      />
                      <a
                        onClick={() => handleMediaRemove("fotos", index)}
                        className="absolute top-1 right-1 bg-black text-white px-2 py-1 rounded-full cursor-pointer shadow-whiten"
                      >
                        X
                      </a>
                    </>
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};
