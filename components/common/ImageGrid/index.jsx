import Image from 'next/image'
import { ENV } from '@/utils/constants'

const ImageGrid = ({ images, onRemove }) => {
 
  return (
    <div className="overflow-x-auto whitespace-nowrap py-2" style={{ maxWidth: 'calc(100% - 1rem)'}}>
      {images?.map((image, index) => (
        
        <div key={index} className="inline-block relative mr-2">          
          <img
            src={`${ENV.SERVER_HOST}${image.url}`}
            alt="Uploaded preview"
            className="w-16 h-16 object-cover rounded-md"
            width={64}
            height={64}
          />
          <a
            onClick={() => onRemove(index)}
            className=" cursor-pointer absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center bg-black rounded-full p-3"
          >
            X
          </a>
        </div>

      ))}
    </div>
  );
};

export default ImageGrid;
