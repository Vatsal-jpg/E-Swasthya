import { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Download,
  Share2,
  Droplet,
  AlertCircle,
  Heart,
  Phone,
  User,
  Copy
} from 'lucide-react';
import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { mockPatient } from '@/data/mockData';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

const HealthPassport = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showFullInfo, setShowFullInfo] = useState<boolean>(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const patientData = {
        patientId: mockPatient.id,
        name: mockPatient.name,
        phone: mockPatient.phone,
        age: mockPatient.age,
        gender: mockPatient.gender,
        bloodGroup: mockPatient.bloodGroup,
        allergies: mockPatient.allergies || [],
        chronicConditions: mockPatient.chronicConditions || [],
        medications: mockPatient.medications || [],
        emergencyContact: mockPatient.emergencyContact,
        recentConsultations: mockPatient.recentConsultations?.slice(0, 3) || [],
        lastUpdated: new Date().toISOString(),
      };

      const qrUrl = await QRCode.toDataURL(JSON.stringify(patientData), {
        width: 256,
        margin: 2,
      });

      setQrDataUrl(qrUrl);

      if (qrCanvasRef.current) {
        await QRCode.toCanvas(qrCanvasRef.current, JSON.stringify(patientData), {
          width: 256,
          margin: 2,
        });
      }
    } catch {
      toast.error('Failed to generate QR code');
    }
  };

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div
        className="space-y-6 p-6"
        style={{ backgroundColor: '#f1f5f5', minHeight: '100vh' }}
      >
        <div className="text-center">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
            QR Health Passport
          </h1>
          <p className="text-muted-foreground mt-1">
            Your essential health information in a scannable QR code
          </p>
        </div>

        <canvas ref={qrCanvasRef} style={{ display: 'none' }} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Card */}
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="p-8 text-center">
              <div
                className="bg-white rounded-2xl p-6 inline-block border"
                ref={qrContainerRef}
              >
                {qrDataUrl && (
                  <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  Scan to view health information
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => {}}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button variant="secondary" onClick={() => setShowFullInfo(true)}>
                <QrCode className="h-4 w-4 mr-2" />
                View Info
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="font-semibold text-secondary">Health Summary</h2>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-secondary">{mockPatient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockPatient.age} • {mockPatient.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl">
                <Droplet className="h-6 w-6 text-destructive" />
                <p className="font-medium text-secondary">{mockPatient.bloodGroup}</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl">
                <Heart className="h-6 w-6 text-info" />
                <p className="font-medium text-secondary">
                  {mockPatient.chronicConditions?.join(', ') || 'None'}
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl">
                <Phone className="h-6 w-6 text-success" />
                <p className="font-medium text-secondary">
                  {mockPatient.emergencyContact?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-info/10 border border-info/20 rounded-2xl p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-secondary">Tip:</strong> Show this QR code to
            healthcare providers for quick access during emergencies.
          </p>
        </div>
      </div>
    </PatientLayout>
  );
};

export default HealthPassport;
