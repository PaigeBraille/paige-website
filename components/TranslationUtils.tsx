const translateUrl = "https://www.paige.ninarimsky.com/translate";
const backtranslateUrl = "https://www.paige.ninarimsky.com/backtranslate";

interface TranslationResult {
  braille: string;
}

interface BacktranslationResult {
  text: string;
}

export const translate = async (
  asciiBraille: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    text: asciiBraille,
    tableList: [tableName],
  };

  try {
    const response = await fetch(translateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: TranslationResult = await response.json();
      return result.braille;
    } else {
      console.error("Translation failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during translation:", error.message);
    return null;
  }
};

export const backtranslate = async (
  braille: string,
  tableName: string,
): Promise<string | null> => {
  const requestBody = {
    braille: braille,
    tableList: [tableName],
  };

  try {
    const response = await fetch(backtranslateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result: BacktranslationResult = await response.json();
      return result.text;
    } else {
      console.error("Backtranslation failed:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Error during backtranslation:", error.message);
    return null;
  }
};

export const backTranslateAndUpdate = async (
  inputText: string,
  selectedTable: string,
  setPrintText: React.Dispatch<React.SetStateAction<string>>,
  setSpokenFeedback: React.Dispatch<React.SetStateAction<string>> | null,
) => {
  try {
    const lines = inputText.split("\n");

    // Translate each line independently
    const translatedLines = await Promise.all(
      lines.map(async (line) => {
        return await backtranslate(line, selectedTable);
      }),
    );

    // Join the translated lines back together
    const translation = translatedLines.join("\n");
    console.log(translation);
    // Replace characters between "\ and /" with their Unicode representations
    const sanitizedText = translation.replace(/\\(.*?)\//g, " ");
    setPrintText(sanitizedText);
    // Conditionally set setSpokenFeedback if it is not null
    const words = sanitizedText.split(/[ \n]+/);
    if (setSpokenFeedback !== null) {
      setSpokenFeedback(words[words.length - 2]);
    }
  } catch (error) {
    console.error("Error during translation:", error);
    console.log("Fail");
  }
};
