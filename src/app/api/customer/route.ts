import { connectDB } from "@/lib/db";
import CustomerModel from "@/models/customer.model";

export async function GET() {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ success: true, message: "Customer port is working" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();

    const userIp =
      req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip");

    if (!userIp) {
      return new Response(
        JSON.stringify({ success: false, message: "IP not found", chances: 0 }),
        { status: 400 }
      );
    }

    let user = await CustomerModel.findOne({ ipAddress: userIp });

    if (!user) {
      user = await CustomerModel.create({ ipAddress: userIp });
      return new Response(
        JSON.stringify({
          success: true,
          message: `Remaining chances: ${user.chances}`,
          chances: user.chances,
        }),
        { status: 200 }
      );
    }

    if (user.isAdmin) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Admin access granted",
          chances: 1000,
        }),
        { status: 200 }
      );
    }

    if (user.chances > 0) {
      user.chances -= 1;
      await user.save();

      return new Response(
        JSON.stringify({
          success: true,
          message: `Remaining chances: ${user.chances}`,
          chances: user.chances,
        }),
        { status: 200 }
      );
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: "Limit exceeded. Access denied.",
        chances: 0,
      }),
      { status: 403 }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
