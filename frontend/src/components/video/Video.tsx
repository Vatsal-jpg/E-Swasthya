// frontend/src/hooks/useSimpleVideo.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface UseSimpleVideoProps {
  identity: string;
  roomName: string;
}

export const useSimpleVideo = ({ identity, roomName }: UseSimpleVideoProps) => {
  const [room, setRoom] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<any>(null);

  const getToken = useCallback(async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await axios.post(`${API_BASE_URL}/video/token`, {
        identity,
        room: roomName
      });
      
      if (response.data.success) {
        return response.data.token;
      }
      throw new Error('Failed to get token');
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error getting token');
    }
  }, [identity, roomName]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const token = await getToken();
      
      // Dynamically import twilio-video
      const { connect: connectToRoom, createLocalVideoTrack } = await import('twilio-video');
      
      // Create local video track
      const videoTrack = await createLocalVideoTrack();
      setLocalVideoTrack(videoTrack);
      
      // Connect to room
      const room = await connectToRoom(token, {
        name: roomName,
        tracks: [videoTrack],
      });

      setRoom(room);
      
      // Handle participants
      const handleParticipantConnected = (participant: any) => {
        setParticipants(prev => [...prev, participant]);
      };

      const handleParticipantDisconnected = (participant: any) => {
        setParticipants(prev => prev.filter(p => p.sid !== participant.sid));
      };

      room.on('participantConnected', handleParticipantConnected);
      room.on('participantDisconnected', handleParticipantDisconnected);

      // Add existing participants
      room.participants.forEach(handleParticipantConnected);

      setIsConnecting(false);
      return room;

    } catch (err: any) {
      setError(err.message);
      setIsConnecting(false);
      throw err;
    }
  }, [getToken, roomName]);

  const disconnect = useCallback(() => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setParticipants([]);
    }
    
    if (localVideoTrack) {
      localVideoTrack.stop();
      setLocalVideoTrack(null);
    }
  }, [room, localVideoTrack]);

  const toggleVideo = useCallback(() => {
    if (localVideoTrack) {
      localVideoTrack.enable(!localVideoTrack.isEnabled);
    }
  }, [localVideoTrack]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    room,
    participants,
    isConnecting,
    error,
    connect,
    disconnect,
    toggleVideo,
    localVideoTrack
  };
};