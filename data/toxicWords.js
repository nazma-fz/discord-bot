const toxicWords = [
    'memek', 'Memek', 'MEMEK',
    'what', 'What', 'WHAT',
    'putu', 'Putu', 'PUTU',
    'tolol', 'Tolol', 'TOLOL',
    'goblok', 'Goblok', 'GOBLOK',
    'anjing','Anjing','ANJING'
];

function checkToxicWords (message) {
    const content = message.toLowerCase();
    const words = content.split(' ');
    return words.some(word => toxicWords.includes(word));
}
module.exports = {checkToxicWords}