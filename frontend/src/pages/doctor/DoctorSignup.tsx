import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ChevronLeft, User, Mail, Stethoscope, GraduationCap, FileText, Shield, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/shared/Logo';
import { useToast } from '@/hooks/use-toast';

const specializations = [
  'General Physician',
  'Pediatrician',
  'Cardiologist',
  'Dermatologist',
  'Orthopedic',
  'Gynecologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Psychiatrist',
  'Other',
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface EducationEntry {
  degreeName: string;
  instituteName: string;
  yearOfCompletion: number | '';
  certificateFile: File | null;
}

const DoctorSignup = () => {
  const [step, setStep] = useState<'basic' | 'medical' | 'education' | 'identity'>('basic');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',

    // Medical Registration
    medicalRegNumber: '',
    registrationAuthority: '',
    registrationYear: '',
    licenseFile: null as File | null,

    // Government ID
    idType: '' as 'Aadhaar' | 'PAN' | 'Passport' | '',
    idNumber: '',
    idProofFile: null as File | null,
  });

  const [education, setEducation] = useState<EducationEntry[]>([
    { degreeName: '', instituteName: '', yearOfCompletion: '', certificateFile: null }
  ]);

  const addEducationEntry = () => {
    setEducation([...education, { degreeName: '', instituteName: '', yearOfCompletion: '', certificateFile: null }]);
  };

  const removeEducationEntry = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof EducationEntry, value: string | number | File | null) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const validateStep = (currentStep: string): boolean => {
    switch (currentStep) {
      case 'basic':
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          toast({
            title: 'Validation Error',
            description: 'Please fill all required fields',
            variant: 'destructive',
          });
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: 'Password Mismatch',
            description: 'Passwords do not match',
            variant: 'destructive',
          });
          return false;
        }
        if (formData.password.length < 6) {
          toast({
            title: 'Weak Password',
            description: 'Password must be at least 6 characters',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      case 'medical':
        if (!formData.medicalRegNumber || !formData.registrationAuthority || !formData.licenseFile) {
          toast({
            title: 'Validation Error',
            description: 'Please fill all medical registration fields and upload license certificate',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      case 'education':
        const hasValidEducation = education.some(
          (edu) => edu.degreeName && edu.instituteName && edu.yearOfCompletion && edu.certificateFile
        );
        if (!hasValidEducation) {
          toast({
            title: 'Validation Error',
            description: 'Please add at least one complete education entry with certificate',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      case 'identity':
        if (!formData.idType || !formData.idNumber || !formData.idProofFile) {
          toast({
            title: 'Validation Error',
            description: 'Please fill all identity fields and upload ID proof',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    const steps: Array<'basic' | 'medical' | 'education' | 'identity'> = ['basic', 'medical', 'education', 'identity'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Array<'basic' | 'medical' | 'education' | 'identity'> = ['basic', 'medical', 'education', 'identity'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Basic info
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.specialization) formDataToSend.append('specialization', formData.specialization);
      if (formData.experience) formDataToSend.append('experience', formData.experience);

      // Medical registration
      formDataToSend.append('medicalRegNumber', formData.medicalRegNumber);
      formDataToSend.append('registrationAuthority', formData.registrationAuthority);
      if (formData.registrationYear) formDataToSend.append('registrationYear', formData.registrationYear);
      if (formData.licenseFile) formDataToSend.append('license', formData.licenseFile);

      // Education
      const educationData = education
        .filter((edu) => edu.degreeName && edu.instituteName && edu.yearOfCompletion)
        .map((edu) => ({
          degreeName: edu.degreeName,
          instituteName: edu.instituteName,
          yearOfCompletion: Number(edu.yearOfCompletion),
        }));
      formDataToSend.append('education', JSON.stringify(educationData));

      // Education certificates
      education.forEach((edu, index) => {
        if (edu.certificateFile) {
          formDataToSend.append('educationCert', edu.certificateFile);
        }
      });

      // Identity
      formDataToSend.append('idType', formData.idType);
      formDataToSend.append('idNumber', formData.idNumber);
      if (formData.idProofFile) formDataToSend.append('idProof', formData.idProofFile);

      const response = await fetch(`${API_BASE_URL}/doctor/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      toast({
        title: 'Registration Successful',
        description: 'Your account has been created. Please wait for admin approval...',
      });

      // Redirect to pending page after 1 second
      setTimeout(() => {
        navigate('/doctor/pending');
      }, 1000);
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'basic':
        return 'Basic Information';
      case 'medical':
        return 'Medical Registration';
      case 'education':
        return 'Education Details';
      case 'identity':
        return 'Identity Verification';
      default:
        return 'Sign Up';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'basic':
        return 'Enter your personal and professional details';
      case 'medical':
        return 'Provide your medical registration information';
      case 'education':
        return 'Add your educational qualifications';
      case 'identity':
        return 'Verify your identity with government ID';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 border">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="font-display text-2xl font-bold text-secondary mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-muted-foreground">{getStepDescription()}</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {['basic', 'medical', 'education', 'identity'].map((s, idx) => {
                const stepIndex = ['basic', 'medical', 'education', 'identity'].indexOf(step);
                return (
                  <div
                    key={s}
                    className={`h-2 w-12 rounded-full ${idx <= stepIndex ? 'bg-secondary' : 'bg-muted'
                      }`}
                  />
                );
              })}
            </div>
          </div>

          <form onSubmit={step === 'identity' ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {step === 'basic' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Anita Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                    >
                      <SelectTrigger className="h-12">
                        <Stethoscope className="h-5 w-5 text-muted-foreground mr-2" />
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="0"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="h-12"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 'medical' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalRegNumber">Medical Registration Number *</Label>
                  <Input
                    id="medicalRegNumber"
                    type="text"
                    placeholder="Enter your registration number"
                    value={formData.medicalRegNumber}
                    onChange={(e) => setFormData({ ...formData, medicalRegNumber: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationAuthority">Registration Authority *</Label>
                  <Input
                    id="registrationAuthority"
                    type="text"
                    placeholder="e.g., MCI, State Medical Council"
                    value={formData.registrationAuthority}
                    onChange={(e) => setFormData({ ...formData, registrationAuthority: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationYear">Registration Year</Label>
                  <Input
                    id="registrationYear"
                    type="number"
                    placeholder="YYYY"
                    value={formData.registrationYear}
                    onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                    className="h-12"
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Certificate *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      id="license"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({ ...formData, licenseFile: e.target.files?.[0] || null })}
                      className="hidden"
                      required
                    />
                    <label htmlFor="license" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {formData.licenseFile ? formData.licenseFile.name : 'Click to upload license certificate'}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 'education' && (
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    {education.length > 1 && (
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Education {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducationEntry(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Degree Name *</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="e.g., MBBS, MD"
                            value={edu.degreeName}
                            onChange={(e) => updateEducation(index, 'degreeName', e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Year of Completion *</Label>
                        <Input
                          type="number"
                          placeholder="YYYY"
                          value={edu.yearOfCompletion}
                          onChange={(e) => updateEducation(index, 'yearOfCompletion', e.target.value ? parseInt(e.target.value) : '')}
                          className="h-12"
                          min="1950"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Institute Name *</Label>
                      <Input
                        placeholder="Name of institution"
                        value={edu.instituteName}
                        onChange={(e) => updateEducation(index, 'instituteName', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Certificate *</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => updateEducation(index, 'certificateFile', e.target.files?.[0] || null)}
                          className="hidden"
                          id={`cert-${index}`}
                          required
                        />
                        <label htmlFor={`cert-${index}`} className="cursor-pointer">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {edu.certificateFile ? edu.certificateFile.name : 'Click to upload certificate'}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEducationEntry}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </div>
            )}

            {step === 'identity' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">Government ID Type *</Label>
                  <Select
                    value={formData.idType}
                    onValueChange={(value: 'Aadhaar' | 'PAN' | 'Passport') => setFormData({ ...formData, idType: value })}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <Shield className="h-5 w-5 text-muted-foreground mr-2" />
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="PAN">PAN</SelectItem>
                      <SelectItem value="Passport">Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    type="text"
                    placeholder={`Enter your ${formData.idType || 'ID'} number`}
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idProof">ID Proof Document *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      id="idProof"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({ ...formData, idProofFile: e.target.files?.[0] || null })}
                      className="hidden"
                      required
                    />
                    <label htmlFor="idProof" className="cursor-pointer">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {formData.idProofFile ? formData.idProofFile.name : 'Click to upload ID proof'}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {step !== 'basic' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                  size="lg"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  'Processing...'
                ) : step === 'identity' ? (
                  <>
                    Complete Registration
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-muted-foreground">
              Already registered?{' '}
              <Link to="/doctor/login" className="text-secondary font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/patient/signup" className="text-secondary hover:underline text-sm">
            Are you a patient? Sign up here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
