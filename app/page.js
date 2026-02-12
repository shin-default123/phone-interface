'use client';

import { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import StatusBar from './components/StatusBar';
import IncomingCall from './components/IncomingCall';
import ActiveCall from './components/ActiveCall';
import EndedCall from './components/EndedCall';

export default function Home() {
  const [callStatus, setCallStatus] = useState('incoming');

  const callerInfo = {
    location: 'Morrisville, PA',
    number: '+1 (215) 666-2124',
  };

  return (
    <PhoneFrame>
      <StatusBar />

      {callStatus === 'incoming' && (
        <IncomingCall
          callerInfo={callerInfo}
          onAnswer={() => setCallStatus('active')}
          onDecline={() => setCallStatus('ended')}
        />
      )}

      {callStatus === 'active' && (
        <ActiveCall
          callerInfo={callerInfo}
          onEndCall={() => setCallStatus('ended')}
        />
      )}

      {callStatus === 'ended' && (
        <EndedCall
          callerInfo={callerInfo}
          onCallBack={() => setCallStatus('incoming')}
        />
      )}
    </PhoneFrame>
  );
}