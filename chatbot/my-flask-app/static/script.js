document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const newChatBtn = document.getElementById('new-chat-btn');
    const deleteChatBtn = document.getElementById('delete-chat-btn');
    const toggleBtn = document.getElementById('toggle-mode');
    const replySound = document.getElementById('replySound');

    // Load chat history on page load
    fetch('/history')
        .then(res => res.json())
        .then(history => {
            history.forEach(msg => addMessage(msg.role, msg.content));
            chatHistory.scrollTop = chatHistory.scrollHeight;
        });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        userInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        const loadingMsg = addMessage('assistant', 'AI is typing...');
        chatHistory.scrollTop = chatHistory.scrollHeight;

        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            await typeText(loadingMsg.querySelector('.message-content'), data.response);
            replySound.play();
        } catch (err) {
            loadingMsg.querySelector('.message-content').textContent = "Sorry, something went wrong.";
        }

        chatHistory.scrollTop = chatHistory.scrollHeight;
    });

    function addMessage(role, content) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = role === 'user' ? 'You' : 'AI';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(contentDiv);
        chatHistory.appendChild(msgDiv);
        return msgDiv;
    }

    async function typeText(element, text) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    }

    newChatBtn.addEventListener('click', async () => {
        await fetch('/clear_history', { method: 'POST' });
        chatHistory.innerHTML = '';
    });

    deleteChatBtn.addEventListener('click', async () => {
        await fetch('/delete_chat', { method: 'POST' });
        chatHistory.innerHTML = '';
    });

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggleBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
});
