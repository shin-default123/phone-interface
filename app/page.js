'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Icons (Optimized for iOS look) ---
const Icons = {
  // Utility Icons
  Signal: () => <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" /></svg>,
  Wifi: () => <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" /></svg>,
  Battery: () => <svg className="w-[22px] h-[12px]" viewBox="0 0 24 12" fill="currentColor"><path fillOpacity=".3" d="M2 4h20v4H2z"/><path d="M22 4v4h2V4h-2zM2 4v4h18V4H2z" /></svg>, // Simplified
  
  // UI Icons
  Phone: () => <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 018.59 3.98c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1C3 13.93 11.07 22 21 22c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1.12z"/></svg>,
  Mute: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l2.97 2.97c-.85.35-1.76.57-2.71.58v3.34c4.13.51 7.4-2.42 7.89-6.27H19c-.43 2.22-2.03 4.07-4.12 4.67V17c-2.79-.53-5-2.85-5.59-5.59h-1.7c.61 3.95 3.73 7.07 7.7 7.67V21h2v-1.88c.86-.11 1.68-.34 2.45-.66l1.19 1.19L21 18.73 4.27 3z"/></svg>,
  Keypad: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
  Speaker: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
  AddCall: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M19 13h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3zM7 9h2V5H7v4zm0 6h2v-4H7v4zm-2 0H3v-4h2v4zm6 0h2v-4h-2v4zm-6-6H3V5h2v4zm12-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3h2c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2V5c0-1.1-.9-2-2-2z"/></svg>,
  FaceTime: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>,
  Contacts: ({ active }) => <svg className={`w-8 h-8 ${active ? 'fill-black' : 'fill-white'}`} viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  AvatarPlaceholder: () => (
    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  Maximize: () => <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
};

export default function PhoneInterface() {
  const [view, setView] = useState('incoming'); // 'incoming', 'active', 'ended'
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Logic ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (view === 'active' && !isOnHold) {
      timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, isOnHold]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Handlers ---
  const handleAnswer = () => { setDuration(0); setView('active'); };
  const handleEndCall = () => setView('ended');
  const handleReset = () => {
    setIsMuted(false); setIsSpeaker(false); setIsOnHold(false);
    setDuration(0); setView('incoming');
  };

  return (
    // MAIN CONTAINER: 100dvh handles mobile browsers perfectly
    <div className="relative w-full h-dvh overflow-hidden bg-black text-white flex flex-col font-sans select-none">
      
      {/* Background Gradient - iOS Style blurred background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black opacity-80" />
      
      {/* Subtle Grain Overlay (Optional texturing) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* --- STATUS BAR (Simulated) --- */}
      {/* Added pt-safe to respect notches on real devices */}
      <div className="relative z-50 w-full flex justify-between items-center px-6 pt-3 h-[48px]">
        <span className="text-[15px] font-semibold tracking-wide">{time}</span>
        <div className="flex items-center gap-2">
           <Icons.Signal />
           <Icons.Wifi />
           <Icons.Battery />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-md mx-auto h-full pb-8 px-8">
        
        {/* ================= INCOMING ================= */}
        {view === 'incoming' && (
          <div className="flex-1 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="mt-12 flex flex-col items-center">
               <div className="w-28 h-28 rounded-full bg-gray-600/50 backdrop-blur-md flex items-center justify-center mb-6 text-gray-300">
                 <span className="text-4xl">P</span>
               </div>
               <p className="text-gray-300 text-lg font-medium mb-1">Mobile</p>
               <h1 className="text-4xl font-light tracking-tight mb-2 text-center">Potential Spam</h1>
               <p className="text-gray-400 text-lg">Agusan del Sur</p>
            </div>

            {/* Slide to Answer (Bottom) */}
            <div className="mt-auto w-full pb-12">
               <div className="flex justify-between items-center mb-12 px-4">
                  {/* Remind Me / Message buttons usually go here on iOS */}
               </div>

               <div className="flex flex-col gap-6">
                 {/* Decline / Accept Buttons */}
                 <div className="flex justify-between w-full gap-8">
                    <button onClick={handleEndCall} className="flex-1 flex flex-col items-center gap-2 group">
                       <div className="w-[72px] h-[72px] rounded-full bg-red-500/90 backdrop-blur flex items-center justify-center transition-transform active:scale-95">
                         <div className="rotate-[135deg]"><Icons.Phone /></div>
                       </div>
                       <span className="text-sm font-medium">Decline</span>
                    </button>

                    <button onClick={handleAnswer} className="flex-1 flex flex-col items-center gap-2 group">
                       <div className="w-[72px] h-[72px] rounded-full bg-green-500/90 backdrop-blur flex items-center justify-center transition-transform active:scale-95 animate-pulse">
                         <Icons.Phone />
                       </div>
                       <span className="text-sm font-medium">Accept</span>
                    </button>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* ================= ACTIVE ================= */}
        {view === 'active' && (
          <div className="flex-1 flex flex-col items-center animate-in slide-in-from-bottom-10 duration-500">
             
             {/* Caller Details */}
             <div className="mt-8 flex flex-col items-center w-full">
               <div className="flex justify-between items-start w-full">
                  {/* Float Name Left */}
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold tracking-tight leading-tight">Potential Spam</h1>
                    <p className="text-gray-300/80 text-lg tracking-wide mt-1">
                      {isOnHold ? 'Paused' : formatDuration(duration)}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gray-500/30 backdrop-blur flex items-center justify-center">
                    <Icons.AvatarPlaceholder />
                  </div>
               </div>
             </div>

             {/* Controls Grid (iOS 17 Layout) */}
             <div className="mt-auto w-full pb-8">
                <div className="grid grid-cols-3 gap-x-4 gap-y-6 mb-16">
                  {[
                    { icon: Icons.Mute, label: 'mute', active: isMuted, action: () => setIsMuted(!isMuted) },
                    { icon: Icons.Keypad, label: 'keypad', active: false },
                    { icon: Icons.Speaker, label: 'audio', active: isSpeaker, action: () => setIsSpeaker(!isSpeaker) },
                    { icon: Icons.AddCall, label: 'add call', active: false },
                    { icon: Icons.FaceTime, label: 'FaceTime', active: false }, 
                    { icon: Icons.Contacts, label: 'contacts', active: false },
                  ].map((btn, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                       <button 
                         onClick={btn.action}
                         className={`w-[70px] h-[70px] rounded-full flex items-center justify-center backdrop-blur-2xl transition-all duration-200 active:scale-95
                           ${btn.active ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/15 text-white hover:bg-white/20'}
                         `}
                       >
                         <div className="scale-90"><btn.icon active={btn.active} /></div>
                       </button>
                       <span className="text-[12px] font-medium tracking-wide text-white/90 capitalize truncate w-full text-center">
                         {btn.label}
                       </span>
                    </div>
                  ))}
                </div>

                {/* End Call Button */}
                <div className="flex justify-center mb-6">
                  <button 
                    onClick={handleEndCall}
                    className="w-[72px] h-[72px] rounded-full bg-[#ff3b30] flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:bg-[#ff453a]"
                  >
                    <div className="transform rotate-[135deg] scale-110">
                      <Icons.Phone />
                    </div>
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* ================= ENDED ================= */}
        {view === 'ended' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
             <h1 className="text-gray-400 text-2xl font-light mb-8">Call Ended</h1>
             
             <div className="flex flex-col w-full gap-3 px-4 max-w-sm">
                <button onClick={handleReset} className="w-full py-3.5 bg-gray-800/80 backdrop-blur-xl rounded-xl text-green-500 font-semibold text-lg active:bg-gray-700 transition-colors">
                  Call Back
                </button>
                <button onClick={handleReset} className="w-full py-3.5 bg-gray-800/80 backdrop-blur-xl rounded-xl text-blue-500 font-semibold text-lg active:bg-gray-700 transition-colors">
                  Close
                </button>
             </div>
          </div>
        )}
      </div>

      {/* --- Home Bar Indicator (iOS) --- */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>

      {/* --- HIDDEN FULLSCREEN TRIGGER --- 
          Bottom Right Corner. Low opacity. Looks like a tiny detail or invisible until hovered.
      */}
      <button 
        onClick={toggleFullscreen} 
        className="absolute bottom-4 right-4 z-[100] p-2 text-white/10 hover:text-white/50 transition-colors"
        title="Toggle Fullscreen"
      >
        <Icons.Maximize />
      </button>

    </div>
  );
}