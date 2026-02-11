import { useEffect, useRef, useState } from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPatient } from '@/data/mockData';
import QRCode from 'qrcode';
import { toast } from 'sonner';

const HealthPassportQR = () => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const patientData = {
        id: mockPatient.id,
        name: mockPatient.name,
        age: mockPatient.age,
        gender: mockPatient.gender,
        bloodGroup: mockPatient.bloodGroup,
        allergies: mockPatient.allergies,
        chronicConditions: mockPatient.chronicConditions,
        medications: mockPatient.medications,
        emergencyContact: mockPatient.emergencyContact,
        updatedAt: new Date().toISOString(),
      };

      const qr = await QRCode.toDataURL(JSON.stringify(patientData), {
        width: 220,
        margin: 2,
      });

      setQrDataUrl(qr);

      if (qrCanvasRef.current) {
        await QRCode.toCanvas(qrCanvasRef.current, JSON.stringify(patientData));
      }
    } catch {
      toast.error('QR generation failed');
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card border p-6 text-center space-y-4">
      <h2 className="font-semibold text-secondary">QR Health Passport</h2>

      {qrDataUrl && (
        <img src={qrDataUrl} alt="QR Code" className="mx-auto w-40 h-40" />
      )}

      <p className="text-sm text-muted-foreground">
        Show this QR during emergencies
      </p>

      <div className="flex gap-3">
        <Button className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <canvas ref={qrCanvasRef} className="hidden" />
    </div>
  );
};

export default HealthPassportQR;
