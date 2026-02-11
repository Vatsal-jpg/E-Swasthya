// frontend/src/pages/doctor/DoctorVideoCall.tsx
import { Video, Mic, MicOff, VideoOff, Phone, FileText, Edit, User, Heart, Thermometer, Activity, X, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTwilioVideo } from '@/hooks/useTwilioVideo';
import Room from '@/components/video/Room';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import axios from 'axios';

const DoctorVideoCall = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [message, setMessage] = useState('');
  const [callTime, setCallTime] = useState(0);
  
  const [diagnosis, setDiagnosis] = useState("");
const [severity, setSeverity] = useState("mild");
const [medicines, setMedicines] = useState([
  { name: "", dosage: "", frequency: "", duration: "" }
]);
const [advice, setAdvice] = useState("");

// const [prescription, setPrescription] = useState('');

  // Use appointment ID as room name (same as patient uses)
  const roomName = `consultation-${id || 'default'}`;
  const identity = `doctor-${Date.now()}`;

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
      console.log('Patient joined:', participant.identity);
    },
    onParticipantDisconnected: (participant) => {
      console.log('Patient left:', participant.identity);
    }
  });

  const mockMessages = [
    { id: 1, sender: 'doctor', text: 'Hello! How are you feeling today?', time: '10:01 AM' },
    { id: 2, sender: 'patient', text: 'I have been experiencing headaches for the past 2 days.', time: '10:02 AM' },
  ];

  useEffect(() => {
  const connect = async () => {
    try {
      await connectToRoom();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  connect();

  // FIX: Clean up properly
  return () => {
    disconnectFromRoom();
  };
}, []); // Empty dependency array - only run once


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
    navigate('/doctor/dashboard');
  };

  const handleSaveNotes = () => {
    console.log('Saving notes:', notes);
    alert('Notes saved successfully!');
    setShowNotes(false);
  };

 const handleSavePrescription = async () => {
  if (!diagnosis.trim()) {
  alert("Enter diagnosis");
  return;
}

if (!medicines[0].name || !medicines[0].dosage || !medicines[0].duration) {
  alert("Fill all medicine fields");
  return;
}

  try {
    console.log("SENDING APPOINTMENT ID:", id);

    await axios.post("http://localhost:5001/api/prescriptions", {
      patientId: '6972272fc77db5bcede6ad01',   // ✅ correct key
      diagnosis,
      severity,
      medicines,
      advice
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    alert("Prescription saved and sent");
    setShowPrescription(false);
  } catch (err) {
    console.error(err);
    alert("Failed to save prescription");
  }
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Connecting to patient...</p>
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
          <Button onClick={() => navigate('/doctor/dashboard')} className="bg-blue-600 hover:bg-blue-700">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Main Video Area */}
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
                <span className="text-4xl">👤</span>
              </div>
              <p className="text-white text-xl">Waiting for patient to join...</p>
            </div>
          </div>
        )}

        {/* Call Timer */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
          {formatTime(callTime)}
        </div>

        {/* Control Bar */}
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
            onClick={() => setShowNotes(true)}
          >
            <Edit className="h-5 w-5" />
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

      {/* Right Sidebar - Patient Info */}
      <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-display text-xl font-semibold text-gray-900">Patient Information</h3>
          <p className="text-sm text-gray-600 mt-0.5">Real-time vitals and history</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {/* Patient Details */}
          <div className="rounded-lg p-4 border border-gray-200">
            <div className="mb-3">
              <p className="font-semibold text-gray-900">Rajesh Kumar</p>
              <p className="text-sm text-gray-600">Age: 45 • Male</p>
            </div>
            <div className="text-xs text-gray-600">
              Blood Group: O+ • No known allergies
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm">Vital Signs</h4>
            <div className="rounded-lg p-4 space-y-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Blood Pressure</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">130/85 mmHg</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Temperature</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">98.6°F</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Heart Rate</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">72 bpm</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm">Quick Actions</h4>
            <Link to={`/doctor/patient/${id}/history`}>
              <Button className="w-full justify-start shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                View Medical History
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowPrescription(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Write Prescription
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowNotes(true)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Add Notes
            </Button>
          </div>

          {/* Recent History */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm">Recent Visits</h4>
            <div className="space-y-2">
              {[
                { date: 'Jan 15, 2026', reason: 'Routine Checkup' },
                { date: 'Dec 10, 2025', reason: 'Blood Pressure Review' },
              ].map((visit, index) => (
                <div key={index} className="rounded-lg p-3 border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{visit.date}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{visit.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="absolute right-96 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-10">
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
                className={cn('flex', msg.sender === 'doctor' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    msg.sender === 'doctor'
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
              />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotes && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-gray-900">Add Consultation Notes</h3>
                <p className="text-sm text-gray-600 mt-0.5">Document observations and findings</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotes(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <Input placeholder="Diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />

<select value={severity} onChange={e => setSeverity(e.target.value)} className="w-full border p-2 rounded">
  <option value="mild">Mild</option>
  <option value="moderate">Moderate</option>
  <option value="severe">Severe</option>
</select>

<h4 className="font-semibold">Medicines</h4>
{medicines.map((m, i) => (
  <div key={i} className="grid grid-cols-4 gap-2">
    <Input placeholder="Name" value={m.name}
      onChange={e => {
        const arr = [...medicines];
        arr[i].name = e.target.value;
        setMedicines(arr);
      }}
    />
    <Input placeholder="Dosage" value={m.dosage} onChange={e => { const arr=[...medicines]; arr[i].dosage=e.target.value; setMedicines(arr); }} />
    <Input placeholder="Frequency" value={m.frequency} onChange={e => { const arr=[...medicines]; arr[i].frequency=e.target.value; setMedicines(arr); }} />
    <Input placeholder="Duration" value={m.duration} onChange={e => { const arr=[...medicines]; arr[i].duration=e.target.value; setMedicines(arr); }} />
  </div>
))}

<Button onClick={() => setMedicines([...medicines, { name:"", dosage:"", frequency:"", duration:"" }])}>
  + Add Medicine
</Button>

<Textarea placeholder="Advice" value={advice} onChange={e => setAdvice(e.target.value)} />

            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNotes(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSaveNotes}
              >
                <FileText className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      {showPrescription && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
            <Button variant="ghost" className="absolute right-3 top-3" onClick={() => setShowPrescription(false)}>
              <X />
            </Button>

            <h2 className="text-xl font-bold mb-4">Write Prescription</h2>

            <Input placeholder="Diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />

            <select value={severity} onChange={e => setSeverity(e.target.value)} className="w-full border p-2 mt-2 rounded">
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>

            <h3 className="mt-4 font-semibold">Medicines</h3>
            {medicines.map((m, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 mt-2">
                <Input placeholder="Name" value={m.name} onChange={e => {
                  const arr = [...medicines]; arr[i].name = e.target.value; setMedicines(arr);
                }} />
                <Input placeholder="Dosage" value={m.dosage} onChange={e => {
                  const arr = [...medicines]; arr[i].dosage = e.target.value; setMedicines(arr);
                }} />
                <Input placeholder="Frequency" value={m.frequency} onChange={e => {
                  const arr = [...medicines]; arr[i].frequency = e.target.value; setMedicines(arr);
                }} />
                <Input placeholder="Duration" value={m.duration} onChange={e => {
                  const arr = [...medicines]; arr[i].duration = e.target.value; setMedicines(arr);
                }} />
              </div>
            ))}
            <Button className="mt-2" onClick={() => setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "" }])}>
              + Add Medicine
            </Button>

            <Textarea className="mt-3" placeholder="Advice" value={advice} onChange={e => setAdvice(e.target.value)} />

            <Button className="mt-4 w-full" onClick={handleSavePrescription}>
              Save & Send to Patient
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorVideoCall;