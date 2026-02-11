// frontend/src/pages/patient/VideoCall.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, User, X } from 'lucide-react';
import { useTwilioVideo } from '@/hooks/useTwilioVideo';
import Room from '@/components/video/Room';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const VideoCall = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [callTime, setCallTime] = useState(0);

  // Use appointment ID as room name
  const roomName = `consultation-${id || 'default'}`;
  const identity = `patient-${Date.now()}`;

  const {
    room,
    participants,
    isConnecting,
    error,
    connectToRoom,
    disconnectFromRoom,
    toggleAudio,
    toggleVideo
  } = useTwilioVideo({
    identity,
    roomName,
    onParticipantConnected: (participant) => {
      console.log('Doctor joined:', participant.identity);
    },
    onParticipantDisconnected: (participant) => {
      console.log('Doctor left:', participant.identity);
    }
  });

  const mockMessages = [
    { id: 1, sender: 'doctor', text: 'Hello! How are you feeling today?', time: '10:01 AM' },
    { id: 2, sender: 'patient', text: 'I have been experiencing headaches for the past 2 days.', time: '10:02 AM' },
  ];

  // In VideoCall.tsx, update the useEffect similarly
  useEffect(() => {
    const connect = async () => {
      try {
        await connectToRoom();
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    };

    connect();

    return () => {
      disconnectFromRoom();
    };
  }, []); // Empty dependency array

  const handleToggleAudio = () => {
    toggleAudio();
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    toggleVideo();
    setIsVideoOn(!isVideoOn);
  };

  const handleEndCall = () => {
    disconnectFromRoom();
    navigate('/patient/dashboard');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to doctor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Connection Error</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => navigate('/patient/dashboard')} className="bg-blue-600 hover:bg-blue-700">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Dr. Anita Sharma</p>
              <p className="text-sm text-gray-400">General Physician</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              room ? "bg-green-500/20 text-green-400 animate-pulse" : "bg-yellow-500/20 text-yellow-400"
            )}>
              ● {room ? 'Live' : 'Connecting...'}
            </span>
            <span className="text-gray-400 text-sm">{formatTime(callTime)}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          {room ? (
            <Room
              roomName={roomName}
              room={room}
              participants={participants}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👨‍⚕️</span>
                </div>
                <p className="text-white text-xl">Connecting to doctor...</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-4">
            <Button
              variant={isMuted ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={handleToggleAudio}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              variant={!isVideoOn ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={handleToggleVideo}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-14 w-14"
              onClick={handleEndCall}
            >
              <Phone className="h-6 w-6 rotate-135" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="absolute inset-0 z-20 md:static md:w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-white">Chat</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.sender === 'patient' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      msg.sender === 'patient'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-700 text-white rounded-bl-sm'
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      // Send message logic here
                      setMessage('');
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!message.trim()}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;