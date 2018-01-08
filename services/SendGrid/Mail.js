
class Mail{
    constructor(survey){
        const { title, subject, body, recipients } = survey;
        this.title = title;
        this.subject = subject;
        this.body = body;
        this.recipients = recipients;

        this.html = `
        <div>
            <p>
                ${body}
            </p>
        </div>
        <div>
            <a clicktracking=on href="http://localhost:3000">Yes</a>
            <a clicktracking=on href="http://localhost:3000">No</a>
        </div>
        `

    }
    
}

module.exports = Mail;