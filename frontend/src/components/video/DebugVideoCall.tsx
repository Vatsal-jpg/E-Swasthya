// frontend/src/components/video/DebugVideoCall.tsx
import { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, User, Camera } from 'lucide-react';

const DebugVideoCall = ({ isDoctor = false }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initCamera = async () => {
      try {
        console.log('Requesting camera access...');
        
        // Request camera and microphone access
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: isDoctor ? 'user' : 'user' // 'user' for front camera
          },
          audio: true
        });

        console.log('Camera access granted, tracks:', mediaStream.getTracks());
        
        setStream(mediaStream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
          console.log('Video element srcObject set');
        }
      } catch (err: any) {
        console.error('Error accessing camera:', err);
        setError(`Camera Error: ${err.message}`);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        console.log('Cleaning up stream');
        stream.getTracks().forEach(track => {
          console.log('Stopping track:', track.kind);
          track.stop();
        });
      }
    };
  }, [isDoctor]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        console.log('Video track enabled:', videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        console.log('Audio track enabled:', audioTrack.enabled);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl mb-4">Video Call Debug</h1>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded mb-4">
          <p className="text-white font-bold">Error:</p>
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Video */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white mb-2">Your Camera</h2>
          <div className="relative h-64 md:h-96 bg-black rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              You ({isDoctor ? 'Doctor' : 'Patient'})
            </div>
          </div>
          
          <div className="mt-4 text-white text-sm space-y-2">
            <p>Stream: {stream ? 'Active' : 'Inactive'}</p>
            <p>Video Tracks: {stream?.getVideoTracks().length || 0}</p>
            <p>Audio Tracks: {stream?.getAudioTracks().length || 0}</p>
            {stream?.getVideoTracks()[0] && (
              <p>Video Status: {stream.getVideoTracks()[0].readyState} | Enabled: {stream.getVideoTracks()[0].enabled.toString()}</p>
            )}
          </div>
        </div>

        {/* Remote Video (Placeholder) */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-white mb-2">Remote Camera</h2>
          <div className="h-64 md:h-96 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <User className="h-16 w-16 text-gray-500" />
              </div>
              <p className="text-gray-400">Other participant will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-gray-800/90 backdrop-blur-md rounded-full px-6 py-4">
        <button
          onClick={toggleAudio}
          className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        
        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
          title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>
        
        <button
          onClick={() => {
            if (stream) {
              stream.getTracks().forEach(track => {
                console.log('Stopping track:', track.kind, track.label);
                track.stop();
              });
              setStream(null);
            }
          }}
          className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          title="End call"
        >
          <Phone className="h-5 w-5 rotate-135" />
        </button>
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2">Debug Information:</h3>
        <div className="text-gray-300 text-sm space-y-1">
          <p>Browser: {navigator.userAgent}</p>
          <p>HTTPS: {window.location.protocol === 'https:' ? 'Yes' : 'No (camera requires HTTPS)'}</p>
          <p>Localhost: {window.location.hostname === 'localhost' ? 'Yes' : 'No'}</p>
          <button 
            onClick={() => navigator.mediaDevices.enumerateDevices().then(devices => {
              console.log('Available devices:', devices);
              alert('Check console for devices');
            })}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            List Available Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugVideoCall;