import { connectDB } from "@/lib/db";
import UserModel from "@/models/UserModel";

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

    // Extract the primary IP
    const userIp =
      req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip");
    if (!userIp) {
      return new Response(
        JSON.stringify({ success: false, message: "IP not found", chances: 0 }),
        { status: 400 }
      );
    }

    const primaryIp = userIp.split(",")[0].trim(); // Use only the first IP

    let user = await UserModel.findOne({ userIp: primaryIp });

    if (!user) {
      user = await UserModel.create({ userIp: primaryIp });
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
        message: "Limit exceeded. Access denied",
        chances: 0,
      }),
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
