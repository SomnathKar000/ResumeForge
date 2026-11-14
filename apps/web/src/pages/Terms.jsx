import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="font-body selection:bg-primary selection:text-on-primary bg-background min-h-screen flex flex-col text-on-surface">
      <Navbar variant="full" />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto flex-1">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-outline-variant/30 bg-surface-container-low">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              TERMS OF USE
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">
            Terms of Service
          </h1>
          <p className="text-on-surface-variant text-sm">
            Last Updated: November 14, 2024 • Governed by the Information Technology Act, 2000 & IT Rules, 2021
          </p>
        </header>

        {/* Content */}
        <article className="space-y-12 text-on-surface-variant leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing, browsing, or using ResumeForge (the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. If you do not agree with any part of these Terms, you must immediately discontinue using the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              2. Description of the Service
            </h2>
            <p>
              ResumeForge provides an AI-assisted resume tailoring tool. Users may upload an existing resume in PDF or DOCX format and provide a target job description. The Service processes this information using automated artificial intelligence models to generate an ATS-optimized, formatted resume available for PDF download.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              3. User Responsibilities & Acceptable Use
            </h2>
            <p className="mb-4">
              In accordance with Rule 3(1)(b) of the Information Technology (Intermediary Guidelines) Rules, 2021, you agree that you will not host, display, upload, modify, or transmit any information that:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Belongs to another person and to which you do not have any right or explicit authorization.</li>
              <li>Contains software viruses, malware, trojans, or corrupted documents designed to disrupt or limit system functionality.</li>
              <li>Is defamatory, obscene, harassing, fraudulent, or violates any applicable national or international law.</li>
              <li>Misrepresents your professional credentials, degrees, employers, or qualifications to commit fraud or deceit.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              4. AI-Generated Output & Accuracy Disclaimer
            </h2>
            <p className="mb-4">
              ResumeForge utilizes third-party Large Language Models (including Google Gemini) to assist in restructuring, summarizing, and optimizing resumes.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 text-sm space-y-2">
              <p className="font-bold text-white">Please Review Before Submitting:</p>
              <p>
                While our system instructions explicitly command AI models not to fabricate or hallucinate dates, employers, or credentials, automated AI outputs can occasionally produce inaccuracies. You are solely responsible for reviewing, verifying, and validating the factual accuracy of all content in your generated resume before submitting it to employers.
              </p>
              <p>
                ResumeForge does not guarantee employment, interview invitations, or job placement.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              5. Intellectual Property & Ownership
            </h2>
            <p className="mb-4">
              <strong className="text-white">Your Content:</strong> You retain complete ownership of all personal data, resumes, work history, and job descriptions you submit to the Service. ResumeForge claims no intellectual property rights over your uploaded documents.
            </p>
            <p>
              <strong className="text-white">Our Platform:</strong> The visual interfaces, brand identity, layout designs, CSS styling, backend architectures, and software code of ResumeForge are protected by applicable intellectual property laws.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permissible by applicable law, ResumeForge, its creators, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, employment opportunities, or goodwill, arising out of or related to your use of or inability to use the Service.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              7. Grievance Redressal Mechanism (India)
            </h2>
            <p className="mb-4">
              For any grievances regarding content, data handling, or terms compliance, please contact our designated Grievance Officer:
            </p>
            <div className="bg-[#111111] p-6 rounded-xl border border-outline-variant/20 text-sm space-y-2">
              <p><strong className="text-white">Grievance Officer:</strong> Somnath Kar (Grievance Officer, ResumeForge)</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:contact.somnathkar@gmail.com" className="text-primary hover:underline">contact.somnathkar@gmail.com</a></p>
              <p><strong className="text-white">Statutory Response Window:</strong> Acknowledged within 24 hours; resolved within 15 days.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              8. Changes to These Terms
            </h2>
            <p>
              We reserve the right to revise or update these Terms at any time. Continued use of the Service following any modifications constitutes acceptance of the updated Terms.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

