import { Mic, Volume2, Phone } from 'lucide-react';

const ActiveCall = ({ callerInfo, onEndCall }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[120px]">

      <h1 className="text-white text-[32px] font-light mb-2">
        {callerInfo.location}
      </h1>
      <p className="text-gray-400 text-[18px] mb-12">
        {callerInfo.number}
      </p>

      <div className="flex items-center gap-2 mb-32">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-500 text-xl">02:49</span>
      </div>

      <div className="flex gap-10 mb-24">
        <button className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
          <Mic className="text-white" />
        </button>
        <button className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
          <Volume2 className="text-white" />
        </button>
      </div>

      <button
        onClick={onEndCall}
        className="w-[70px] h-[70px] rounded-full bg-red-500 flex items-center justify-center"
      >
        <Phone className="text-white rotate-135" />
      </button>
    </div>
  );
};

export default ActiveCall;