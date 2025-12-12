import nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcrypt from 'bcryptjs';

export const sendMail = async ({email , emailType , userID}: any)=>{
try {
    const hashToken = await bcrypt.hash(userID.toString(), 10);
  if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userID,{
        verifyToken : hashToken,
        verifyTokenExpiry : Date.now() + 3600000
    })
  }else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userID,{
        forgotPasswordToken : hashToken,
        forgotPasswordTokenExpiry : Date.now() + 3600000
    })
  }
  // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b5e9a9c2a1ec10",
    pass: "ed62cd935fb5ab"
  }
});
const sendmail = {
    from : 'eg@gmail.com'
    ,to : email,
    subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html : `<p>Click <a href="${process.env.DOMAIN}/verifiedEmail?token=${encodeURIComponent(hashToken)}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
}
    const mailResponse = await transport.sendMail(sendmail);
    return mailResponse;
} catch (error : any) {
    throw new Error(error.message);
}
}