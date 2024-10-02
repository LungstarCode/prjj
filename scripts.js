let knowledgeBase;

async function loadKnowledgeBase() {
    try {
        const response = await fetch('knowledge.json');
        knowledgeBase = await response.json();
    } catch (error) {
        console.error('Error loading knowledge base:', error);
    }
}

// Function to determine the time of day
function getTimeBasedGreeting() {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
        return "Good morning! ";
    } else if (hours < 18) {
        return "Good afternoon! ";
    } else {
        return "Good evening! ";
    }
}

// Function to extract keywords and generate a response
function extractKeywords(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    let response = "";

    // Handle specific phrases
    if (/can i|is it possible/i.test(lowerCaseInput)) {
        response = "Yes, you can! Feel free to ask any questions or request further information.";
    } else if (/thank you|thanks/i.test(lowerCaseInput)) {
        response = "I was happy to help! Do you have any other questions, or would you like to know something else?";
    } else if (/no|bye/i.test(lowerCaseInput)) {
        response = "Bye! Have a great day!";
    } else {
        // Check greetings
        if (/hi|hello|hey/i.test(lowerCaseInput)) {
            response = getTimeBasedGreeting() + knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        } else {
            // Loop through knowledge base for other keywords
            for (const [key, value] of Object.entries(knowledgeBase)) {
                if (key !== "greetings" && value.keywords) {
                    for (const keyword of value.keywords) {
                        if (lowerCaseInput.includes(keyword.toLowerCase())) {
                            response = value.response;
                            break;
                        }
                    }
                }
                if (response) break; // Exit if we found a response
            }
        }
    }

    // If no specific response is found, use the unknown query response
    if (!response) {
        response = knowledgeBase.unknown_query.response + "\nSuggestions: " + knowledgeBase.unknown_query.suggestions.join(", ");
    }

    return response;
}

// Function to handle sending a message
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();

    if (userInput !== '') {
        displayMessage('User', userInput);
        const botResponse = extractKeywords(userInput);
        displayMessage('Bot', botResponse);
        document.getElementById('user-input').value = ''; // Clear the input field
    }
}

// Function to display a message in the chat box
function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender === 'Bot' ? 'bot-message' : 'user-message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Load the knowledge base on page load
window.onload = loadKnowledgeBase;
