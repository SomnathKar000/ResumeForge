# Security Incident Response & CERT-In Reporting Runbook

This runbook establishes standard operational procedures for identifying, triaging, containing, and reporting cybersecurity incidents affecting **ResumeForge** in compliance with:
- **CERT-In Directions (April 28, 2022)** under Section 70B of the Information Technology Act, 2000.
- **Digital Personal Data Protection Act, 2023 (DPDP Act)** Section 8(6).

---

## 1. Statutory Reporting Mandate: The 6-Hour Rule

Under CERT-In Direction 20(3), any cybersecurity incident of a specified type must be reported to **CERT-In within 6 hours of noticing the incident or being brought to notice**.

### CERT-In Contact Channels
| Channel | Details |
| :--- | :--- |
| **Email** | `incident@cert-in.org.in` |
| **Emergency Help Desk** | +91-1800-11-4949 / +91-11-2290-2699 |
| **Web Incident Form** | [https://www.cert-in.org.in](https://www.cert-in.org.in) |
| **Fax** | +91-1800-11-6969 |

> [!CAUTION]
> Failure to report within the mandatory 6-hour window is punishable under Section 70B(7) of the IT Act, 2000 with imprisonment up to one year and/or fines.

---

## 2. Trigger Events & Reportable Incident Types

Report immediately if any of the following occur:
1. **API Key / Secret Compromise:** Unauthorized exposure or misuse of `GEMINI_API_KEY`, `RESEND_API_KEY`, or hosting credentials.
2. **Server / Container Intrusion:** Unauthorized shell access, container breakout, or arbitrary code execution on backend instances.
3. **Data Leakage / Exfiltration:** Unauthorized intercept or dump of user contact submissions, resume text, or email logs.
4. **Denial of Service (DoS / DDoS):** Sustained volumetric flood taking down the API or Cloudflare edge endpoints.
5. **Ransomware / Extortion:** Any malicious encryption or ransom demand affecting infrastructure.

---

## 3. Incident Response Playbook (Phase-by-Phase)

```
[0h: Detection] ──> [0h-1h: Triage & Containment] ──> [1h-4h: Investigation] ──> [≤ 6h: CERT-In Notification]
                                                                        └──> [Recovery & DPBI Notice]
```

### Phase 1: Identification & Immediate Triage (0 – 1 Hour)
1. **Confirm the Incident:** Verify logs, error spikes, unauthorized API calls, or alert notifications.
2. **Assign Incident Commander:** Lead developer / system administrator takes ownership.
3. **Preserve Volatile Evidence:** Do not immediately destroy/restart affected containers if root cause is unknown. Snapshot server logs and state.

### Phase 2: Containment & Remediation (1 – 3 Hours)
- **If API Key Leaked:**
  1. Revoke the compromised API key in Google Cloud Console or Resend Dashboard immediately.
  2. Issue a replacement key, update environment variables, and restart instances.
- **If Server Compromised:**
  1. Isolate the server instance from the network.
  2. Deploy a clean container image from version control.
  3. Rotate all production secrets, passwords, and deploy tokens.
- **If DoS Attack:**
  1. Enable Cloudflare Under Attack Mode (I'm Under Attack).
  2. Restrict backend firewall to Cloudflare proxy IP ranges only.

### Phase 3: CERT-In Notification Dispatch (Within 6 Hours)
Prepare and dispatch the standardized incident notification email using the template in Section 4.

### Phase 4: Data Protection Board of India (DPBI) Notification
If the incident involves an actual or suspected breach of personal data (e.g., intercepted resumes or contact form submissions):
- In accordance with **Section 8(6) of the DPDP Act, 2023**, submit notification to the **Data Protection Board of India (DPBI)** describing:
  - Nature and scope of the personal data breach.
  - Number of Data Principals affected.
  - Potential consequences and remedial measures deployed.
  - Contact details of the Grievance Officer (`contact.somnathkar@gmail.com`).
- Transmit individual breach notifications to affected users where applicable.

---

## 4. Standard CERT-In Incident Notification Template

Send an email to `incident@cert-in.org.in` with the subject:  
`[INCIDENT REPORT] Cybersecurity Incident - ResumeForge - <Incident Type>`

```text
To: incident@cert-in.org.in
Subject: [INCIDENT REPORT] Cybersecurity Incident - ResumeForge - <Incident Type>

1. Organization Details:
   - Organization Name: ResumeForge
   - Organization Type: Web Application / Digital Service Provider
   - Service URL: https://resumeforge.com (or staging URL)

2. Point of Contact:
   - Contact Person: Somnath Kar (or Designated Incident Commander)
   - Designation: Technical Lead / Security Contact
   - Email: contact.somnathkar@gmail.com
   - Phone: [Contact Number]

3. Incident Specifics:
   - Type of Incident: [e.g., Unauthorized Access / API Key Compromise / DDoS / Data Leak]
   - Date and Time of Occurrence: YYYY-MM-DD HH:MM IST
   - Date and Time of Detection: YYYY-MM-DD HH:MM IST
   - Elapsed Time Since Detection: [Must be under 6 hours]

4. Technical Impact:
   - Affected Systems: [e.g., Express backend server / Cloudflare edge / Gemini API]
   - Public IP / Domains Involved: [IP Addresses, Hostnames]
   - Impact on Users / Data: [e.g., Ephemeral resumes processed; no persistent DB compromised]

5. Containment & Remedial Actions Taken:
   - [e.g., Rotated API keys, isolated compromised instance, re-deployed clean container]

6. Logs & Forensic Artifacts:
   - Attached: Sanitized log extracts (preserving hashes and UTC/IST timestamps).
   - Log Retention: Rolling 180 days maintained per CERT-In requirements.
```

---

## 5. Ongoing Regulatory Requirements

### 180-Day Secure Log Retention
- **Requirement:** Maintain system, application, firewall, and API gateway access logs securely for a rolling window of **180 days** within Indian jurisdiction.
- **Implementation:** Configure log exporters (e.g., Cloudflare Logpush, CloudWatch, or centralized storage) with a retention lifecycle policy of minimum 180 days.

### NTP Time Synchronization
- **Requirement:** Ensure all server system clocks are synchronized to the National Physical Laboratory (NPL) or National Informatics Centre (NIC) NTP servers.
- **Reference Servers:**
  - `time.nic.in`
  - `in.pool.ntp.org`

