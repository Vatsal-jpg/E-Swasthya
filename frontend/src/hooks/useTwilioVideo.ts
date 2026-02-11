// frontend/src/hooks/useTwilioVideo.ts
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface UseTwilioVideoProps {
  identity: string;
  roomName: string;
  onParticipantConnected?: (participant: any) => void;
  onParticipantDisconnected?: (participant: any) => void;
}

export const useTwilioVideo = ({
  identity,
  roomName,
  onParticipantConnected,
  onParticipantDisconnected
}: UseTwilioVideoProps) => {
  const [room, setRoom] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localTracks, setLocalTracks] = useState<any[]>([]);

  const getToken = useCallback(async (): Promise<string> => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await axios.post(`${API_BASE_URL}/video/token`, {
        identity,
        room: roomName
      });
      
      if (response.data.success && response.data.token) {
        return response.data.token;
      }
      throw new Error(response.data.message || 'Failed to get token');
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error getting token');
    }
  }, [identity, roomName]);

  const connectToRoom = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Get token
      const token = await getToken();
      
      // Dynamically import twilio-video
      const { connect, createLocalTracks } = await import('twilio-video');
      
      // Create local tracks
      const tracks = await createLocalTracks({
        audio: true,
        video: { width: 640, height: 480 }
      });
      
      setLocalTracks(tracks);

      // Connect to room
      const room = await connect(token, {
        name: roomName,
        tracks: tracks,
      });

      setRoom(room);

      // Set up participant event listeners
      const handleParticipantConnected = (participant: any) => {
        setParticipants(prev => [...prev, participant]);
        onParticipantConnected?.(participant);
      };

      const handleParticipantDisconnected = (participant: any) => {
        setParticipants(prev => prev.filter(p => p.sid !== participant.sid));
        onParticipantDisconnected?.(participant);
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
  }, [getToken, roomName, onParticipantConnected, onParticipantDisconnected]);

  const disconnectFromRoom = useCallback(() => {
    console.log('Disconnecting from room...');
    
    // Stop all local tracks
    localTracks.forEach(track => {
      console.log(`Stopping ${track.kind} track`);
      track.stop();
    });
    setLocalTracks([]);
    
    if (room) {
      room.disconnect();
      setRoom(null);
      setParticipants([]);
    }
  }, [room, localTracks]);

  const toggleAudio = useCallback(() => {
    localTracks.forEach(track => {
      if (track.kind === 'audio') {
        track.enable(!track.isEnabled);
      }
    });
  }, [localTracks]);

  const toggleVideo = useCallback(() => {
    localTracks.forEach(track => {
      if (track.kind === 'video') {
        track.enable(!track.isEnabled);
      }
    });
  }, [localTracks]);

  // FIX: Add proper dependency array and cleanup
  useEffect(() => {
    return () => {
      if (room) {
        disconnectFromRoom();
      }
    };
  }, [room, disconnectFromRoom]); // Add dependencies

  return {
    room,
    participants,
    isConnecting,
    error,
    connectToRoom,
    disconnectFromRoom,
    toggleAudio,
    toggleVideo,
    localTracks
  };
};