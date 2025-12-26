function cesar(str, shift, action) {
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    
    if (action === 'decode') {
        shift = -shift;
    }
    
    shift = ((shift % alphabet.length) + alphabet.length) % alphabet.length;
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        let newChar = str[i];
        const upper = char !== str[i];
        
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            const newIndex = (index + shift) % 33;
            newChar = alphabet[newIndex];
            if(upper) newChar = newChar.toUpperCase();
        }
        
        result += newChar;
    }
    
    return result;
}


const encodedMessage = "эзтыхз фзъзъз";
const decodedMessage = cesar(encodedMessage, 8, 'decode');
console.log(decodedMessage);