import React, { useState } from "react";
import Image from "next/image";

const chatData = {
    chats: [
      {
        id: 1,
        imgSrc: "/images/user/user-01.png",
        name: "Henry Dholi",
        lastMessage: "Can we meet tomorrow?",
      },
      {
        id: 2,
        imgSrc: "/images/user/user-02.png",
        name: "Mariya Desoja",
        lastMessage: "I liked your proposal!",
      },
      {
        id: 3,
        imgSrc: "/images/user/user-03.png",
        name: "Robert Jhon",
        lastMessage: "The project details are ready.",
      },
    ],
    messages: {
      1: [
        {
          sender: "Henry Dholi",
          time: "1:55pm",
          message: "Hey, are you available for a meeting tomorrow?",
        },
        {
          sender: "You",
          time: "2:00pm",
          message: "Yes, I'm available. What time works for you?",
        },
        {
          sender: "Henry Dholi",
          time: "2:05pm",
          message: "How about 10 AM?",
        },
      ],
      2: [
        {
          sender: "Mariya Desoja",
          time: "Yesterday",
          message: "I really liked the design you sent!",
        },
        {
          sender: "You",
          time: "Yesterday",
          message: "I'm glad to hear that! Do you have any modifications in mind?",
        },
      ],
      3: [
        {
          sender: "Robert Jhon",
          time: "Monday",
          message: "The project details are ready. Let's discuss them tomorrow.",
        },
        {
          sender: "You",
          time: "Monday",
          message: "Sure, send me the time and place.",
        },
      ],
    },
  };
  
  
  

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState(chatData.chats[0].id);
  const [newMessage, setNewMessage] = useState("");

  const selectChat = (id) => {
    setSelectedChatId(id);
  };

  const renderChatList = () => {
    return chatData.chats.map((chat) => (
      <div
        key={chat.id}
        className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark"
        onClick={() => selectChat(chat.id)}
      >
        <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
          <Image
            src={chat.imgSrc}
            alt="profile"
            className="h-full w-full object-cover object-center"
            width={44}
            height={44}
          />
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
        </div>
        <div className="w-full">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {chat.name}
          </h5>
          <p className="text-sm">{chat.lastMessage}</p>
        </div>
      </div>
    ));
  };

  const renderMessages = () => {
    return chatData.messages[selectedChatId].map((message, index) => (
      <div key={index} className={`max-w-125 ${message.sender === "You" ? "ml-auto" : ""}`}>
        <div className={`mb-2.5 rounded-2xl ${message.sender === "You" ? "rounded-br-none bg-primary" : "rounded-tl-none bg-gray dark:bg-boxdark-2"} py-3 px-5`}>
          <p className={message.sender === "You" ? "text-white" : ""}>{message.message}</p>
        </div>
        <p className={`${message.sender === "You" ? "text-right" : ""} text-xs`}>{message.time}</p>
      </div>
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Aquí debes agregar la lógica para enviar el mensaje al servidor o actualizar la data local
    setNewMessage("");
  };

  return (
    <>
      
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            {/* Lista de Chats */}
            <div className="flex max-h-full flex-col overflow-auto p-5">
              {renderChatList()}
            </div>
          </div>
          <div className="xl:w-3/4">
            {/* Chat Box */}
            <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
              {renderMessages()}
            </div>
            {/* Input para enviar mensajes */}
            <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
              <form className="flex items-center justify-between space-x-4.5" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type something here"
                  className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
