//Chatgpt, github Copilot used for coding, debugging, refactoring, and documentation.

const messages = {
    GREETING: 'Hello ',
    RESULT: ', What a beautiful day. Server current date and time is ',
    SERVERTIME: 'Server current date and time is: '
};

// ChatGPT was used to generate the following message
module.exports.greetMessage = function(name) {
    return `${messages.GREETING} ${name}${messages.RESULT}`;
};

module.exports.messages = messages;