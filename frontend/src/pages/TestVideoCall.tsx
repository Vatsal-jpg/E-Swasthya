// frontend/src/pages/TestVideoCall.tsx
import { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, User, Camera } from 'lucide-react';

const TestVideoCall = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log('🎥 Requesting camera access...');
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: true
        });
        
        console.log('✅ Camera access granted');
        console.log('📹 Video tracks:', mediaStream.getVideoTracks().length);
        console.log('🎤 Audio tracks:', mediaStream.getAudioTracks().length);
        
        setStream(mediaStream);
        
        // Log track details
        mediaStream.getTracks().forEach((track, i) => {
          console.log(`Track ${i}:`, {
            kind: track.kind,
            id: track.id,
            label: track.label,
            enabled: track.enabled,
            readyState: track.readyState
          });
        });
        
      } catch (err: any) {
        console.error('❌ Camera error:', err);
        setError(`Error: ${err.name} - ${err.message}`);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        console.log('🧹 Cleaning up stream...');
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        console.log(`📹 Video ${videoTrack.enabled ? 'enabled' : 'disabled'}`);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        console.log(`🎤 Audio ${audioTrack.enabled ? 'enabled' : 'disabled'}`);
      }
    }
  };

  const listDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log('📱 Available devices:', devices);
      
      alert(`Found ${devices.length} devices. Check console for details.`);
    } catch (err) {
      console.error('Error listing devices:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Camera & Video Test</h1>
          <p className="text-gray-400">Test your camera and microphone permissions</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <h3 className="text-white font-bold mb-2">Error:</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Preview */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Camera Preview</h2>
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative">
              {stream ? (
                <video
                  autoPlay
                  playsInline
                  muted
                  ref={(video) => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Camera feed will appear here</p>
                  </div>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Camera {isVideoOn ? 'On' : 'Off'}</span>
                  </div>
                </div>
                
                <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Mic {isMuted ? 'Muted' : 'On'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </button>
              
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </button>
              
              <button
                onClick={listDevices}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Status Information</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">Camera Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stream Active:</span>
                    <span className={stream ? 'text-green-400' : 'text-red-400'}>
                      {stream ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Video Tracks:</span>
                    <span className="text-white">
                      {stream?.getVideoTracks().length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audio Tracks:</span>
                    <span className="text-white">
                      {stream?.getAudioTracks().length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Video Enabled:</span>
                    <span className={isVideoOn ? 'text-green-400' : 'text-red-400'}>
                      {isVideoOn ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audio Enabled:</span>
                    <span className={!isMuted ? 'text-green-400' : 'text-red-400'}>
                      {!isMuted ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">Browser Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Browser:</span>
                    <span className="text-white">
                      {navigator.userAgent.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HTTPS:</span>
                    <span className={window.location.protocol === 'https:' ? 'text-green-400' : 'text-yellow-400'}>
                      {window.location.protocol === 'https:' ? 'Yes' : 'No (Localhost OK)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Localhost:</span>
                    <span className={window.location.hostname === 'localhost' ? 'text-green-400' : 'text-yellow-400'}>
                      {window.location.hostname === 'localhost' ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">Next Steps</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Test camera permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Open browser console (F12) for detailed logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Click "List Devices" to see all available cameras/mics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Test Twilio connection after camera works</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => window.open('http://localhost:5001/api/health', '_blank')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Test Backend Health
          </button>
          
          <button
            onClick={() => window.open('http://localhost:5001/api/test', '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Test Backend API
          </button>
          
          <button
            onClick={() => {
              console.clear();
              console.log('🧹 Console cleared');
              alert('Console cleared');
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Clear Console
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestVideoCall;