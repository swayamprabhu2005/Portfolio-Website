import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  FileDown,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerButton } from '../ui/ShimmerButton';
import { ShimmerCard } from '../ui/ShimmerCard';
import { sounds } from '../ui/SoundEffects';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = '23ce172.swayam@pccegoa.edu.in';
  const phone = '+91 8208921037';
  const linkedinUrl = 'https://www.linkedin.com/in/swayam-prabhu-b1490a287/';
  const githubUrl = 'https://github.com/swayamprabhu2005';

  const copyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    sounds.playClick();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playNeuralPulse();
    // Open default mail client with prefilled body
    const mailtoUrl = `mailto:${email}?subject=Collaboration%20Inquiry%20from%20${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Hello Swayam,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    )}`;
    window.location.href = mailtoUrl;
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="09"
        tag="GET IN TOUCH"
        title="Let's Build Something Meaningful"
        description="Interested in software engineering, AI/ML research, embedded systems, or high-impact technical collaboration? Let's connect."
        alignment="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
        {/* Left 5 Columns: Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <ShimmerCard glowColor="purple" className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-400">Direct Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-purple-300 font-semibold transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </ShimmerCard>

          {/* Phone Card */}
          <ShimmerCard glowColor="cyan" className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-400">Phone / WhatsApp</div>
                  <a
                    href={`tel:${phone}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-cyan-300 font-semibold transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </ShimmerCard>

          {/* Location & Institution */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 font-mono text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Goa, India</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Department of Computer Engineering, Padre Conceicao College of Engineering (PCCE), Verna, Goa.
            </p>
          </div>

          {/* Fast Social CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="p-3 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-blue-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right 7 Columns: Quick Message Form */}
        <div className="lg:col-span-7">
          <ShimmerCard glowColor="purple" className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6 text-purple-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Transmit Instant Message</span>
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
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
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
                  placeholder="e.g. elena@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <ShimmerButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<Send className="w-4 h-4" />}
                  cursorLabel="TRANSMIT"
                  className="w-full"
                >
                  {messageSent ? 'Message Transmitted!' : 'Send Direct Message'}
                </ShimmerButton>
              </div>
            </form>
          </ShimmerCard>
        </div>
      </div>
    </section>
  );
};
