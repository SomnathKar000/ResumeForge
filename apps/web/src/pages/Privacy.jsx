import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="font-body selection:bg-primary selection:text-on-primary bg-background min-h-screen flex flex-col text-on-surface">
      <Navbar variant="full" />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto flex-1">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-outline-variant/30 bg-surface-container-low">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              LEGAL & PRIVACY
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant text-sm">
            Last Updated: November 14, 2024 • Compliant with GDPR (EU), DPDP Act, 2023 (India) & IT Rules, 2021
          </p>
        </header>

        {/* Content */}
        <article className="space-y-12 text-on-surface-variant leading-relaxed">
          {/* Key Privacy Highlights Card */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-primary/20">
            <h2 className="font-headline text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Privacy-by-Design Highlights
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check_circle</span>
                <span><strong className="text-white">Zero Database Persistence:</strong> Your uploaded resume files are processed in volatile memory (RAM) and are permanently discarded immediately after PDF generation. We do not maintain a resume database.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check_circle</span>
                <span><strong className="text-white">No Tracking Cookies:</strong> ResumeForge does not deploy tracking cookies, advertising pixels, or cross-site fingerprinting tools.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check_circle</span>
                <span><strong className="text-white">Purpose Limitation:</strong> Resume content is processed strictly to tailor and format your resume against your provided job description.</span>
              </li>
            </ul>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We collect only the minimum personal data required to perform our resume optimization services:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-white">Resume Information (Provided by You):</strong> When you upload a resume (.pdf or .docx), our backend extracts plain text including contact details (name, email, phone, location), educational history, work experience, certifications, and skills.
              </li>
              <li>
                <strong className="text-white">Job Descriptions:</strong> Plain text you paste into the job description field to enable keyword matching.
              </li>
              <li>
                <strong className="text-white">Contact Submissions:</strong> If you use our contact form, we collect your name, email address, subject, and message to respond to your inquiry.
              </li>
              <li>
                <strong className="text-white">Technical Diagnostics:</strong> Standard ephemeral HTTP server logs (IP address, user agent, timestamp) strictly for rate-limiting, security defense, and uptime monitoring.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              2. How We Use and Process Your Data
            </h2>
            <p className="mb-4">
              We process personal data under the lawful bases of <strong>explicit consent</strong> and <strong>performance of requested services</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Extracting text from your uploaded document.</li>
              <li>Sending extracted text alongside your target job description to our AI sub-processor (Google Gemini) for ATS restructuring.</li>
              <li>Compiling the structured output into a downloadable PDF format.</li>
              <li>Transmitting the tailored PDF directly to your browser for immediate download.</li>
            </ol>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              3. Third-Party Sub-processors & Cross-Border Transfers
            </h2>
            <p className="mb-4">
              To provide AI capabilities and communication infrastructure, we share specific data with vetted third-party service providers:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-outline-variant/20 rounded-xl overflow-hidden">
                <thead className="bg-surface-container font-headline text-white">
                  <tr>
                    <th className="p-3 border-b border-outline-variant/20">Sub-processor</th>
                    <th className="p-3 border-b border-outline-variant/20">Role</th>
                    <th className="p-3 border-b border-outline-variant/20">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 bg-surface-container-low/50">
                  <tr>
                    <td className="p-3 font-medium text-white">Google Cloud / Google AI</td>
                    <td className="p-3">Gemini API for text restructuring & keyword optimization</td>
                    <td className="p-3">United States / Global</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Resend Inc.</td>
                    <td className="p-3">Transactional email delivery for contact form inquiries</td>
                    <td className="p-3">United States</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Cloudflare</td>
                    <td className="p-3">Edge hosting, DDoS protection, and SSL termination</td>
                    <td className="p-3">Global Edge Network</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs">
              Cross-border data transfers comply with applicable international safeguards, including standard contractual clauses (SCCs) under GDPR and the transfer criteria defined under Section 16 of India's DPDP Act, 2023.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              4. Data Retention and Erasure
            </h2>
            <p>
              ResumeForge enforces strict storage limitation: <strong>Uploaded resume files and extracted candidate details are held only in temporary system memory (RAM) during the generation cycle</strong>. Once your PDF is compiled and sent to your client, the memory buffer is garbage collected. We do not store your resumes in databases, Cloud object stores (S3/R2), or local disks.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              5. Your Rights as a Data Principal / Data Subject
            </h2>
            <p className="mb-4">
              Under the <strong>GDPR (EU)</strong> and the <strong>DPDP Act, 2023 (India)</strong>, you retain significant rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Right to Information / Access:</strong> Right to know what personal data is processed and shared.</li>
              <li><strong className="text-white">Right to Correction & Updating:</strong> Right to correct any inaccurate personal data.</li>
              <li><strong className="text-white">Right to Erasure / To Be Forgotten:</strong> Since we do not retain your resume data post-generation, erasure is automatic and instantaneous upon session completion.</li>
              <li><strong className="text-white">Right to Withdraw Consent:</strong> You may decline or withdraw consent at any time prior to clicking the Generate button.</li>
              <li><strong className="text-white">Right to Grievance Redressal:</strong> The right to seek resolution of any complaint through our designated Grievance Officer.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              6. Protection of Minors (Under 18)
            </h2>
            <p>
              In compliance with Section 9 of the DPDP Act, 2023 and Article 8 of the GDPR, ResumeForge is intended for adult career professionals and students aged 18 and older. We do not knowingly process personal data belonging to minors without verifiable parental or guardian consent, nor do we perform behavioral tracking or targeted advertising directed at children.
            </p>
          </section>

          {/* Section 7 - Grievance Officer */}
          <section className="bg-surface-container p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="font-headline text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              7. Grievance Officer & Statutory Redressal (India)
            </h2>
            <p className="text-sm mb-6">
              In accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and Section 13 of the Digital Personal Data Protection Act, 2023, the details of the designated Grievance Officer for ResumeForge are provided below:
            </p>

            <div className="bg-[#111111] p-6 rounded-xl border border-outline-variant/20 space-y-3 text-sm">
              <p><strong className="text-white">Name / Designation:</strong> Grievance Officer, ResumeForge</p>
              <p><strong className="text-white">Email Address:</strong> <a href="mailto:grievance@resumeforge.com" className="text-primary hover:underline font-semibold">grievance@resumeforge.com</a></p>
              <p><strong className="text-white">Alternative Contact:</strong> <Link to="/contact" className="text-primary hover:underline">Contact Support Desk</Link></p>
              <p><strong className="text-white">Acknowledgment Timeline:</strong> Within 24 hours of receiving the grievance.</p>
              <p><strong className="text-white">Resolution Timeline:</strong> Within 15 days from the date of receipt.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-white mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy or our data handling practices, please contact our team at <a href="mailto:support@resumeforge.com" className="text-primary hover:underline font-semibold">support@resumeforge.com</a>.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

