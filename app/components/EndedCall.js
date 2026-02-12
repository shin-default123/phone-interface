import { Phone, MessageCircle, Voicemail } from 'lucide-react';

const EndedCall = ({ callerInfo, onCallBack }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[120px]">

      <h1 className="text-white text-[32px] font-light mb-2">
        {callerInfo.location}
      </h1>
      <p className="text-gray-400 text-[18px] mb-2">{callerInfo.number}</p>
      <p className="text-gray-500 mb-10">Call Ended</p>

      <div className="flex gap-20 mb-20">
        <div className="flex flex-col items-center">
          <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
            <MessageCircle className="text-white" />
          </button>
          <span className="text-white mt-2">Message</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
            <Voicemail className="text-white" />
          </button>
          <span className="text-white mt-2">Voicemail</span>
        </div>
      </div>

      <button
        onClick={onCallBack}
        className="w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center"
      >
        <Phone className="text-white" />
      </button>
    </div>
  );
};

export default EndedCall;