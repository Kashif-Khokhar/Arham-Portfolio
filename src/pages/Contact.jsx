import { useState } from 'react';
import Toast from '../components/Toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending (no email backend in this demo)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setSuccess(true);
    setToast('✅ Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
    
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-14 mt-10">
          <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">Get in Touch</div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">Contact Us</h1>
          <p className="text-base text-text-secondary max-w-[560px] mx-auto">Have a question, feedback, or collaboration idea? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] mx-auto py-10">
          
          {/* Info Card */}
          <div className="bg-card border border-ui-border rounded-xl p-10 h-fit">
            <h3 className="font-display text-[1.1rem] text-text-bright tracking-[0.05em] mb-8">REACH OUT</h3>
            
            <div className="flex flex-col gap-6">
              {[
                { icon: '📧', label: 'EMAIL', value: 'hello@arhamtechzone.com' },
                { icon: '🌐', label: 'WEBSITE', value: 'arhamtechzone.com' },
                { icon: '📍', label: 'LOCATION', value: 'Pakistan 🇵🇰' },
                { icon: '⚡', label: 'RESPONSE TIME', value: 'Within 24 hours' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface border border-ui-border rounded-md flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[0.72rem] text-cyan tracking-[0.1em] mb-1">{item.label}</div>
                    <div className="text-text-primary text-[0.95rem]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-ui-border">
              <p className="font-mono text-[0.72rem] text-text-muted leading-relaxed">
                Built with Node.js + Express backend. This form submits to a simulated endpoint — wire up an email service like SendGrid or Nodemailer in production.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-ui-border rounded-xl p-10">
            <h3 className="font-display text-[1.1rem] text-text-bright tracking-[0.05em] mb-8">SEND A MESSAGE</h3>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Arham" 
                    required 
                    className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] outline-none transition-colors focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dev" 
                    required 
                    className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] outline-none transition-colors focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com" 
                  required 
                  className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] outline-none transition-colors focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] outline-none transition-colors focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] [&>option]:bg-card"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..." 
                  required 
                  className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] outline-none transition-colors focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] resize-y min-h-[140px]"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 px-7 py-3.5 rounded-md font-mono text-[0.95rem] font-medium tracking-[0.05em] transition-all bg-cyan text-void shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-text-bright hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>✉️ Send Message</>
                )}
              </button>
              
              {success && (
                <div className="mt-4 p-3 bg-green/10 border border-green text-green rounded-md font-mono text-[0.8rem] flex items-center gap-2 animate-fade-in-up">
                  ✅ Message received! We'll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>
          
        </div>
      </div>
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Contact;
