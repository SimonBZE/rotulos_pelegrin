import { Badge, Button } from "@nextui-org/react";
import { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import Mensajes from "./Mensajes";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";  // Importar framer-motion

export const Burbuja = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-10 flex flex-col items-end">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: chatOpen ? 1 : 0, y: chatOpen ? 0 : 50 }}
        transition={{ duration: 0.2 }}
        className={`max-w-100 w-full max-h-115 h-screen bg-white rounded-xl shadow-lg mb-7 m-2 ${
          !chatOpen && "hidden"
        }`}
      >
        <Mensajes />
      </motion.div>
      <Badge content="0" shape="circle" color="danger">
        <Button
          className="rounded-full w-20 h-20 text-6xl text-white bg-blue-600"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? <IoCloseOutline /> : <CiChat1 />}
        </Button>
      </Badge>
    </div>
  );
};
