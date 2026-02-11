// frontend/src/components/video/Room.tsx
import React from 'react';
import Participant from './Participant';

interface RoomProps {
  roomName: string;
  room: any;
  participants: any[];
  onDisconnect?: () => void;
}

const Room: React.FC<RoomProps> = ({ roomName, room, participants }) => {
  const localParticipant = room?.localParticipant;
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Local participant */}
        {localParticipant && (
          <div className="h-64 lg:h-full">
            <div className="h-full">
              <Participant
                key={localParticipant.sid}
                participant={localParticipant}
                isLocal={true}
                className="h-full"
              />
            </div>
          </div>
        )}
        
        {/* Remote participants */}
        {participants.map((participant) => (
          <div key={participant.sid} className="h-64 lg:h-full">
            <Participant
              participant={participant}
              isLocal={false}
              className="h-full"
            />
          </div>
        ))}
        
        {/* Empty state */}
        {participants.length === 0 && (
          <div className="col-span-2 h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <p className="text-gray-400">Waiting for other participant to join...</p>
              <p className="text-gray-500 text-sm mt-2">Share room ID: {roomName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;