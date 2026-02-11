import { useState, useEffect } from 'react';
import { Star, MessageSquare, ChevronDown, ChevronUp, HelpCircle, Send, Maximize2, Volume2 } from 'lucide-react';
import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I schedule a video consultation?',
    answer:
      'Go to your dashboard and click on "Start Video Call" or browse available doctors and book a slot from their calendar.',
  },
  {
    question: 'What if my internet connection is slow?',
    answer:
      'Our platform is optimized for low bandwidth. If video quality drops, you can switch to audio-only mode or use the chat feature.',
  },
  {
    question: 'How do I upload my medical reports?',
    answer:
      'Navigate to the Reports section and click "Upload Report". You can upload PDF, JPG, or PNG files up to 10MB.',
  },
  {
    question: 'Is my health data secure?',
    answer:
      'Yes, we use end-to-end encryption and follow HIPAA guidelines to ensure your health data remains private and secure.',
  },
  {
    question: 'How does the AI disease prediction work?',
    answer:
      'Our AI analyzes your symptoms and health history to suggest potential conditions. This is for informational purposes only and not a substitute for professional medical advice.',
  },
];

const Support = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Add the HeyGen script to the document
    const script = document.createElement('script');
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJEZXh0ZXJfRG9jdG9yX1NpdHRpbmcyX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzL2Y4%0D%0AM2ZmZmM0NWZhYTQzNjhiNmRiOTU5N2U2YjMyM2NhXzQ1NTkwL3ByZXZpZXdfdGFsa18zLndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImY0ZGQ1ZWYw%0D%0AYmU1OTQ5YzRiNjk1M2ZiYTIyYTllZDQyIiwidXNlcm5hbWUiOiJiNWM0MTdiZWQzN2I0ZDYzYjBj%0D%0AOTRiNjkwMTZiZmQ2NyJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\\n  #heygen-streaming-embed {\\n    z-index: 9999;\\n    position: relative;\\n    width: 100%;\\n    height: 100%;\\n    border-radius: 8px;\\n    border: 2px solid #0c9651;\\n    box-shadow: 0px 8px 24px 0px rgba(0, 205, 102, 0.3);\\n    transition: all linear 0.1s;\\n    overflow: hidden;\\n    opacity: 1;\\n    visibility: visible;\\n  }\\n  #heygen-streaming-embed.expand {\\n    position: fixed;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    width: 80vw;\\n    height: 80vh;\\n    z-index: 10000;\\n    border-radius: 12px;\\n  }\\n  #heygen-streaming-container {\\n    width: 100%;\\n    height: 100%;\\n  }\\n  #heygen-streaming-container iframe {\\n    width: 100%;\\n    height: 100%;\\n    border: 0;\\n  }\\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.getElementById("heygen-container")?.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
      // Also remove the HeyGen embed element if it exists
      const embed = document.getElementById('heygen-streaming-embed');
      if (embed && embed.parentNode) {
        embed.parentNode.removeChild(embed);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    const embed = document.getElementById('heygen-streaming-embed');
    if (embed) {
      embed.classList.toggle('expand', !isFullscreen);
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.trim()) {
      try {
        const response = await fetch('http://localhost:5001/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating,
            message: feedback,
            // userId: user?._id // Add user ID if available in context
          }),
        });

        if (response.ok) {
          console.log('Feedback submitted:', { rating, feedback });
          setFeedback('');
          setRating(0);
          alert('Thank you for your feedback!');
        } else {
          console.error('Failed to submit feedback');
          alert('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
            Feedback & Support
          </h1>
          <p className="text-muted-foreground mt-1">
            We value your feedback and are here to help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Feedback Forms */}
          <div className="space-y-8">
            {/* Rate Doctor */}
            <div className="bg-card rounded-xl shadow-card border p-6">
              <h2 className="font-semibold text-secondary mb-4">Rate Your Last Consultation</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={cn(
                          'h-8 w-8 transition-colors',
                          (hoveredRating || rating) >= star
                            ? 'text-warning fill-warning'
                            : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {rating > 0 && `${rating}/5`}
                </span>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-card rounded-xl shadow-card border p-6">
              <h2 className="font-semibold text-secondary mb-4">Share Your Feedback</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Message</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience or any suggestions..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleSubmitFeedback} disabled={!feedback.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card rounded-xl shadow-card border overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="font-semibold text-secondary">Frequently Asked Questions</h2>
                </div>
              </div>
              <div className="divide-y">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-secondary pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <p className="mt-3 text-muted-foreground text-sm animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant */}
          <div className="bg-card rounded-xl shadow-card border overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-secondary">AI Support Assistant</h2>
                    <p className="text-xs text-muted-foreground">Virtual assistant for instant help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    <Maximize2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 bg-white rounded-b-lg">
              <div className="h-[400px] rounded-lg overflow-hidden relative">
                <div id="heygen-container" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default Support;