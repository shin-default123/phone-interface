import { Phone, PhoneOff, MessageCircle, Voicemail } from 'lucide-react';

const IncomingCall = ({ callerInfo, onAnswer, onDecline }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between pt-[70px] pb-[100px] px-6">

      {/* Top text */}
      <div className="flex flex-col items-center mt-24">
        <p className="text-gray-400 text-[18px] mb-2">{callerInfo.location}</p>
        <h1 className="text-white text-[32px] font-light tracking-tight">
          {callerInfo.number}
        </h1>
      </div>

      {/* Message + Voicemail */}
      <div className="flex justify-center gap-24 mb-8">
        <div className="flex flex-col items-center">
          <button className="w-14 h-14 rounded-full bg-gray-700/60 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          <span className="text-white text-sm mt-2">Message</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-14 h-14 rounded-full bg-gray-700/60 flex items-center justify-center">
            <Voicemail className="w-6 h-6 text-white" />
          </button>
          <span className="text-white text-sm mt-2">Voicemail</span>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-between px-10">
        <div className="flex flex-col items-center">
          <button
            onClick={onDecline}
            className="w-[70px] h-[70px] rounded-full bg-red-500 flex items-center justify-center"
          >
            <PhoneOff className="w-7 h-7 text-white rotate-135" />
          </button>
          <span className="text-white mt-2">Decline</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={onAnswer}
            className="w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center"
          >
            <Phone className="w-7 h-7 text-white" />
          </button>
          <span className="text-white mt-2">Accept</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;