const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Mailer{
    constructor( mail, recipientsList){
        this.mail = mail;
        this.recipientsList = recipientsList;
    }
    send(){
        const { subject, html } = this.mail;
        console.log('RECIP', this.recipientsList, subject, html)
        const msg = {
            to: this.recipientsList,
            from: 'no-reply@surveyblast.com',
            subject,
            html
          };
        let response = '';
        sgMail.sendMultiple(msg)
        .then(
            res => {
                response = res;
            }
        )
        .catch(
            console.error
        )
        return response;
    }
    async sendMultiple(msg){
        const response = await sgMail.sendMultiple(msg);
        console.log('SENDMULTIPLE RESPONSE: ', response);
        return response;
    }
}

module.exports = Mailer;