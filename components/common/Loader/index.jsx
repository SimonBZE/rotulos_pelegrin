 const Loader = ({tamano}) => {
  
  return (
    <div className="flex items-center justify-center">
      <div className={`h-[${tamano}] w-[${tamano}] animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`} style={{width:tamano, height: tamano}}></div>
    </div>
  );
};

export default Loader;