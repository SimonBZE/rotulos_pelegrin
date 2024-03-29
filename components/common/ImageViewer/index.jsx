import { useRef } from "react";
import ImageGrid from "@/components/common/ImageGrid";
import Loader from "@/components/common/Loader";

const ImageViewer = ({
  serviceName,
  index,
  handleFileChange,
  handleImageRemove,
  loadingImage,
  formik,
}) => {
  const fileInputRef = useRef(null);
  
  return (
    <div className="space-y-4 mt-5">
      {loadingImage ? (
        <div className=" flex items-center justify-center gap-3 border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white">
          <Loader tamano="25px" /> Espera...
        </div>
      ) : (
        <div
          className="border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            name={`${serviceName}[${index}].imagenes`}
            data-name={`${serviceName}[${index}].imagenes`}
            multiple
            onChange={(e) => handleFileChange(e, serviceName, index)}
            accept="image/png, image/jpeg, image/jpg, image/gif" // Acepta solo imágenes PNG, JPEG, JPG y GIF
          />
          <span className="flex justify-center gap-3 text-center text-graydark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 8h.01"></path>
              <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
              <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54"></path>
              <path d="M16 19h6"></path>
              <path d="M19 16v6"></path>
            </svg>
            Haz clic para seleccionar
          </span>
        </div>
      )}

      <ImageGrid
        images={formik.values[serviceName]?.[index]?.imagenes || []}
        onRemove={(imageIndex) =>
          handleImageRemove(serviceName, index, imageIndex)
        }
      />

      {/* {images[serviceName] && images[serviceName][index] ? (
        <ImageGrid
          images={images[serviceName]}
          onRemove={(imageIndex) =>
            handleImageRemove(serviceName, index, imageIndex)
          }
        />
      ) : null}
      
      {images && images[index] ? (
        <ImageGrid
          images={images}
          onRemove={(imageIndex) =>
            handleImageRemove(serviceName, index, imageIndex)
          }
        />
      ) : null} */}
    </div>
  );
};

export default ImageViewer;
