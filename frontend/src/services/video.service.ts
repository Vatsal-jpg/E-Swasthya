import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface TokenResponse {
  success: boolean;
  token: string;
  message?: string;
}

export const getVideoToken = async (
  identity: string, 
  roomName: string
): Promise<TokenResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/video/token`, {
      identity,
      room: roomName
    });
    return response.data;
  } catch (error) {
    console.error('Error getting video token:', error);
    throw error;
  }
};

export const validateRoom = async (roomName: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/video/validate/${roomName}`);
    return response.data.valid;
  } catch (error) {
    console.error('Error validating room:', error);
    return false;
  }
};