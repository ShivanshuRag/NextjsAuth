import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import User from "@/models/usermodel"

interface EmailData {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string; 
}

export const sendEmail = async({email , emailType , userId}: EmailData)=>{
   try {
    
    const hashedToken = await bcrypt.hash(userId.toString() ,10);

      if( emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId ,
            {verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 3600000}
        )  

      }else if( emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000}
        )
      }


     const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e6199a0bca6320",
          pass: "f359aa00ef2592"
          //TODO: add these credentials to .env file
        }
      });

      const mailOptions = {
        from: 'hitesh@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
    }

    const mailresponse = await transport.sendMail
    (mailOptions);
    return mailresponse;

   } catch (error:unknown) {
    throw new Error((error as Error).message);
   }

}
