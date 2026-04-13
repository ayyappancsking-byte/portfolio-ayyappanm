import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // spam trap — must be empty
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ─── Auto-reply HTML template sent TO the visitor ────────────────────────────

function autoReplyHtml(name: string, originalMessage: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#0c1221;font-family:'DM Sans',Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c1221;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#111827;border-radius:12px;overflow:hidden;
                      border:1px solid #1f2937;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7d6f4c,#ab9e77);
                        padding:36px 40px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);
                           border-radius:50%;width:56px;height:56px;line-height:56px;
                           font-size:24px;font-weight:700;color:#fff;margin-bottom:16px;">A</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;
                          letter-spacing:0.5px;">Ayyappan M</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);
                         letter-spacing:1.5px;text-transform:uppercase;">
                BSc Computer Science · Full-Stack Developer · AI Enthusiast 
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 12px;font-size:18px;font-weight:600;color:#f9fafb;">
                Hi ${name},
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#d1d5db;">
                I truly appreciate you taking the time to connect through my portfolio.
                Your message has reached me successfully.
              </p>
              

              <!-- Quoted message box -->
              <div style="background:#1f2937;border-left:3px solid #7d6f4c;
                           border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.5px;
                            text-transform:uppercase;color:#6b7280;">Your message</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#9ca3af;
                            white-space:pre-wrap;">${originalMessage}</p>
              </div>

              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#d1d5db;">
                Looking forward to speaking with you!
              </p>
              <p style="margin:0;font-size:15px;color:#d1d5db;">
                Warm regards,<br />
                <strong style="color:#ab9e77;">Ayyappan M</strong>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #1f2937;" />
            </td>
          </tr>

          <!-- Footer links -->
          <!-- Footer links -->
<tr>
  <td style="padding:24px 40px;text-align:center;">
    <a href="mailto:ayyappancsking@gmail.com"
       style="color:#ab9e77;text-decoration:none;font-size:13px;margin:0 12px;">
       📧 ayyappancsking@gmail.com
    </a>
    <a href="https://www.linkedin.com/in/-ayyappanm"
       style="color:#ab9e77;text-decoration:none;font-size:13px;margin:0 12px;">
       🔗 LinkedIn
    </a>
    <a href="https://github.com/ayyappancsking-byte"
       style="color:#ab9e77;text-decoration:none;font-size:13px;margin:0 12px;">
       💻 GitHub
    </a>
    <p style="margin:16px 0 0;font-size:11px;color:#4b5563;">
      You received this because you submitted the contact form on Ayyappan M portfolio.
    </p>
  </td>
</tr>
  </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Check env vars are configured ──────────────────────────────────────
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json(
      { success: false, message: "Email not configured on this server." },
      { status: 503 }
    );
  }

  // ── 2. Parse & validate body ───────────────────────────────────────────────
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, subject, message, honeypot } = body;

  // Honeypot — bots fill this field; real users don't
  if (honeypot) {
    return NextResponse.json({ success: true, message: "Sent." }); // silent drop
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { success: false, message: "Message is too short." },
      { status: 400 }
    );
  }

  // ── 3. Send both emails ────────────────────────────────────────────────────
  const transporter = createTransporter();
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;
  const msgSubject = subject?.trim() || "Portfolio Contact Form";

  try {
    // A) Notification email → YOU (portfolio owner)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: receiver,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${msgSubject} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#111;">
          <h2 style="border-bottom:2px solid #7d6f4c;padding-bottom:8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${msgSubject}</p>
          <hr style="border-color:#e5e7eb;" />
          <p><strong>Message:</strong></p>
          <p style="background:#f9fafb;border-left:4px solid #7d6f4c;
                     padding:12px 16px;border-radius:0 6px 6px 0;white-space:pre-wrap;">
            ${message}
          </p>
        </div>
      `,
    });

    // B) Auto-reply → the VISITOR
    await transporter.sendMail({
      from: `"Ayyappan M" <${process.env.EMAIL_USER}>`,
      to: `"${name}" <${email}>`,
      subject: `Thank you for reaching out — ${name}`,
      html: autoReplyHtml(name, message),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent! A confirmation email is on its way to you.",
    });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}