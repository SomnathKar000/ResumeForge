import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useContact from "../hooks/useContact";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const { loading, success, error, handleSubmit, reset } = useContact();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(form);
    if (!error) setForm(INITIAL_FORM);
  };

  return (
    <div className="font-body selection:bg-primary selection:text-on-primary">
      <Navbar variant="full" />
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-outline-variant/30 bg-surface-container-low">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              CONTACT
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
            Get in touch
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or ran into an issue? We're here to help. Our team
            typically responds within one business day.
          </p>
        </section>

        {/* Info Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {/* General Support */}
          <div
            className="bg-[#111111] p-8 rounded-xl group hover:bg-surface-container transition-all duration-300"
            style={{ border: "1px solid rgba(70, 69, 85, 0.15)" }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">
                chat
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-white mb-2">
              General Support
            </h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              For general questions about ResumeForge and how to use our
              builder.
            </p>
            <a
              className="text-primary font-semibold text-sm hover:underline"
              href="mailto:support@resumeforge.com"
            >
              support@resumeforge.com
            </a>
          </div>

          {/* Bug Reports */}
          <div
            className="bg-[#111111] p-8 rounded-xl group hover:bg-surface-container transition-all duration-300"
            style={{ border: "1px solid rgba(70, 69, 85, 0.15)" }}
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary">
                bug_report
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-white mb-2">
              Bug Reports
            </h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Found something broken? Let us know so we can fix it immediately.
            </p>
            <a
              className="text-secondary font-semibold text-sm hover:underline"
              href="mailto:bugs@resumeforge.com"
            >
              bugs@resumeforge.com
            </a>
          </div>

          {/* Feedback */}
          <div
            className="bg-[#111111] p-8 rounded-xl group hover:bg-surface-container transition-all duration-300"
            style={{ border: "1px solid rgba(70, 69, 85, 0.15)" }}
          >
            <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary">
                lightbulb
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-white mb-2">
              Feedback &amp; Ideas
            </h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Tell us what features you want next or how we can improve.
            </p>
            <a
              className="text-tertiary font-semibold text-sm hover:underline"
              href="mailto:feedback@resumeforge.com"
            >
              feedback@resumeforge.com
            </a>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-[650px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold text-white mb-3">
              Send us a message
            </h2>
            <p className="text-on-surface-variant">
              We reply within 24 hours on weekdays
            </p>
          </div>

          <div
            className="bg-[#111111] p-10 rounded-2xl border border-white/5"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
          >
            {/* Success State */}
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    check_circle
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-white">
                  Message sent!
                </h3>
                <p className="text-on-surface-variant text-sm max-w-sm">
                  Thanks for reaching out. We'll get back to you within one
                  business day.
                </p>
                <button
                  onClick={reset}
                  className="mt-4 text-primary text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-white placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-white placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-white placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-white placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    placeholder="Your message here..."
                    rows="5"
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-[10px] px-4 py-3">
                    <span className="material-symbols-outlined text-red-400 text-lg">
                      error
                    </span>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 rounded-[10px] hover:bg-on-surface-variant transition-all active:scale-[0.98] duration-200 mt-4 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">
                        progress_activity
                      </span>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Visual Polish: Background Gradients */}
      <div className="fixed top-0 left-0 -z-10 w-full h-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <Footer />
    </div>
  );
}
