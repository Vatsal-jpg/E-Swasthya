import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const videoToken = (identity, room) => {
  // Create video grant
  let videoGrant;
  if (room) {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }

  // Create access token with identity in constructor options
  const token = new AccessToken(
    process.env.TWILIO_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity: identity }
  );

  token.addGrant(videoGrant);

  return token.toJwt();
};

export const getVideoToken = async (req, res) => {
  try {
    const { identity, room } = req.body;

    if (!identity || !room) {
      return res.status(400).json({
        success: false,
        message: 'Identity and room are required'
      });
    }

    const token = videoToken(identity, room);

    res.status(200).json({
      success: true,
      token: token
    });
  } catch (error) {
    console.error('Error generating video token:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating video token'
    });
  }
};

export const validateRoom = async (req, res) => {
  try {
    const { room } = req.params;
    // In a real app, you would check if the room exists and user has access
    // For now, we'll just return success if room name follows pattern
    if (room && room.startsWith('consultation-')) {
      return res.status(200).json({
        success: true,
        valid: true
      });
    }

    res.status(200).json({
      success: true,
      valid: false
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating room'
    });
  }
};