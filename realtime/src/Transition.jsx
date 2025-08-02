import React, { useState } from 'react';

const TranslationTool = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

    // Function to handle text input change
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // Function to handle language selection change
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    // Function to handle translation
    const translateText = async () => {
        try {
            const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_GOOGLE_TRANSLATION_API_KEY',
                },
                body: JSON.stringify({
                    q: inputText,
                    source: 'en', // Source language (English)
                    target: selectedLanguage, // Target language selected by the user
                    format: 'text',
                }),
            });

            const data = await response.json();
            setTranslatedText(data.data.translations[0].translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    return (
        <div>
            <h1>Real-time Language Translation Tool</h1>
            <div>
                <label htmlFor="inputText">Enter Text:</label>
                <textarea id="inputText" value={inputText} onChange={handleInputChange}></textarea>
            </div>
            <div>
                <label htmlFor="selectLanguage">Select Language:</label>
                <select id="selectLanguage" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    {/* Add more languages as needed */}
                </select>
            </div>
            <button onClick={translateText}>Translate</button>
            <div>
                <h2>Translated Text:</h2>
                <p>{translatedText}</p>
            </div>
        </div>
    );
};

export default TranslationTool;
