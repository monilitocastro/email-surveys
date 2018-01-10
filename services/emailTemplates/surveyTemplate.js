const keys = require('../../config/keys');
module.exports = (survey) => {
    return `
        <div>
            <h1>${survey.title}</h1>
            <p>${survey.body}</p>
            <div style='text-align: center;'>
                <a href='${keys.redirectURL}/api/surveys/reply'>Yes</a>
                <a href='${keys.redirectURL}/api/surveys/reply'>No</a>
            </div>
        </div>
    `
}