import Modal from "@/components/common/Modal";
import { ENV } from "@/utils";
import React from "react";

export const GridImages = ({item, className}) => {
  return (
    <div
      className={`overflow-x-auto whitespace-nowrap py-2 ${className}`}
      style={{ maxWidth: "calc(100% - 1rem)" }}
    >
      {!!item.imagenes.data &&
        item.imagenes.data.map((image, index) => (
          <div key={index} className="inline-block relative mr-2">
            <Modal imageUrl={`${ENV.SERVER_HOST}${image.attributes.url}`}>
              <img
                src={`${ENV.SERVER_HOST}${image.attributes.url}`}
                alt="Uploaded preview"
                className="w-30 h-30 object-cover rounded-md"
                width={64}
                height={64}
              />
            </Modal>
          </div>
        ))}
    </div>
  );
};
