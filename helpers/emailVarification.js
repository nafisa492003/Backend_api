const nodemailer = require("nodemailer");
const emailVaraification= async (email ,otp)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "afifayesminnafisa@gmail.com",
          pass: "bgdo ryik fpgp lhkr",
        },
      });

      const info = await transporter.sendMail({
        from: '"AYN Shop 👻" <afifayesminnafisa@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world? Welcome to the AYN shopping world", // plain text body
        html: `<b> Welcome to the AYN shopping world . AYN shop is an ecommerce shop .Here is you OTP :${otp}</b>`, // html body
      });
      
}
module.exports=emailVaraification