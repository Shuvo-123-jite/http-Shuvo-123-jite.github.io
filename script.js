
async function searchWord() {
    const word = document.getElementById('wordInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Loading...</p>';
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error('Word not found');
        const data = await res.json();
        const definition = data[0].meanings[0].definitions[0].definition;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        const example = data[0].meanings[0].definitions[0].example || "No example available";
        const phonetic = data[0].phonetic || "No phonetic available";

        resultDiv.innerHTML = `
            <h2>${word}</h2>
            <p><strong>Phonetic:</strong> ${phonetic}</p>
            <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
            <p><strong>Definition:</strong> ${definition}</p>
            <p><strong>Example:</strong> ${example}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, we couldn't find that word.</p>`;
    }
}
