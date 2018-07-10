//TODO: Create server to handle emails

// var nodemailer = require('nodemailer');
//
//  const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'dnbostest@gmail.com',
//     pass: 'DNBTester'
//   }
// });
//
// export async function sendJoinRequestMail(to, fromUser, project){
//   const mailOptions = {
//     from: 'dnbostest@gmail.com',
//     to,
//     subject: `${fromUser.firstname} ${fromUser.lastname} wants to join ${project.name}`,
//     html: `
//       <h1>${fromUser.firstname} ${fromUser.lastname} wants to join ${project.name}</h1>
//       <p>You can accept or reject by editing the project at <a href="http://localhost:3000/project/Ff7t9Un7xp3scwX70v14/${project.id}">http://localhost:3000/project/Ff7t9Un7xp3scwX70v14/${project.id}.</a></p>`
//   };
//
//   return transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       return Promise.reject(error)
//     } else {
//       console.log('Email sent: ' + info.response);
//       return Promise.resolve(info)
//     }
//   });
// }
