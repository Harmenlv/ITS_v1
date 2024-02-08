// script.js

document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;

    try {
        const response = await axios.post('/generate-conversation', { prompt });
        const generatedConversation = response.data.generatedConversation;
        document.getElementById('output').innerText = generatedConversation;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

