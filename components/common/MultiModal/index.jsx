import { useState, useEffect, useRef } from 'react';

export const MultiModal = ({ isOpen, close, width = 'max-w-md', height = 'auto', children }) => {
  const ref = useRef();

  // Cierra el modal si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999999 bg-white bg-opacity-80 overflow-y-auto h-full w-full" id="my-modal">
      <div className="flex items-center justify-center h-full m-3">
        <div ref={ref} className={`relative bg-white rounded shadow-lg ${width} ${height} p-6`}>
          {children}
          <button
            className="absolute top-0 right-0 mt-4 mr-4"
            onClick={close}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};