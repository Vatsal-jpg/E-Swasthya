// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Phone, ArrowRight, ChevronLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Logo from '@/components/shared/Logo';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// const DoctorLogin = () => {
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
//       navigate('/doctor/dashboard');
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
//               Doctor Login
//             </h1>
//             <p className="text-muted-foreground">
//               {step === 'phone'
//                 ? 'Enter your registered phone number'
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
//               New doctor?{' '}
//               <Link to="/doctor/signup" className="text-secondary font-medium hover:underline">
//                 Join Platform
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <Link to="/patient/login" className="text-secondary hover:underline text-sm">
//             Are you a patient? Login here →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorLogin;





















import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/shared/Logo';
import axios from 'axios';
import { toast } from 'sonner';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5001/api/doctor/login',
        { email, password }
      );


      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      navigate('/doctor/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
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
              Doctor Login
            </h1>
            <p className="text-muted-foreground">
              Login with your registered email and password
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-muted-foreground">
              New doctor?{' '}
              <Link to="/doctor/signup" className="text-secondary font-medium hover:underline">
                Join Platform
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/patient/login" className="text-secondary hover:underline text-sm">
            Are you a patient? Login here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
