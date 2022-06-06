import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_MAIL,
        pass: process.env.SERVER_PASS
    }
});

export function confirmRegistrationLetter(email) {
    const url = process.env.URL + `/confirm?token=${email.substring(0, email.lastIndexOf("@"))}`
    const mailOptions = {
        from: 'no-reply@telegram-clone',
        to: email,
        subject: 'Email confirmation',
        text: `Confirm email by visiting link:   ${url}`
    };
    transport.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }
        else{   
            console.log('success');        
        }
    });
}