import { NextResponse } from "next/server";
import { person } from "@/resources";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Simulation fallback if API key is not present in .env
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        simulation: true,
        message:
          "Message received in simulation mode. Define RESEND_API_KEY in .env to enable real email sending.",
      });
    }

    // Prepare HTML content for the notification email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #fafafa;">
        <h2 style="color: #049ee2; border-bottom: 2px solid #049ee2; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
        <p style="font-size: 16px; margin: 16px 0;"><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
        <p style="font-size: 16px; margin: 16px 0;"><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #049ee2; border-radius: 4px; font-style: italic;">
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #888888; margin-top: 30px; text-align: center; border-top: 1px solid #eaeaea; padding-top: 15px;">
          Sent from your Magic Portfolio Contact Form
        </p>
      </div>
    `;

    // Make native fetch call to Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Form <onboarding@resend.dev>",
        to: person.email,
        subject: `[Portfolio Contact] ${subject} - ${name}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email via Resend" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      simulation: false,
      messageId: data.id,
    });
  } catch (error: any) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
