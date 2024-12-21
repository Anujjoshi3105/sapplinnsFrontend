import { sendToAdmin, sendToUser, transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    await Promise.all([
      transporter.sendMail(sendToAdmin(name, email, message)),
      transporter.sendMail(sendToUser(name, email)),
    ]);
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ url: process.env.ADMIN_MAIL }, { status: 500 });
  }
}
