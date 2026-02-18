
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSending(true);

    try {
      // Sending form using EmailJS
      // Service ID: service_csvpdod
      // Template ID: template_seja92q
      // Public Key: tIBZlXomW4WKv0Ukb
      await emailjs.sendForm(
        'service_csvpdod',
        'template_seja92q',
        formRef.current!,
        'tIBZlXomW4WKv0Ukb'
      );

      // Success Feedback
      alert('Message Sent Successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Start Your <span className="text-brand-orange">Project</span>
          </motion.h2>
          <div className="w-16 md:w-20 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 md:space-y-8"
          >
             <h3 className="text-2xl font-bold text-white mb-4 md:mb-6">Let's Discuss How I Can Contribute</h3>
             <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base break-words">
               Ready to start your next project? Whether you have a specific idea or need a dedicated frontend developer to join your team, I am here to help. Let's build something user-centric and impactful.
             </p>

             <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-full flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-gray-400 text-sm">Dhaka, Bangladesh (Available Remote)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-full flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-gray-400 text-sm break-all">sohanmahmoud25@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-full flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-gray-400 text-sm">+880 1842489472</p>
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <form ref={formRef} onSubmit={sendEmail} className="bg-brand-card backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-3xl shadow-xl">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-400 text-sm mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name" // Matches typical EmailJS template variable {{name}}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-400 text-sm mb-2 font-medium">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email" // Matches typical EmailJS template variable {{email}}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 text-sm mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message" // Matches typical EmailJS template variable {{message}}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can I help you?"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-brand-orange to-brand-orangeDark text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
