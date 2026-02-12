'use client';

import React, { useState, useEffect } from 'react';

// --- Icons ---
const Icons = {
  Signal: () => <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v4H2v-4zm4-5h2v9H6v-9zm4-4h2v13h-2V8zm4-3h2v16h-2V5zm4-2h2v18h-2V3z"/></svg>,
  Wifi: () => <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C6.95 3 3 6.95 3 12c0 1.27.26 2.47.72 3.57L2 21l5.43-1.72c1.1.46 2.3.72 3.57.72 5.05 0 9-3.95 9-9s-3.95-9-9-9z"/></svg>,
  Battery: () => (
    <div className="w-6 h-3 border border-white rounded-sm flex items-center p-0.5">
      <div className="h-full w-4/5 bg-white rounded-sm"></div>
    </div>
  ),
  Avatar: () => <svg className="w-full h-full p-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  Phone: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
  Mute: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>,
  Keypad: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
  Speaker: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
  Hold: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  AddCall: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 8h3v3h2V8h3V6h-3V3h-2v3h-3v2zM2 17h2v4H2v-4zm4-5h2v9H6v-9zm4-4h2v13h-2V8zm4-3h2v16h-2V5zm4-2h2v18h-2V3z"/></svg>, // Simplified placeholder
  Contacts: () => <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg> // Simplified placeholder
};

export default function PhoneInterface() {
  const [view, setView] = useState('incoming'); // 'incoming', 'active', 'ended'
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState('');
  
  // Toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  // Status Bar Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Call Duration Timer
  useEffect(() => {
    let timer;
    if (view === 'active' && !isOnHold) {
      timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, isOnHold]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = () => {
    setDuration(0);
    setView('active');
  };

  const handleDecline = () => {
    setView('ended');
  };

  const handleEndCall = () => {
    setView('ended');
  };

  const handleReset = () => {
    setIsMuted(false);
    setIsSpeaker(false);
    setIsOnHold(false);
    setDuration(0);
    setView('incoming');
  };

  return (
    // Outer container: Simulating the phone screen in a centered desktop view
    <div className="h-full w-full flex items-center justify-center bg-gray-900">
      
      {/* Phone Frame */}
      <div 
        className="relative w-full max-w-[400px] h-full max-h-[850px] bg-black sm:rounded-[40px] shadow-2xl overflow-hidden sm:border-[8px] sm:border-[#1a1a1a] flex flex-col"
      >
        
        {/* Notch (Visual Only) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-[20px] z-50 flex items-center justify-center">
          <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end pr-2">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="w-full h-12 flex items-end justify-between px-6 pb-2 z-40 text-white shrink-0">
          <span className="text-[15px] font-semibold tracking-tight ml-2">{time}</span>
          <div className="flex items-center gap-1.5 mr-2">
             <Icons.Signal />
             <Icons.Wifi />
             <Icons.Battery />
          </div>
        </div>

        {/* ================= INCOMING VIEW ================= */}
        {view === 'incoming' && (
          <div className="flex-1 flex flex-col items-center pt-16 pb-12 px-6 relative z-30 animate-fade-in">
            
            {/* Caller Info */}
            <div className="flex-1 w-full flex flex-col items-center">
              <p className="text-gray-400 text-lg font-normal mb-8 tracking-wide">Mobile</p>
              
              <h1 className="text-white text-[34px] font-normal mb-2 tracking-tight leading-tight">Potential Spam</h1>
              <p className="text-gray-400 text-xl tracking-wide">Agusan del Sur</p>
            </div>

            {/* Slide to Answer Area */}
            <div className="w-full mt-auto mb-8 animate-slide-up">
              
              {/* Decline/Message Buttons row (optional based on your design, sticking to simple slide here) */}
               
               {/* The Slider */}
               <div 
                 className="relative w-full h-[80px] flex items-center cursor-pointer group"
                 onClick={handleAnswer}
               >
                 <div className="absolute w-full text-center text-white/50 text-xl font-normal animate-pulse group-hover:text-white transition-colors">
                    slide to answer
                 </div>
                 
                 {/* Slider Button */}
                 <div className="absolute left-1 z-10 h-[72px] w-[72px] bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:translate-x-2">
                   <div className="text-green-500 animate-pulse">
                     <Icons.Phone />
                   </div>
                 </div>
                 
                 {/* Slider Track */}
                 <div className="w-full h-[80px] rounded-full bg-white/20 backdrop-blur-md border border-white/10" />
               </div>
            </div>
          </div>
        )}

        {/* ================= ACTIVE VIEW ================= */}
        {view === 'active' && (
          <div className="flex-1 flex flex-col items-center pt-12 pb-12 px-8 relative z-30 animate-fade-in">
             
             {/* Info */}
             <div className="flex flex-col items-center w-full mb-12">
                <div className="w-24 h-24 mb-6 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                   <Icons.Avatar />
                </div>
                <h1 className="text-white text-3xl font-normal mb-2">Potential Spam</h1>
                <p className="text-white/80 text-xl font-normal tracking-wide">
                  {isOnHold ? 'On Hold' : formatDuration(duration)}
                </p>
             </div>

             {/* Controls Grid */}
             <div className="w-full grid grid-cols-3 gap-y-8 gap-x-4 mb-auto animate-slide-up">
                {[
                  { icon: Icons.Mute, label: 'mute', active: isMuted, onClick: () => setIsMuted(!isMuted) },
                  { icon: Icons.Keypad, label: 'keypad', active: false },
                  { icon: Icons.Speaker, label: 'audio', active: isSpeaker, onClick: () => setIsSpeaker(!isSpeaker) },
                  { icon: Icons.AddCall, label: 'add call', active: false },
                  { icon: Icons.Avatar, label: 'FaceTime', active: false }, // Placeholder icon
                  { icon: Icons.Contacts, label: 'contacts', active: false },
                ].map((btn, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <button 
                      onClick={btn.onClick}
                      className={`w-[75px] h-[75px] rounded-full flex items-center justify-center transition-all duration-200
                        ${btn.active ? 'bg-white text-black' : 'bg-[#ffffff1a] backdrop-blur-md text-white hover:bg-[#ffffff33]'}`}
                    >
                      <div className="scale-90">{<btn.icon />}</div>
                    </button>
                    <span className="text-[13px] font-medium tracking-wide capitalize">{btn.label}</span>
                  </div>
                ))}
             </div>

             {/* End Call */}
             <div className="mt-8 animate-slide-up">
               <button 
                  onClick={handleEndCall}
                  className="w-[75px] h-[75px] rounded-full bg-[#ff3b30] flex items-center justify-center shadow-lg active:opacity-80 transition-opacity"
                >
                  <div className="transform rotate-[135deg]">
                    <Icons.Phone />
                  </div>
               </button>
             </div>
          </div>
        )}

        {/* ================= ENDED VIEW ================= */}
        {view === 'ended' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-30 animate-fade-in">
             <div className="w-24 h-24 mb-6 rounded-full bg-gray-800 flex items-center justify-center opacity-50 grayscale">
                <Icons.Avatar />
             </div>
             
             <h1 className="text-white text-3xl font-normal mb-2">Potential Spam</h1>
             <p className="text-gray-400 text-lg mb-10">Call Ended</p>

             <div className="flex flex-col gap-4 w-full px-8 animate-slide-up">
                <button 
                  onClick={handleReset}
                  className="w-full py-4 rounded-xl bg-[#1c1c1e] text-[#34c759] font-medium text-lg active:bg-[#2c2c2e] transition-colors"
                >
                  Call Again
                </button>
                <button 
                  onClick={handleReset}
                  className="w-full py-4 rounded-xl bg-[#1c1c1e] text-[#0a84ff] font-medium text-lg active:bg-[#2c2c2e] transition-colors"
                >
                  Close
                </button>
             </div>
          </div>
        )}

        {/* Home Indicator */}
        <div className="w-full flex justify-center pb-2 pt-4">
           <div className="w-[130px] h-[5px] bg-white rounded-full"></div>
        </div>

      </div>
    </div>
  );
}