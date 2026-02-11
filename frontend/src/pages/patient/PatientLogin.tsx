// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Phone, ArrowRight, ChevronLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Logo from '@/components/shared/Logo';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// const PatientLogin = () => {
//   const [step, setStep] = useState<'phone' | 'otp'>('phone');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const navigate = useNavigate();

//   const handleSendOTP = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (phone.length >= 10) {
//       setStep('otp');
//     }
//   };

//   const handleVerifyOTP = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.length === 6) {
//       navigate('/patient/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-card rounded-2xl shadow-card p-8 border">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-6">
//               <Logo size="lg" />
//             </div>
//             <h1 className="font-display text-2xl font-bold text-secondary mb-2">
//               Patient Login
//             </h1>
//             <p className="text-muted-foreground">
//               {step === 'phone'
//                 ? 'Enter your phone number to continue'
//                 : `Enter the OTP sent to ${phone}`}
//             </p>
//           </div>

//           {step === 'phone' ? (
//             <form onSubmit={handleSendOTP} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+91 98765 43210"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="pl-10 h-12"
//                   />
//                 </div>
//               </div>
//               <Button type="submit" className="w-full" size="lg">
//                 Send OTP
//                 <ArrowRight className="h-4 w-4 ml-2" />
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOTP} className="space-y-6">
//               <div className="space-y-4">
//                 <Label>Enter 6-digit OTP</Label>
//                 <div className="flex justify-center">
//                   <InputOTP
//                     maxLength={6}
//                     value={otp}
//                     onChange={(value) => setOtp(value)}
//                   >
//                     <InputOTPGroup>
//                       <InputOTPSlot index={0} />
//                       <InputOTPSlot index={1} />
//                       <InputOTPSlot index={2} />
//                       <InputOTPSlot index={3} />
//                       <InputOTPSlot index={4} />
//                       <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                   </InputOTP>
//                 </div>
//                 <p className="text-center text-sm text-muted-foreground">
//                   Didn't receive OTP?{' '}
//                   <button type="button" className="text-secondary font-medium hover:underline">
//                     Resend
//                   </button>
//                 </p>
//               </div>
//               <div className="space-y-3">
//                 <Button type="submit" className="w-full" size="lg">
//                   Verify & Login
//                   <ArrowRight className="h-4 w-4 ml-2" />
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   className="w-full"
//                   onClick={() => setStep('phone')}
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-2" />
//                   Change Number
//                 </Button>
//               </div>
//             </form>
//           )}

//           <div className="mt-8 pt-6 border-t text-center">
//             <p className="text-muted-foreground">
//               Don't have an account?{' '}
//               <Link to="/patient/signup" className="text-secondary font-medium hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <Link to="/doctor/login" className="text-secondary hover:underline text-sm">
//             Are you a doctor? Login here →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientLogin;















import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/shared/Logo';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import { toast } from 'sonner';

const PatientLogin = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/patient/send-otp', {
        phone
      });

      if (response.status === 200) {
        setStep('otp');
        toast.success("OTP sent successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/patient/verify-otp', {
        phone,
        otp
      });

      if (response.status === 200) {
        const { token, patient } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(patient));
        toast.success("Login Successful!");
        navigate('/patient/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP or login failed.");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 border">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="font-display text-2xl font-bold text-secondary mb-2">
              Patient Login
            </h1>
            <p className="text-muted-foreground">
              {step === 'phone'
                ? 'Enter your phone number to continue'
                : `Enter the OTP sent to ${phone}`}
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send OTP
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-4">
                <Label>Enter 6-digit OTP</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive OTP?{' '}
                  <button type="button" className="text-secondary font-medium hover:underline">
                    Resend
                  </button>
                </p>
              </div>
              <div className="space-y-3">
                <Button type="submit" className="w-full" size="lg">
                  Verify & Login
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Change Number
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/patient/signup" className="text-secondary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/doctor/login" className="text-secondary hover:underline text-sm">
            Are you a doctor? Login here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;