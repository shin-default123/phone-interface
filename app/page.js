'use client';

import React, { useState, useEffect } from 'react';

// --- Icons (SVG) ---
const Icons = {
  Battery: () => (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="opacity-100">
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor"/>
      <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor"/>
      <path d="M23 4C23.5523 4 24 4.44772 24 5V7C24 7.55228 23.5523 8 23 8V4Z" fill="currentColor"/>
    </svg>
  ),
  Wifi: () => (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.50005 11.6433C9.07344 11.6433 9.54922 11.3934 9.87328 11.0268L15.9392 3.63065C16.1953 3.3184 16.143 2.85502 15.8118 2.60742C13.8188 1.11721 11.2828 0.356445 8.50005 0.356445C5.71732 0.356445 3.18128 1.11721 1.18826 2.60742C0.85707 2.85502 0.804828 3.3184 1.06093 3.63065L7.12682 11.0268C7.45088 11.3934 7.92666 11.6433 8.50005 11.6433Z" />
    </svg>
  ),
  Signal: () => (
    <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
      <rect x="0" y="7" width="3" height="4" rx="1" />
      <rect x="5" y="4.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="2" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="11" rx="1" className="opacity-30"/>
    </svg>
  ),
  Info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" className="opacity-50" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  PhoneFilled: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  // New Active Call Icons
  Mute: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/><line x1="3" y1="3" x2="21" y2="21"/></svg>,
  Keypad: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="19" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="5" r="2"/></svg>,
  Speaker: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  AddCall: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  FaceTime: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Contacts: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
};

export default function CallScreen() {
  // State: 'incoming-locked', 'incoming-unlocked', 'active'
  const [callState, setCallState] = useState('incoming-locked'); 
  const [duration, setDuration] = useState(0);

  // Timer logic for active call
  useEffect(() => {
    let timer;
    if (callState === 'active') {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => setCallState('active');
  const handleEndCall = () => setCallState('incoming-locked');

  return (
    <div className="relative h-screen w-full bg-[#1c1c1e] text-white flex flex-col items-center overflow-hidden font-sans">
      
      {/* Dev Controls (Top Left Overlay) */}
      <div className="absolute top-0 left-0 z-50 p-2 opacity-50 hover:opacity-100 transition-opacity">
        <select 
          value={callState} 
          onChange={(e) => setCallState(e.target.value)}
          className="bg-black/50 text-xs text-white p-1 rounded"
        >
          <option value="incoming-locked">Locked (Slide)</option>
          <option value="incoming-unlocked">Unlocked (Buttons)</option>
          <option value="active">Active Call</option>
        </select>
      </div>

      {/* --- Status Bar --- */}
      <div className="w-full px-6 pt-3 flex justify-between items-center text-sm font-medium z-10">
        <span>9:41</span>
        <div className="flex items-center gap-2">
          <Icons.Signal />
          <Icons.Wifi />
          <Icons.Battery />
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className={`flex-1 flex flex-col items-center w-full transition-all duration-500 ${callState === 'active' ? 'justify-start pt-12' : 'justify-start pt-20'}`}>
        
        {/* Info Icon (Only show on incoming) */}
        {callState !== 'active' && (
          <div className="w-full flex justify-end px-6 mb-2 animate-fade-in">
             <Icons.Info />
          </div>
        )}
        
        <div className="flex flex-col items-center gap-1">
          {/* Label / Timer */}
          {callState === 'active' ? (
             <>
               <h1 className="text-3xl font-semibold tracking-tight mb-1">
                 Potential Spam
               </h1>
               <span className="text-gray-200 text-xl font-normal tracking-wide">
                 {formatTime(duration)}
               </span>
             </>
          ) : (
            <>
              <span className="text-gray-400 text-xl font-medium tracking-wide">
                Potential Spam
              </span>
              <h1 className="text-4xl font-semibold tracking-tight">
                +1 (813) 444-6439
              </h1>
            </>
          )}
        </div>

        {/* --- ACTIVE CALL GRID --- */}
        {callState === 'active' && (
          <div className="w-full px-8 mt-12 grid grid-cols-3 gap-y-8 gap-x-4 place-items-center animate-fade-in-up">
            {[
              { icon: Icons.Mute, label: 'mute' },
              { icon: Icons.Keypad, label: 'keypad' },
              { icon: Icons.Speaker, label: 'audio' },
              { icon: Icons.AddCall, label: 'add call' },
              { icon: Icons.FaceTime, label: 'FaceTime' },
              { icon: Icons.Contacts, label: 'contacts' },
            ].map((btn, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <button className="h-[75px] w-[75px] rounded-full bg-[#ffffff1a] backdrop-blur-md flex items-center justify-center hover:bg-[#ffffff33] transition-colors">
                  <btn.icon />
                </button>
                <span className="text-xs font-medium capitalize">{btn.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Bottom Controls Area --- */}
      <div className="w-full pb-12 px-8 flex flex-col justify-end min-h-[150px]">
        
        {/* Incoming: Message/Voicemail options */}
        {callState !== 'active' && (
           <div className="flex justify-between items-center px-4 mb-16 opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span className="text-xs font-medium">Message</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5.5" cy="11.5" r="4.5" /><circle cx="18.5" cy="11.5" r="4.5" /><path d="M5.5 15h13" strokeWidth="1" /></svg>
              <span className="text-xs font-medium">Voicemail</span>
            </div>
          </div>
        )}

        {/* --- Action Buttons --- */}
        <div className="w-full">
          {callState === 'incoming-locked' ? (
            /* Locked: Slide to Answer */
            <div 
              className="relative w-full h-[80px] flex items-center cursor-pointer group"
              onClick={handleAnswer}
            >
              <div className="absolute w-full text-center text-white/50 text-xl font-normal animate-pulse group-hover:text-white transition-colors">
                 slide to answer
              </div>
              <div className="absolute left-1 z-10 h-[72px] w-[72px] bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:translate-x-2">
                <div className="text-green-500 animate-pulse">
                  <Icons.PhoneFilled />
                </div>
              </div>
              <div className="w-full h-[80px] rounded-full bg-white/20 backdrop-blur-sm border border-white/10" />
            </div>
          ) : callState === 'incoming-unlocked' ? (
            /* Unlocked: Two Buttons */
            <div className="flex justify-between items-center px-8">
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={handleEndCall}
                  className="h-[75px] w-[75px] bg-[#EB4E3D] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                   <div className="text-white rotate-[135deg]"><Icons.PhoneFilled /></div>
                </button>
                <span className="text-sm font-medium">Decline</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={handleAnswer}
                  className="h-[75px] w-[75px] bg-[#30D158] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                  <div className="text-white"><Icons.PhoneFilled /></div>
                </button>
                <span className="text-sm font-medium">Accept</span>
              </div>
            </div>
          ) : (
            /* Active Call: End Button */
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={handleEndCall}
                  className="h-[75px] w-[75px] bg-[#EB4E3D] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                   <div className="text-white rotate-[135deg]"><Icons.PhoneFilled /></div>
                </button>
                <span className="text-sm font-medium">End Call</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}