import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Brain, QrCode, MapPin, Shield, Wifi, Heart, ArrowRight, Check, Stethoscope, Pill, FileText, Clock, Smartphone, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

const features = [
  {
    icon: Video,
    title: 'Video Consultations',
    description: 'Connect with doctors through high-quality video calls, even on low bandwidth.',
    details: 'Works on 2G/3G networks with adaptive quality. Includes screen sharing for test reports and recording option with consent.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Brain,
    title: 'AI Disease Prediction',
    description: 'Get AI-powered health risk assessment based on your symptoms.',
    details: 'Analyzes symptoms using WHO guidelines and local disease patterns. Provides probable causes and urgent care recommendations.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: QrCode,
    title: 'QR Health Passport',
    description: 'Carry your health records securely in a scannable QR code.',
    details: 'Stores vaccination records, medical history, allergies, and medications. Works offline for emergency access.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: MapPin,
    title: 'Nearby Clinics',
    description: 'Find and locate the nearest healthcare facilities instantly.',
    details: 'Interactive map showing government hospitals, private clinics, diagnostic centers with real-time availability.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    icon: Stethoscope,
    title: 'Digital Prescriptions',
    description: 'Receive digital prescriptions instantly after consultation.',
    details: 'Includes medicine details, dosage instructions, precautions, and follow-up schedule with QR code sharing.',
    color: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Pill,
    title: 'Medicine Delivery',
    description: 'Get prescribed medicines delivered to your doorstep.',
    details: 'Partnerships with local pharmacies for rural delivery. Real-time tracking and multiple payment options.',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  },
];

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your account with phone number - no documents needed',
    details: ['Phone number verification', 'Basic health profile', 'Regional language support', 'No email required']
  },
  {
    number: '02',
    title: 'Describe Symptoms',
    description: 'Share health concerns or use AI symptom checker for guidance',
    details: ['AI-powered assessment', 'Voice input available', 'Local language support', 'Emergency triage']
  },
  {
    number: '03',
    title: 'Connect with Doctor',
    description: 'Video call certified doctors from comfort of your home',
    details: ['Verified doctors only', 'Low bandwidth optimized', 'Screen sharing available', 'Group consultation option']
  },
  {
    number: '04',
    title: 'Get Treatment',
    description: 'Receive prescriptions, follow-up plans, and medicine delivery',
    details: ['Digital prescriptions', 'Medicine delivery tracking', 'Follow-up reminders', 'Health tips in local language']
  },
];

const trustIndicators = [
  { icon: Shield, text: 'HIPAA Compliant & Secure', description: 'Your health data is secure' },
  { icon: Wifi, text: 'Works on 2G/3G Networks', description: 'Optimized for low bandwidth' },
  { icon: Heart, text: 'Rural-Friendly Design', description: 'Made for remote areas' },
  { icon: Check, text: 'Verified Doctors', description: 'All doctors are certified' },
];

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }

    // Auto scroll for steps section
    const interval = setInterval(() => {
      if (!isScrolling) {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }
    }, 4000);

    // Trigger initial animation
    setTimeout(() => setIsLoaded(true), 100);

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isScrolling]);

  const handleCardClick = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter(i => i !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  // Inline CSS for animations
  const style = `
    /* Hide scrollbar */
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes headerSlideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 0.8s ease-out forwards;
    }
    
    .animate-gradient-flow {
      animation: gradientFlow 3s ease infinite;
      background-size: 200% auto;
    }
    
    .animate-float {
      animation: float 10s ease-in-out infinite;
    }
    
    .animate-bounce {
      animation: bounce 2s ease-in-out infinite;
    }
    
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .animate-slide-in {
      animation: slideIn 0.5s ease-out forwards;
    }
    
    .animate-header-slide {
      animation: headerSlideDown 0.5s ease-out forwards;
    }
    
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200% auto;
      animation: shimmer 3s infinite linear;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .text-gradient {
      background: linear-gradient(90deg, #3b82f6, #10b981, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% auto;
      animation: gradientFlow 3s ease infinite;
    }
    
    /* SIMPLE FIX for flip cards - Using visibility toggle instead of 3D flip */
    .flip-container {
      perspective: 1000px;
      height: 320px;
      cursor: pointer;
    }
    
    .flip-content {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    
    .flip-container.flipped .flip-content {
      transform: rotateY(180deg);
    }
    
    .flip-front, .flip-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 1rem;
      padding: 1.5rem;
    }
    
    .flip-back {
      transform: rotateY(180deg);
      background: linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%);
    }
    
    /* Remove scrollbar */
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    /* Background patterns */
    .pattern-grid {
      background-image: 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 30px 30px;
    }
  `;

  return (
    <>
      <style>{style}</style>
      <div className="min-h-screen bg-background overflow-x-hidden scrollbar-hide">
        {/* Header with reduced height */}
        <header className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${isLoaded ? 'animate-header-slide' : ''}`}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Logo size="sm" className="hover:scale-105 transition-transform duration-300" />
              <nav className="hidden md:flex items-center gap-6">
                <a 
                  href="#features" 
                  className="relative text-gray-700 hover:text-emerald-600 transition-all duration-300 group"
                >
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="#how-it-works" 
                  className="relative text-gray-700 hover:text-emerald-600 transition-all duration-300 group"
                >
                  How it Works
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="#about" 
                  className="relative text-gray-700 hover:text-emerald-600 transition-all duration-300 group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </nav>
              <div className="flex items-center gap-2">
                <Link to="/patient/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="relative overflow-hidden group text-sm"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-emerald-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  </Button>
                </Link>
                <Link to="/patient/signup">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden text-sm"
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="h-3 w-3 ml-1 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Full window height */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-emerald-600 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in border border-emerald-200">
                <Heart className="h-4 w-4 animate-pulse" />
                Trusted by 10,000+ rural communities
              </div>
              
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-10">
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
                    Accessible Telemedicine for{' '}
                    <span className="text-gradient animate-gradient-flow">
                      Rural Communities
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Consult doctors remotely, even on low bandwidth. Quality healthcare is now just a tap away, no matter where you are.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <Link to="/patient/signup">
                    <Button 
                      size="lg"
                      className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg backdrop-blur-sm"
                    >
                      <span className="relative z-10">Get Started as Patient</span>
                      <ArrowRight className="h-5 w-5 ml-2 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-emerald-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    </Button>
                  </Link>
                  <Link to="/doctor/signup">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="group relative overflow-hidden border-2 border-white/50 hover:border-white transition-all duration-300 hover:scale-105 hover:shadow-xl px-8 py-6 text-lg backdrop-blur-sm bg-white/20"
                    >
                      <span className="relative z-10 text-white">Join as Doctor</span>
                      <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/80 text-sm animate-pulse">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-emerald-50/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-2 text-emerald-700 transition-all duration-300 hover:scale-110 group animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="font-medium">{item.text}</span>
                  <span className="text-sm text-emerald-600/80">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with SIMPLE Flip Cards */}
        <section 
          id="features" 
          className="py-20 lg:py-28 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-on-scroll">
                Everything You Need for Remote Healthcare
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                Click on any card to flip and learn more about each feature
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flip-container animate-on-scroll ${flippedCards.includes(index) ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(index)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flip-content">
                    {/* Front of card */}
                    <div className="flip-front bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border h-full flex flex-col">
                      <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group transition-all duration-300 hover:bg-emerald-100 hover:scale-110`}>
                        <feature.icon className={`h-7 w-7 ${feature.iconColor} group-hover:animate-bounce`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm pt-4 border-t">
                        <span>Click to learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="flip-back rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
                      <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                        <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {feature.details}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm pt-4 border-t border-gray-200">
                        <span>Click to go back</span>
                        <ArrowRight className="h-4 w-4 transform rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section 
          id="how-it-works"
          className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Simple Process
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How <span className="text-gradient">eSwasthya</span> Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Get quality healthcare in 4 simple steps, designed for easy use even for first-time smartphone users.
              </p>
            </div>

            {/* Steps Visualization */}
            <div className="relative max-w-6xl mx-auto">
              {/* Steps Navigation */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveStep(index);
                        setIsScrolling(true);
                        setTimeout(() => setIsScrolling(false), 1000);
                      }}
                      className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        activeStep === index
                          ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm font-medium">Step {index + 1}</span>
                      {activeStep === index && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Steps Content */}
              <div className="relative h-[500px] md:h-[600px]">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeStep === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                      {/* Step Image */}
                      <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-6xl">{step.number}</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="absolute top-6 left-6">
                          <span className="text-7xl font-bold text-white/20">{step.number}</span>
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="p-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          Step {step.number}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-8">
                          {step.description}
                        </p>
                        <ul className="space-y-3">
                          {step.details.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveStep(index);
                        setIsScrolling(true);
                        setTimeout(() => setIsScrolling(false), 1000);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeStep === index
                          ? 'w-8 bg-gradient-to-r from-emerald-600 to-blue-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0 pattern-grid"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Join Thousands of Happy Users
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Ready to Experience{' '}
                  <span className="text-gradient">Better Healthcare?</span>
                </h2>
                <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                  Join our community of patients and doctors making healthcare accessible to everyone, everywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <Link to="/patient/signup">
                  <Button 
                    size="lg"
                    className="group relative overflow-hidden px-12 py-7 text-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Start Free Consultation</span>
                    <ArrowRight className="h-5 w-5 ml-2 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
                
                <Link to="/doctor/signup">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden px-12 py-7 text-lg border-2 border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Join as Healthcare Provider</span>
                    <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </Link>
              </div>

              {/* Features Grid - Emojis Removed */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <div 
                  className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Check className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-700 text-center">No Hidden Charges</div>
                </div>
                <div 
                  className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Check className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-700 text-center">First Consultation Free</div>
                </div>
                <div 
                  className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Check className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-700 text-center">Multi-language Support</div>
                </div>
                <div 
                  className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Check className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-700 text-center">Offline Mode Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="get-started" className="py-16 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="animate-fade-in">
                <Logo size="md" className="text-white mb-4" />
                <p className="text-gray-400">
                  Making quality healthcare accessible to every corner of rural India through innovative technology.
                </p>
                <div className="flex items-center gap-2 mt-4 text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live 24/7 Support</span>
                </div>
              </div>
              
              {[
                {
                  title: 'For Patients',
                  links: ['Sign Up', 'Book Consultation', 'Health Records', 'Medicine Delivery']
                },
                {
                  title: 'For Doctors',
                  links: ['Join Platform', 'Doctor Login', 'Consultation History', 'Earnings Dashboard']
                },
                {
                  title: 'Support',
                  links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
                }
              ].map((column, colIndex) => (
                <div 
                  key={colIndex}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 + colIndex * 0.1}s` }}
                >
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    {column.title}
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href="#"
                          className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:pl-2 block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p>© 2025 eSwasthya. Empowering Rural Healthcare Across India.</p>
              <p className="text-sm mt-2 flex flex-wrap items-center justify-center gap-2">
                <span>Available in:</span>
                {['Hindi', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali'].map((lang, i) => (
                  <span key={i} className="text-emerald-400">{lang}{i < 5 ? ',' : ''}</span>
                ))}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;