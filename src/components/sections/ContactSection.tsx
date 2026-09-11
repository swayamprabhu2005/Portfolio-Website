import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  Copy,
  Check,
  Send,
  MapPin,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerButton } from '../ui/ShimmerButton';
import { ShimmerCard } from '../ui/ShimmerCard';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'swayamkiranprabhu2005@gmail.com';
  const phone = '+91 8208921037';
  const linkedinUrl = 'https://www.linkedin.com/in/swayam-prabhu-b1490a287/';
  const githubUrl = 'https://github.com/swayamprabhu2005';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c4a28ee3-0d10-4803-b5eb-7a0ef28a55a4',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Inquiry)`,
          subject: `⚡ Portfolio Inquiry from ${formData.name}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Unable to deliver message right now. Please email directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('Network connection error. Please email directly or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="08"
        tag="GET IN TOUCH"
        title="Let's Build Something Meaningful"
        description="Interested in software engineering, applied AI, agentic LLM workflows, or technical collaboration? Let's connect."
        alignment="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
        {/* Left 5 Columns: Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <ShimmerCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/15 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-400 font-medium">Direct Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-[#00D2FF] font-semibold transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </ShimmerCard>

          {/* Phone Card */}
          <ShimmerCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-400 font-medium">Phone / WhatsApp</div>
                  <a
                    href={`tel:${phone}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-emerald-400 font-semibold transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </ShimmerCard>

          {/* Location & Institution */}
          <div className="p-5 rounded-2xl bg-[#0E1738]/80 backdrop-blur-xl border border-white/10 shadow-2xl font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-4 h-4 text-[#DC143C]" />
              <span>Goa, India</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Department of Computer Engineering, Padre Conceicao College of Engineering (PCCE), Verna, Goa.
            </p>
          </div>

          {/* Fast Social CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-[#00D2FF] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#091024]/80 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right 7 Columns: Quick Message Form */}
        <div className="lg:col-span-7">
          <ShimmerCard className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6 text-[#00D2FF] font-mono text-xs uppercase tracking-wider font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Inquiries</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1.5 font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Ramesh Rao"
                  className="w-full px-4 py-3 rounded-xl bg-[#091024]/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D2FF] focus:bg-[#0E1738] transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1.5 font-semibold">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ramesh@institute.edu"
                  className="w-full px-4 py-3 rounded-xl bg-[#091024]/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D2FF] focus:bg-[#0E1738] transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1.5 font-semibold">
                  Message / Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, engineering team, or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-[#091024]/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D2FF] focus:bg-[#0E1738] transition-colors resize-none"
                />
              </div>

              {/* Success Banner */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 font-mono text-xs animate-in fade-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Message Delivered to Inbox!</div>
                    <div className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Thank you for reaching out. Swayam has received your inquiry and will follow up shortly.
                    </div>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start justify-between gap-3 text-rose-300 font-mono text-xs animate-in fade-in duration-300">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Transmission Notice</div>
                      <div className="text-[11px] text-slate-300 font-sans mt-0.5">
                        {errorMessage || 'Unable to deliver message.'}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-white hover:text-[#00D2FF] font-semibold underline text-xs shrink-0 self-center"
                  >
                    Email Directly
                  </a>
                </div>
              )}

              <div className="pt-2">
                <ShimmerButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  cursorLabel={isSubmitting ? "SENDING" : "SEND"}
                  className={`w-full ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isSubmitting ? 'Transmitting Message...' : 'Send Direct Message'}
                </ShimmerButton>
              </div>
            </form>
          </ShimmerCard>
        </div>
      </div>
    </section>
  );
};

