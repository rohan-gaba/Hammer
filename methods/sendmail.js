const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect("183b6479bf7850ffa233b155cf7dd466","9247399e7166b4e463f6ab3cd47e2161")
 
module.exports= function send_mail(mail,name,subject,text,callback)
{
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'tushar.gandhi0092@gmail.com',
          Name: 'Tushar Gandhi',
        },
        To: [
          {
            Email: mail,
            Name: name,
          },
        ],
        Subject: subject,
        TextPart: "Dear "+name+", please verify Your mail by clicking the following button",
        HTMLPart: text
      },
    ],
  })
  request
    .then(result => {
      callback(null,result.body);
    })
    .catch(err => {
      console.log(err);
      callback(err,null)
    })
}