const Skeleton = ({ type = "square", size = "h-4 w-4", circleSize = "h-4 w-4" }) => {
    const commonClasses = "bg-bodydark animate-pulse";
    const squareClasses = `rounded-md ${size} ${commonClasses}`;
    const circleClasses = `rounded-full ${circleSize} ${commonClasses}`;
  
    return (
      <div>
        {type === "square" && <div className={squareClasses}></div>}
        {type === "circle" && <div className={circleClasses}></div>}
      </div>
    );
  };
  
  export default Skeleton;