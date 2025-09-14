const toggleBtn = document.getElementById("chatbotToggle");
const closeBtn = document.getElementById("chatbotClose");
const chatbot = document.getElementById("chatbot");

toggleBtn.addEventListener("click", () => {
  chatbot.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  chatbot.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendBtn = document.querySelector("#send-btn");
    const chatbotToggler = document.querySelector(".chatbot-toggler");

    const responses = {
        "hi": "Hi there! How can I assist you today?",
        "travel": "Looking for travel recommendations? Mpumalanga has incredible places to explore! What kind of adventure are you looking for?",
        "place": "Mpumalanga is known for breathtaking landscapes, wildlife, and rich history. Are you looking for nature, adventure, or cultural sites?",
        "expo": "This is the Travel Expo chatbot! Feel free to ask me anything about tourism in Mpumalanga.",
        "kruger": "Kruger National Park offers one of Africa’s best wildlife experiences! You can see the Big Five on a safari.",
        "blyde": "Blyde River Canyon is one of the largest green canyons in the world with incredible viewpoints like God's Window.",
        "sabie": "Sabie is famous for stunning waterfalls! Visit Lone Creek Falls or Bridal Veil Falls for breathtaking views.",
        "pilgrim": "Pilgrim’s Rest is a historic gold-mining town with fascinating heritage and charming buildings.",
        "scenery": "Mpumalanga has jaw-dropping landscapes! Check out Bourke’s Luck Potholes or enjoy panoramic views from God's Window.",
        "culture": "Mpumalanga’s culture is vibrant and diverse, from township tours to local crafts and music festivals.",
        "wildlife": "The Kruger National Park, Manyeleti Nature Reserve, and other parks are perfect for spotting wildlife.",
        "adventure": "Rock climbing, hiking, fly fishing, and river rafting—Mpumalanga has it all!",
        "default": "Sorry, I didn’t quite get that. Can you rephrase?"
    };

    async function fetchTourismInfo(query) {
        try {
            const response = await fetch(`https://www.mpumalanga.com/search?q=${query}`);
            const data = await response.json();
            return data.results[0]?.description || "I couldn’t find real-time information on that. Try asking about a specific place!";
        } catch (error) {
            return "Sorry, I couldn't fetch tourism information right now. Please try again later.";
        }
    }

    async function generateResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();

        for (const key in responses) {
            if (lowerCaseInput.includes(key)) {
                return responses[key];
            }
        }

        return await fetchTourismInfo(lowerCaseInput);
    }

    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
    });

    function appendMessage(sender, message) {
        const chatItem = document.createElement("li");
        chatItem.classList.add("chat", sender === "bot" ? "incoming" : "outgoing");
        chatItem.innerHTML = `<p>${message}</p>`;
        chatbox.appendChild(chatItem);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        appendMessage("user", userMessage);
        setTimeout(async () => {
            const botResponse = await generateResponse(userMessage);
            appendMessage("bot", botResponse);
        }, 600);

        chatInput.value = "";
    });

    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendBtn.click();
        }
    });
});

