import { useState, useEffect, useRef } from "react";

const Modal = ({ imageUrl, children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);
  const modal = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      <a
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="cursor-pointer"
      >
        {children}
      </a>
      <div
        className={`fixed inset-0 z-99999 flex h-full w-full items-center justify-center p-14 bg-black/90 ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          onBlur={() => setModalOpen(false)}
          className="w-full max-w-4xl rounded-lg text-center shadow-lg"
        >
          {/* Image container */}
          <div className=" flex mb-4 overflow-hidden rounded-lg relative justify-center">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 right-0 mt-4 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
              aria-label="Close modal"
            >
              X
            </button>
            {/* Image element */}
            <img
              src={imageUrl}
              alt="Modal content"
              style={{ maxHeight:'95vh' }} // 90% of the container width
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
