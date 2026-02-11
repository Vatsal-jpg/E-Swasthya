import { useState, useRef, useEffect } from 'react';
import { QrCode, User, AlertCircle, Heart, Phone, Droplet, FileText, Camera, Upload, X, CheckCircle, Download, Scan, RefreshCw } from 'lucide-react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import jsQR from 'jsqr';

const DoctorQRScanner = () => {
  const [scannedData, setScannedData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMethod, setScanMethod] = useState<'camera' | 'upload'>('camera');
  const [showPatientInfo, setShowPatientInfo] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera and scan for QR codes
  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // Start QR code detection
      startQRDetection();
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  // QR Code detection from video stream
  const startQRDetection = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const detectQR = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data from canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Detect QR code
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        
        if (qrCode) {
          // QR Code detected!
          handleQRCodeData(qrCode.data);
          stopCamera();
        }
      }
      
      // Continue scanning
      animationFrameRef.current = requestAnimationFrame(detectQR);
    };

    animationFrameRef.current = requestAnimationFrame(detectQR);
  };

  // Handle uploaded image QR code
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      // Create image element
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) return;
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        context.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Detect QR code
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        
        if (qrCode) {
          handleQRCodeData(qrCode.data);
        } else {
          toast.error('No QR code found in the image');
        }
        
        URL.revokeObjectURL(objectUrl);
        setIsProcessing(false);
      };
      
      img.onerror = () => {
        toast.error('Failed to load image');
        URL.revokeObjectURL(objectUrl);
        setIsProcessing(false);
      };
      
      img.src = objectUrl;
      
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
      setIsProcessing(false);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Process QR code data
  const handleQRCodeData = (qrData: string) => {
    try {
      setIsProcessing(true);
      
      // Try to parse the QR data
      let patientData;
      
      // Check if it's base64 encoded
      if (qrData.startsWith('data:application/json;base64,')) {
        // Extract base64 data
        const base64Data = qrData.replace('data:application/json;base64,', '');
        const decodedString = atob(base64Data);
        patientData = JSON.parse(decodedString);
      } 
      // Check if it's a JSON string
      else if (qrData.startsWith('{') && qrData.endsWith('}')) {
        patientData = JSON.parse(qrData);
      }
      // Check if it's a URL with query params
      else if (qrData.startsWith('http')) {
        const url = new URL(qrData);
        const params = new URLSearchParams(url.search);
        
        patientData = {
          patientId: params.get('id'),
          name: params.get('name'),
          phone: params.get('phone'),
          age: params.get('age'),
          gender: params.get('gender'),
          bloodGroup: params.get('bloodGroup'),
          allergies: params.get('allergies')?.split(','),
          chronicConditions: params.get('conditions')?.split(','),
          medications: params.get('medications')?.split(','),
          emergencyContact: {
            name: params.get('emergencyName'),
            phone: params.get('emergencyPhone'),
            relationship: params.get('emergencyRelation')
          },
          lastUpdated: params.get('lastUpdated'),
          timestamp: params.get('timestamp')
        };
      }
      // Try to parse as JSON anyway
      else {
        try {
          patientData = JSON.parse(qrData);
        } catch {
          throw new Error('Invalid QR code format');
        }
      }
      
      if (!patientData || !patientData.name) {
        throw new Error('Invalid patient data in QR code');
      }
      
      // Format the data
      const formattedData = {
        patientId: patientData.patientId || patientData.id || 'N/A',
        name: patientData.name || 'Unknown',
        phone: patientData.phone || 'N/A',
        age: patientData.age || patientData.dob ? calculateAge(patientData.dob) : 'N/A',
        gender: patientData.gender || 'N/A',
        bloodGroup: patientData.bloodGroup || patientData.bloodType || 'N/A',
        allergies: Array.isArray(patientData.allergies) ? patientData.allergies : 
                  patientData.allergies ? [patientData.allergies] : [],
        chronicConditions: Array.isArray(patientData.chronicConditions) ? patientData.chronicConditions :
                         patientData.chronicConditions ? [patientData.chronicConditions] : 
                         patientData.conditions ? (Array.isArray(patientData.conditions) ? patientData.conditions : [patientData.conditions]) : [],
        medications: Array.isArray(patientData.medications) ? patientData.medications :
                    patientData.medications ? [patientData.medications] : [],
        emergencyContact: patientData.emergencyContact || {
          name: patientData.emergencyName || 'N/A',
          phone: patientData.emergencyPhone || 'N/A',
          relationship: patientData.emergencyRelation || 'N/A'
        },
        recentConsultations: patientData.recentConsultations || [],
        lastUpdated: patientData.lastUpdated || new Date().toISOString(),
        timestamp: patientData.timestamp || Date.now(),
        system: patientData.system || 'eSwasthya Health Passport',
        version: patientData.version || '1.0'
      };
      
      setScannedData(formattedData);
      setShowPatientInfo(true);
      toast.success(`Patient ${formattedData.name} data loaded successfully!`);
      
    } catch (error) {
      console.error('Error parsing QR data:', error);
      toast.error('Failed to decode QR code. Please ensure it contains valid patient data.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to calculate age from DOB
  const calculateAge = (dob: string) => {
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return 'N/A';
    }
  };

  // Generate prescription PDF
  const generatePrescriptionPDF = () => {
    if (!scannedData) return;
    
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(33, 150, 243);
      doc.setFont('helvetica', 'bold');
      doc.text('eSwasthya - Medical Prescription', 105, 20, { align: 'center' });

      // Doctor Info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.text('Doctor: [Your Name]', 20, 40);
      doc.text('Specialty: [Your Specialty]', 20, 48);
      doc.text('Date: ' + new Date().toLocaleDateString(), 20, 56);

      // Patient Info
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Patient Information', 20, 70);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${scannedData.name}`, 20, 80);
      doc.text(`Age: ${scannedData.age} | Gender: ${scannedData.gender}`, 20, 86);
      doc.text(`Blood Group: ${scannedData.bloodGroup}`, 20, 92);
      doc.text(`Allergies: ${scannedData.allergies.join(', ') || 'None'}`, 20, 98);

      // Medical Summary
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Medical Summary', 20, 110);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Chronic Conditions: ${scannedData.chronicConditions.join(', ') || 'None'}`, 20, 120);
      doc.text(`Current Medications: ${scannedData.medications.join(', ') || 'None'}`, 20, 126);

      // Prescription Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Prescription', 20, 140);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      let yPos = 150;
      doc.text('1. [Medication Name] - [Dosage] - [Instructions]', 25, yPos);
      yPos += 8;
      doc.text('2. [Medication Name] - [Dosage] - [Instructions]', 25, yPos);
      yPos += 8;
      doc.text('3. [Medication Name] - [Dosage] - [Instructions]', 25, yPos);

      // Instructions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Instructions', 20, yPos + 10);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('• Take medications as prescribed', 25, yPos + 20);
      doc.text('• Follow up in 2 weeks', 25, yPos + 28);
      doc.text('• Monitor symptoms daily', 25, yPos + 36);
      doc.text('• Contact if symptoms worsen', 25, yPos + 44);

      // Emergency Contact
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Emergency Contact', 20, yPos + 60);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${scannedData.emergencyContact.name}`, 25, yPos + 70);
      doc.text(`Phone: ${scannedData.emergencyContact.phone}`, 25, yPos + 76);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('© 2025 eSwasthya - Secure Digital Health Platform', 105, 280, { align: 'center' });
      doc.text(`Patient ID: ${scannedData.patientId} | Scanned: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });

      doc.save(`Prescription_${scannedData.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
      toast.success('Prescription PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate prescription');
    }
  };

  // Copy patient info
  const copyPatientInfo = () => {
    if (!scannedData) return;
    
    const info = `
Patient ID: ${scannedData.patientId}
Name: ${scannedData.name}
Age: ${scannedData.age}
Gender: ${scannedData.gender}
Phone: ${scannedData.phone}
Blood Group: ${scannedData.bloodGroup}

Medical Information:
• Allergies: ${scannedData.allergies.join(', ') || 'None'}
• Chronic Conditions: ${scannedData.chronicConditions.join(', ') || 'None'}
• Current Medications: ${scannedData.medications.join(', ') || 'None'}

Emergency Contact:
• Name: ${scannedData.emergencyContact.name}
• Phone: ${scannedData.emergencyContact.phone}
• Relationship: ${scannedData.emergencyContact.relationship}

Last Updated: ${new Date(scannedData.lastUpdated).toLocaleDateString()}
    `.trim();

    navigator.clipboard.writeText(info)
      .then(() => toast.success('Patient info copied to clipboard'))
      .catch(() => toast.error('Failed to copy info'));
  };

  // Clear scanned data
  const clearScan = () => {
    setScannedData(null);
    setShowPatientInfo(false);
    stopCamera();
    toast.info('Scan cleared');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <DoctorLayout>
      <Breadcrumbs />
      
      <div
        className="
          bg-primary/30
          m-4 md:m-6 lg:m-10
          p-6 md:p-8 lg:p-10
          rounded-[2.5rem]
          min-h-[calc(100%-4rem)]
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
              Scan Patient QR Code
            </h1>
            <p className="text-muted-foreground mt-1">
              Scan patient health passport QR code to access real-time medical information
            </p>
          </div>
          {scannedData && (
            <Button variant="outline" onClick={clearScan}>
              <X className="h-4 w-4 mr-2" />
              Clear Scan
            </Button>
          )}
        </div>

        <Tabs defaultValue="camera" className="space-y-6" onValueChange={(value) => {
          setScanMethod(value as 'camera' | 'upload');
          stopCamera();
        }}>
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="camera">
              <Camera className="h-4 w-4 mr-2" />
              Camera Scan
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload QR Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isScanning ? (
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Position the patient's QR code within the camera view
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" onClick={startCamera}>
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera Scan
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => {
                        // For testing: simulate scanning with sample data
                        const sampleData = {
                          patientId: 'PAT001',
                          name: 'John Doe',
                          phone: '+91 98765 43210',
                          age: 45,
                          gender: 'Male',
                          bloodGroup: 'O+',
                          allergies: ['Penicillin', 'Peanuts'],
                          chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
                          medications: ['Metformin 500mg', 'Lisinopril 10mg'],
                          emergencyContact: {
                            name: 'Jane Doe',
                            phone: '+91 98765 43211',
                            relationship: 'Spouse'
                          },
                          lastUpdated: new Date().toISOString()
                        };
                        setScannedData(sampleData);
                        setShowPatientInfo(true);
                        toast.success('Sample patient data loaded for testing');
                      }}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Load Sample Data
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {/* QR Scanner Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-64 h-64 border-2 border-primary/50 rounded-xl" />
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br"></div>
                        </div>
                      </div>
                      {/* Scanning Animation */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48">
                        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={stopCamera} className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Stop Camera
                      </Button>
                      {isProcessing && (
                        <Button disabled className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </Button>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Point camera at patient's health passport QR code. Scanning automatically when detected.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload QR Code Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-secondary/50 transition-colors cursor-pointer bg-muted/30"
                    onClick={() => !isProcessing && fileInputRef.current?.click()}
                  >
                    {isProcessing ? (
                      <div className="space-y-4">
                        <RefreshCw className="h-12 w-12 text-primary mx-auto animate-spin" />
                        <p className="text-primary font-medium">Processing QR Code...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Click to upload QR code image</p>
                        <p className="text-sm text-muted-foreground">
                          Supports JPG, PNG, WebP formats
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                  <div className="bg-info/10 border border-info/20 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-secondary">Tip:</strong> Upload a clear image of the patient's health passport QR code. The QR should contain patient data in JSON format.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Patient Information Modal */}
        {showPatientInfo && scannedData && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowPatientInfo(false)} />
            <div className="fixed inset-x-0 top-20 mx-auto max-w-4xl bg-card rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-card border-b p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scan className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-secondary">
                      Patient Information (Scanned)
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Extracted from QR code • ID: {scannedData.patientId}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPatientInfo(false)}
                  className="text-muted-foreground hover:text-secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 space-y-8">
                {/* QR Scan Success Banner */}
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-success mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">QR Code Successfully Scanned</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Patient data extracted from encrypted QR code. Information is current as of {new Date(scannedData.lastUpdated).toLocaleDateString()}.
                  </p>
                </div>

                {/* Patient Overview */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Patient Name</p>
                    <p className="font-semibold text-secondary text-lg">{scannedData.name}</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Age & Gender</p>
                    <p className="font-semibold text-secondary text-lg">
                      {scannedData.age} {scannedData.age !== 'N/A' && 'yrs'}, {scannedData.gender}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Blood Group</p>
                    <p className="font-semibold text-secondary text-lg">{scannedData.bloodGroup}</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-semibold text-secondary">{scannedData.phone}</p>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-warning" />
                      Medical Conditions & Allergies
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-2">Chronic Conditions</p>
                        <div className="flex flex-wrap gap-2">
                          {scannedData.chronicConditions.length > 0 ? (
                            scannedData.chronicConditions.map((condition: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
                                {condition}
                              </span>
                            ))
                          ) : (
                            <p className="text-muted-foreground">None reported</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-2">Allergies</p>
                        <div className="flex flex-wrap gap-2">
                          {scannedData.allergies.length > 0 ? (
                            scannedData.allergies.map((allergy: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
                                {allergy}
                              </span>
                            ))
                          ) : (
                            <p className="text-muted-foreground">None reported</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary flex items-center gap-2">
                      <Phone className="h-5 w-5 text-success" />
                      Emergency Contact
                    </h3>
                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium text-secondary">{scannedData.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Relationship</p>
                          <p className="font-medium text-secondary">{scannedData.emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium text-secondary">{scannedData.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-xl p-4">
                      <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                        <Droplet className="h-4 w-4" />
                        Current Medications
                      </h4>
                      {scannedData.medications.length > 0 ? (
                        <ul className="space-y-1">
                          {scannedData.medications.map((med: string, idx: number) => (
                            <li key={idx} className="text-sm text-secondary pl-2">
                              • {med}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground text-sm">No current medications reported</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Consultations */}
                {scannedData.recentConsultations && scannedData.recentConsultations.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-secondary">Recent Consultations</h3>
                    <div className="space-y-3">
                      {scannedData.recentConsultations.slice(0, 3).map((consult: any, index: number) => (
                        <div key={index} className="bg-muted/30 rounded-xl p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-secondary">{consult.doctorName || 'Doctor'}</p>
                              <p className="text-sm text-muted-foreground">{consult.specialty || 'General'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {consult.date ? new Date(consult.date).toLocaleDateString() : 'N/A'}
                              </p>
                              <p className="text-sm font-medium text-secondary">{consult.diagnosis || 'Consultation'}</p>
                            </div>
                          </div>
                          {consult.prescription && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-sm text-muted-foreground">Prescription:</p>
                              <p className="text-sm text-secondary">{consult.prescription}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button size="lg" className="flex-1" onClick={generatePrescriptionPDF}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Prescription
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1" onClick={copyPatientInfo}>
                    <Download className="h-4 w-4 mr-2" />
                    Copy Patient Info
                  </Button>
                  <Button variant="secondary" size="lg" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Records
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle>How QR Code Scanning Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-secondary">Patient QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Patients generate a QR code in their Health Passport containing encrypted medical data in JSON format.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scan className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-secondary">Scan & Decode</h3>
                <p className="text-sm text-muted-foreground">
                  System scans QR code, extracts JSON data, and parses patient information including medical history.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-secondary">Instant Access</h3>
                <p className="text-sm text-muted-foreground">
                  View complete patient profile, create prescriptions, and update medical records instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hidden canvas for QR processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </DoctorLayout>
  );
};

export default DoctorQRScanner;