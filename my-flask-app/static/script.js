function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = userInput.value.trim();
    if (message === '') return;
    const userMsg = document.createElement('div');
    userMsg.textContent = 'You: ' + message;
    chatBox.appendChild(userMsg);
    userInput.value = '';
    // Simulate bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.textContent = 'Bot: ' + getBotResponse(message);
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

function getBotResponse(input) {
    const text = input.toLowerCase();
    // Greetings
    if (text.includes('hello') || text.includes('hi')) return 'Hello! How can I assist you today?';
    if (text.includes('bye') || text.includes('goodbye')) return 'Goodbye! Take care.';
    // Health issues
    if (text.includes('fever symptoms')) return 'Common fever symptoms include high temperature, chills, sweating, headache, muscle aches, and weakness.';
    if (text.includes('cold symptoms')) return 'Cold symptoms include sneezing, runny nose, sore throat, coughing, and mild fever.';
    if (text.includes('headache')) return 'Headaches can be caused by stress, dehydration, or illness. Rest and hydration may help.';
    if (text.includes('diabetes')) return 'Diabetes is a condition that affects blood sugar levels. Symptoms include frequent urination, increased thirst, and fatigue.';
    if (text.includes('blood pressure')) return 'High blood pressure can lead to serious health issues. Regular exercise and a healthy diet can help manage it.';
    // Cricket knowledge
    if (text.includes('cricket')) return 'Cricket is a popular sport played between two teams of eleven players. Ask me about rules, famous players, or records!';
    if (text.includes('virat kohli')) return 'Virat Kohli is a famous Indian cricketer known for his batting skills and leadership.';
    if (text.includes('sachin tendulkar')) return 'Sachin Tendulkar is regarded as one of the greatest batsmen in cricket history.';
    if (text.includes('ipl')) return 'The IPL (Indian Premier League) is a professional Twenty20 cricket league in India.';
    if (text.includes('world cup')) return 'The Cricket World Cup is an international championship of One Day International (ODI) cricket.';
    // Python Q&A
    if (text.includes('python')) {
        if (text.includes('what is python')) return 'Python is a popular, easy-to-learn programming language used for web development, data analysis, AI, and more.';
        if (text.includes('creator') || text.includes('who created')) return 'Python was created by Guido van Rossum and first released in 1991.';
        if (text.includes('latest version')) return 'The latest stable version of Python is Python 3.12 (as of 2025).';
        if (text.includes('uses')) return 'Python is used for web development, data science, machine learning, automation, scripting, and more.';
        if (text.includes('frameworks')) return 'Popular Python frameworks include Django, Flask, FastAPI, and Pyramid.';
        if (text.includes('libraries')) return 'Popular Python libraries include NumPy, Pandas, Matplotlib, TensorFlow, and Scikit-learn.';
        if (text.includes('variables')) return 'Variables in Python are created by assigning a value to a name, e.g., x = 5.';
        if (text.includes('data types')) return 'Python has several data types: int, float, str, list, tuple, dict, set, and bool.';
        if (text.includes('loops')) return 'Python supports for and while loops. Example: for i in range(5): print(i)';
        if (text.includes('functions')) return 'Functions in Python are defined using the def keyword. Example: def my_function(): ...';
        if (text.includes('install')) return 'You can install Python from python.org or use package managers like Anaconda.';
        return 'Ask me about Python basics, libraries, frameworks, or programming concepts!';
    }
    // C Language Q&A
    if (text.includes('c language') || text.includes('c programming') || text.includes('c ')) {
        if (text.includes('what is c')) return 'C is a powerful general-purpose programming language developed by Dennis Ritchie in 1972.';
        if (text.includes('creator') || text.includes('who created')) return 'C was created by Dennis Ritchie at Bell Labs.';
        if (text.includes('latest version')) return 'The latest standard of C is C18 (ISO/IEC 9899:2018).';
        if (text.includes('uses')) return 'C is widely used for system programming, operating systems, embedded systems, and high-performance applications.';
        if (text.includes('variables')) return 'Variables in C are declared with a type, e.g., int x = 5;';
        if (text.includes('data types')) return 'C has data types like int, float, double, char, and more.';
        if (text.includes('loops')) return 'C supports for, while, and do-while loops. Example: for(int i=0; i<5; i++) { printf("%d", i); }';
        if (text.includes('functions')) return 'Functions in C are defined with a return type, name, and parameters. Example: int add(int a, int b) { return a + b; }';
        if (text.includes('install')) return 'You can write and run C programs using compilers like GCC, Turbo C, or online IDEs.';
        if (text.includes('pointers')) return 'Pointers in C are variables that store memory addresses. Example: int *p = &x;';
        if (text.includes('arrays')) return 'Arrays in C are collections of elements of the same type. Example: int arr[5];';
        if (text.includes('structure')) return 'Structures in C are user-defined data types that group related variables. Example: struct Person { char name[20]; int age; };';
        return 'Ask me about C basics, variables, data types, loops, functions, pointers, or programming concepts!';
    }
    // Country Q&A
    if (text.includes('india')) return 'India is a country in South Asia, known for its rich culture, history, and diversity. Its capital is New Delhi.';
    if (text.includes('us') || text.includes('usa') || text.includes('united states')) return 'The United States of America (USA) is a country in North America, known for its technological advancements and diverse culture. Its capital is Washington, D.C.';
    if (text.includes('uk') || text.includes('united kingdom') || text.includes('england')) return 'The United Kingdom (UK) is a country in Europe, made up of England, Scotland, Wales, and Northern Ireland. Its capital is London.';
    // World Wars Q&A
    if (text.includes('world war 1') || text.includes('ww1')) return 'World War I (1914-1918) was a global conflict mainly centered in Europe, involving many world powers.';
    if (text.includes('world war 2') || text.includes('ww2')) return 'World War II (1939-1945) was a global war involving most of the world, including the Allies and Axis powers.';
    if (text.includes('world wars')) return 'There have been two major world wars: World War I (1914-1918) and World War II (1939-1945).';
    if (text.includes('your name')) return 'I am your AI Chatbot!';
    if (text.includes('how are you')) return 'I am just a bot, but I am here to help you!';
    if (text.includes('help')) return 'You can ask me about health issues, cricket, Python, C programming, countries, world wars, or general questions!';
    return "Sorry, I don't have an answer for that yet. Try asking something else!";
}

document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
});
