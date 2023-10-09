import Loader from '@/components/common/Loader';
import { ENV } from '@/utils/constants'

export const Contenido = ({ handleMultimediaChange, files, formik,  loading, setFiles }) => {
  
  const handleChange = (e, mediaType, fieldId) => {
    handleMultimediaChange(e, mediaType, fieldId);
    // formik.setFieldValue(fieldId, files[fieldId] || []);
  };

  const handleMediaRemove = (mediaType, index) => {
    setFiles((prevFiles) => {
      // Crear una copia del array actual de medios.
      const newMediaArray = prevFiles[mediaType].flat();
      // Eliminar el medio en el índice proporcionado.
      newMediaArray.splice(index, 1);
      // Actualizar el estado con el nuevo array de medios.
      return {
        ...prevFiles,
        [mediaType]: [newMediaArray],
      };
    });
  };

  return (
    <div className="bg-secondary p-5 mt-5 rounded-lg">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleChange(e, "video", "videos")}
        name="videos"
        multiple
      />
      <div className="flex overflow-x-hidden overflow-x-sroll w-full max-h-65">
        { files.videos?.[0] ? 
          ( files.videos.flat().map( (file, index) => (            
            
              <div key={index} className="relative mt-4">
              {loading ?  <Loader /> : 
                <>
                  <video
                      src={`${ENV.SERVER_HOST}${file.url}`}
                      className="w-full h-auto max-w-full"
                      controls
                    />
                    <a
                    
                      onClick={() => handleMediaRemove('videos', index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                    >
                      x
                    </a>
                </>
              }
                
              </div>
            
          ) ) ):
          null      
        }
      </div>  

      
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleChange(e, "audio", "audios")}
        name="audios"
        multiple
      />

      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e, "image", "fotos")}
        name="fotos"
        multiple
      />
    </div>
  );
};
