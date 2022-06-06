const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function email(email, codigo) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'suporte.istudy@gmail.com', 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Verify-Email@iStudy.com', // sender address
    to: email, // list of receivers
    subject: "Verificação de Email ✔", // Subject line
    text: "Segue o código para a verificação:" + codigo, // plain text body
    html: `<b>Segue o Código para a verificação:</b><p>${codigo}</p>`, // html body
  });

}

module.exports = {
  email
}
