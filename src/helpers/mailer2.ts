import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(
                userId, 
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "abf0c8addaca11",
                pass: "526df70637ad4a"
            }
        });

        const mailOptions = {
            from: 'aakeshviswanathan@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p> Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail': 'forgotpassword'}?token=${hashedToken}"> here </a> to ${emailType === 'VERIFY' ? 'Verify your email': 'reset your password'} </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse
        
    } catch (error: any) {
        throw new Error(error?.message)
    }
}