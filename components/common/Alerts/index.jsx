import Image from "next/image";

const Alert = ({ type, title, message, date, nombre, departamento }) => {
  const alertColors = {
    retroceder: {
      border: "border-warning",
      background: "bg-warning bg-opacity-[15%]",
      textColor: "text-[#9D5425]",
      bgColor: "bg-warning bg-opacity-30",
      departamento: "bg-warning"
    },
    "en pausa": {
      border: "border-[#6c7a89]",
      background: "bg-[#6c7a89] bg-opacity-[15%]",
      textColor: "text-black dark:text-[#34D399]",
      bgColor: "bg-[#34D399]",
      departamento: "bg-[#6c7a89]"
    },
    incidencia: {
      border: "border-[#F87171]",
      background: "bg-[#F87171] bg-opacity-[15%]",
      textColor: "text-[#B45454]",
      bgColor: "bg-[#F87171]",
      departamento: "bg-[#F87171]"
    },
  };

  const colors = alertColors[type] || alertColors.warning;
  console.log(type)
  return (
    <div
      className={`flex w-full border-l-6 ${colors?.border} ${colors?.background} px-5 py-5 shadow-md relative`}
    >
      <div className={`absolute right-3 top-0 uppercase ${colors?.departamento} rounded-full px-2 py-1 mt-[-10px] text-white text-xs`}>{departamento}</div>
      <div className="w-full">
        
        <h5 className={`mb-3 text-lg font-semibold ${colors?.textColor}`}>
          {title}
        </h5>
        <p className="leading-relaxed">{message}</p>
        <div className="flex justify-between mt-5 items-center flex-wrap gap-3">
          <p className="labels">{nombre}</p>
          <p className="labels text-sm">{date}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Alert;
