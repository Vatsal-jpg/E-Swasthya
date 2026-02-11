import { Device } from 'twilio-client';

export interface VideoCallOptions {
  identity: string;
  roomName: string;
  token: string;
}

export interface Participant {
  sid: string;
  identity: string;
  videoTracks: Map<string, any>;
  audioTracks: Map<string, any>;
}

export const initializeDevice = async (token: string): Promise<Device> => {
  const { Device } = await import('twilio-client');
  const device = new Device();
  
  await new Promise((resolve, reject) => {
    device.setup(token, {
      codecPreferences: ['opus', 'pcmu'],
      fakeLocalDTMF: true,
      enableRingingState: true,
    });
    
    device.on('ready', resolve);
    device.on('error', reject);
  });
  
  return device;
};