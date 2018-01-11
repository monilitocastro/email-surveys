const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmails(emails){
    // const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const emailList = emails.split(',');
    const trimmed = emailList.map( email => email.trim() );
    const unrecognizeable = trimmed.filter( (email) => {
        const test = re.test(email);
        if(!test){
            return email;
        }
    });
    return unrecognizeable;
}

export default validateEmails;