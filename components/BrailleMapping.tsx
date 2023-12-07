
// BrailleMapping.tsx 

type BrailleMapping = {
    [key: string]: {
      braille: string;
    };
};

// Initialize and declare the ASCII to Braille map
const asciiBraille: BrailleMapping = {
    ' ': { braille: "⠀" },
    '!': { braille: "⠮" },
    '"': { braille: "⠐" },
    '#': { braille: "⠼" },
    '$': { braille: "⠫" },
    '%': { braille: "⠩" },
    '&': { braille: "⠯" },
    '\'': { braille: "⠄" },
    '(': { braille: "⠷" },
    ')': { braille: "⠾" },
    '*': { braille: "⠡" },
    '+': { braille: "⠬" },
    ',': { braille: "⠠" },
    '-': { braille: "⠤" },
    '.': { braille: "⠨" },
    '/': { braille: "⠌" },
    '0': { braille: "⠴" },
    '1': { braille: "⠂" },
    '2': { braille: "⠆" },
    '3': { braille: "⠒" },
    '4': { braille: "⠲" },
    '5': { braille: "⠢" },
    '6': { braille: "⠖" },
    '7': { braille: "⠶" },
    '8': { braille: "⠦" },
    '9': { braille: "⠔" },
    ':': { braille: "⠱" },
    ';': { braille: "⠰" },
    '<': { braille: "⠣" },
    '=': { braille: "⠿" },
    '>': { braille: "⠜" },
    '?': { braille: "⠹" },
    '@': { braille: "⠈" },
    'a': { braille: "⠁" },
    'b': { braille: "⠃" },
    'c': { braille: "⠉" },
    'd': { braille: "⠙" },
    'e': { braille: "⠑" },
    'f': { braille: "⠋" },
    'g': { braille: "⠛" },
    'h': { braille: "⠓" },
    'i': { braille: "⠊" },
    'j': { braille: "⠚" },
    'k': { braille: "⠅" },
    'l': { braille: "⠇" },
    'm': { braille: "⠍" },
    'n': { braille: "⠝" },
    'o': { braille: "⠕" },
    'p': { braille: "⠏" },
    'q': { braille: "⠟" },
    'r': { braille: "⠗" },
    's': { braille: "⠎" },
    't': { braille: "⠞" },
    'u': { braille: "⠥" },
    'v': { braille: "⠧" },
    'w': { braille: "⠺" },
    'x': { braille: "⠭" },
    'y': { braille: "⠽" },
    'z': { braille: "⠵" },
    '[': { braille: "⠪" },
    '\\': { braille: "⠳" },
    ']': { braille: "⠻" },
    '^': { braille: "⠘" },
    '_': { braille: "⠸" },
};

export default asciiBraille;