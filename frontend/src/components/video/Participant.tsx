// frontend/src/components/video/Participant.tsx
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParticipantProps {
  participant: any;
  isLocal?: boolean;
  className?: string;
}

const Participant: React.FC<ParticipantProps> = ({ 
  participant, 
  isLocal = false,
  className 
}) => {
  const [videoTracks, setVideoTracks] = useState<any[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!participant) return;

    const trackSubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTracks(prev => [...prev, track]);
      } else if (track.kind === 'audio') {
        setAudioTracks(prev => [...prev, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTracks(prev => prev.filter(t => t !== track));
      } else if (track.kind === 'audio') {
        setAudioTracks(prev => prev.filter(t => t !== track));
      }
    };

    // Subscribe to existing tracks
    participant.tracks.forEach((publication: any) => {
      if (publication.track) {
        trackSubscribed(publication.track);
      }
      publication.on('subscribed', trackSubscribed);
      publication.on('unsubscribed', trackUnsubscribed);
    });

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      participant.removeAllListeners();
      setVideoTracks([]);
      setAudioTracks([]);
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className={cn('relative rounded-lg overflow-hidden bg-gray-900', className)}>
      {videoTracks.length > 0 ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          style={isLocal ? { transform: 'scaleX(-1)' } : {}}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-gray-400">
                {isLocal ? '👤' : '👨‍⚕️'}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {isLocal ? 'Your camera is off' : 'Camera is off'}
            </p>
          </div>
        </div>
      )}
      
      <audio ref={audioRef} autoPlay muted={isLocal} />
      
      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        {isLocal ? 'You' : participant.identity}
      </div>
    </div>
  );
};

export default Participant;