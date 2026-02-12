const StatusBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[47px] flex items-center justify-between px-6 z-20">
      <span className="text-white text-[17px] font-semibold">4:24</span>
      <div className="flex items-center gap-1.5">
        <span className="text-white text-[15px] font-semibold">5G</span>
        <div className="flex items-center">
          <div className="w-[22px] h-[12px] border-2 border-white rounded-[4px] relative">
            <div className="absolute inset-[2px] bg-white"></div>
          </div>
          <span className="text-white text-[15px] font-semibold ml-1">91%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;