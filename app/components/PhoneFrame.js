const PhoneFrame = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[852px] bg-black relative">
        {/* Main Screen */}
        <div className="relative w-full h-full bg-black overflow-hidden">
          {/* Notch Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[210px] h-[35px] bg-black rounded-b-3xl z-30 flex items-center justify-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-900"></div>
            <div className="w-20 h-3 bg-gray-900 rounded-full"></div>
          </div>
          
          {/* Content */}
          <div className="relative w-full h-full">
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;