import { useState, useRef } from "react";
import { CardHeader } from "./CardHeader";
import ImageUploader from "@/components/common/ImageUploader";

export const Print = ({ index, data, onChange, onRemove }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    const combinedImageURLs = [...previewImages, ...newImageURLs];
    setPreviewImages(combinedImageURLs);
  };

  const handleImageRemove = (removeIndex) => {
    const filteredImages = previewImages.filter(
      (_, imgIndex) => imgIndex !== removeIndex
    );
    setPreviewImages(filteredImages);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="rounded-md bg-[#2FA7FF30] mt-5 p-3">
      <CardHeader title={"Impresión"} onRemove={onRemove} />

      <div className="flex items-center">
        <label htmlFor="nombre" className="labels ml-2">
          Nombre
        </label>

        <input
          type="text"
          id="nombre"
          className="formulario ml-2"
          name="impresion"
          data-index={index}
          
          value={data.nombre || ""}
          onChange={(e) =>
            onChange("impresion", index, "nombre", e.target.value)
          }
        />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <input
            type="number"
            id="ancho"
            className="formulario w-14"
            name="impresion"
            data-index={index}
            value={data.ancho || ""}
            onChange={(e) =>
              onChange("impresion", index, "ancho", e.target.value)
            }
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <input
            type="number"
            id="alto"
            className="formulario w-14"
            name="impresion"
            data-index={index}
            value={data.alto || ""}
            onChange={(e) =>
              onChange("impresion", index, "alto", e.target.value)
            }
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="profundo">
            Profundo
          </label>
          <input
            type="number"
            id="profundo"
            className="formulario w-14"
            name="impresion"
            data-index={index}
            value={data.profundo || ""}
            onChange={(e) =>
              onChange("impresion", index, "profundo", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="material">
          Material
        </label>
        <select
          name="impresion"
          id="material"
          className="formulario"
          value={data.material || ""}
          onChange={(e) =>
            onChange("impresion", index, "material", e.target.value)
          }
        >
          <option>
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
        </select>
      </div>

      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="laminacion">
          Laminación
        </label>
        <select
          name="impresion"
          id="laminacion"
          className="formulario"
          value={data.laminacion || ""}
          onChange={(e) =>
            onChange("impresion", index, "laminacion", e.target.value)
          }
        >
          <option>
            Selecciona uno
          </option>
          <option value="5 años">5 años</option>
          <option value="6 años">6 años</option>
          <option value="7 años">7 años</option>
        </select>
      </div>

      <ImageUploader 
        onImagesChange={(imageURLs) => {
          onChange('impresion', index, 'imagenes', imageURLs);
        }}
      />

      {/* Precio */}
      <div className="flex justify-end mt-4 items-center">
        <input
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`impresion`}
          data-index={index}
          data-field="precio"
          value={data.precio || ""}
          onChange={(e) =>
            onChange("impresion", index, "precio", e.target.value)
          }
          placeholder="Precio"
        />
        <label htmlFor="unidades ml-2" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};
