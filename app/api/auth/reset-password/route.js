import prisma from "../../../lib/prisma";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../../../lib/email";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email } = await req.json();
  console.log("Email enviat", email);

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    console.log("Usuari trobat", user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    // token expira en 1 hora
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    await prisma.passwordResetToken.create({
      data: {
        token,
        expiresAt: tokenExpiration,
        userId: user.id,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    await sendResetPasswordEmail(email, resetUrl);

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send reset email" }, { status: 500 });
  }
};

export const PUT = async (req) => {
  const { token, password } = await req.json();
  console.log("Token enviat", token);
  console.log("Password env", password)
  if (!token || !password) {
    return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    console.log(resetToken)
    // s'ha de comprovar si aixo funciona
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to reset password" }, { status: 500 });
  }
};

