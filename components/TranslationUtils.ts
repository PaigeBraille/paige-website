const translateUrl = 'https://www.paige.ninarimsky.com/translate';
const backtranslateUrl = 'https://www.paige.ninarimsky.com/backtranslate';

interface TranslationResult {
  braille: string;
}

interface BacktranslationResult {
  text: string;
}

// Function to translate ASCII Braille to print
export const translateToPrint = async (asciiBraille: string): Promise<string | null> => {
  const requestBody = {
    text: asciiBraille,
    tableList: ['en-ueb-g2.ctb']
  };

  try {
    const response = await fetch(translateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const result: TranslationResult = await response.json();
      return result.braille;
    } else {
      console.error('Translation failed:', response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error('Error during translation:', error.message);
    return null;
  }
};

// Function to backtranslate Braille to ASCII
export const backtranslateToASCII = async (braille: string): Promise<string | null> => {
  const requestBody = {
    braille: braille,
    tableList: ['en-us-g2.ctb']
  };

  try {
    const response = await fetch(backtranslateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const result: BacktranslationResult = await response.json();
      return result.text;
    } else {
      console.error('Backtranslation failed:', response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error('Error during backtranslation:', error.message);
    return null;
  }
};

