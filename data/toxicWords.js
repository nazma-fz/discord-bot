const toxicWords = [
    'what',
    'putu'
];

function checkToxicWords (message) {
    const content = message.toLowerCase();
    const words = content.split(' ');
    return words.some(word => toxicWords.includes(word));
}
module.exports = {checkToxicWords}