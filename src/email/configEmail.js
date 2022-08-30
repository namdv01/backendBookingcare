const nodemailr = require("nodemailer");
const dotenv = require("dotenv").config();

const configMail = async (receiveMail) => {
  let transport = nodemailr.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transport.sendMail({
    from: '"Bookingcare 👻" <khonghoatay@gmail.com>',
    to: receiveMail.mail,
    subject: receiveMail.subject,
    html: `
    <h3>Xin chào ${receiveMail.content.fullName}</h3>
    <p>${receiveMail.reasonReceiveMail}</p>
    <p>${receiveMail.infoSchedule}</p>
    <p>${receiveMail.titleDoctor}${receiveMail.doctor}</p>
    <p>${receiveMail.timeTitle} ${receiveMail.content.time}</p>
    <p>${receiveMail.clinic}${receiveMail.content.nameClinic} tại địa chỉ ${receiveMail.content.addressClinic}</p>
    <p>${receiveMail.confirmTrue}</p>
    <div>
      <a href="${receiveMail.content.redirectLink}" target="_blank">Click here</a>
    </div>
    `,
  });
};

module.exports = configMail;
