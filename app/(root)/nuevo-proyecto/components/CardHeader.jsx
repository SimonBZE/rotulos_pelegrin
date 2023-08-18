export const CardHeader = ({ onRemove, title }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="labels text-xl">{title}</p>
        <a
          className="rounded-full px-[8px] py-[3px]  bg-black text-white text-xs"
          onClick={onRemove}
        >
          X
        </a>
      </div>
      <div
        className="my-3"
        style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
      ></div>
    </>
  );
};
