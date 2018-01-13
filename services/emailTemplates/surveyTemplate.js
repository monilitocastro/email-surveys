const keys = require('../../config/keys');
module.exports = (survey) => {
    return `
        <div>
            <h1>${survey.title}</h1>
            <p>${survey.body}</p>
            <div style='text-align: center;'>
                <a href='${keys.redirectURL}/api/${survey.id}/yes'>Yes</a>
                <a href='${keys.redirectURL}/api/${survey.id}/no'>No</a>
            </div>
        </div>
    `
}