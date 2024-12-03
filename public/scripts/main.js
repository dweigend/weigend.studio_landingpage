/**
 * 🚀 weigend.studio 
 * 🎨 A minimalist terminal experience
 * 🌐 2024 David Weigend
 */
document.addEventListener('DOMContentLoaded', () => {
    // 🖥️ Terminal elements
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalPrompt = document.getElementById('terminal-prompt');
    
    // 📧 Email form elements
    const emailPopup = document.getElementById('emailPopup');
    const closePopup = document.getElementById('closePopup');
    const sendEmail = document.getElementById('sendEmail');
    const messageInput = document.getElementById('messageInput');
    const charCount = document.getElementById('charCount');

    // 🎨 ASCII art for weigend.studio
    // 🔗 Generated with: https://patorjk.com/software/taag/
    const asciiArt = `
██╗  ██╗██╗            ██╗ 
██║  ██║██║    ██╗     ╚██╗
███████║██║    ╚═╝█████╗██║
██╔══██║██║    ██╗╚════╝██║
██║  ██║██║    ╚═╝     ██╔╝
╚═╝  ╚═╝╚═╝            ╚═╝ 
`;

    // 📢 Status message element
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message';
    document.body.appendChild(statusMessage);

    // ⌨️ Keyboard shortcuts
    const shortcuts = {
        'x': () => window.open('https://twitter.com/weigend', '_blank'),
        'l': () => window.open('https://www.linkedin.com/in/david-weigend', '_blank'),
        'm': () => emailPopup.classList.add('active')
    };

    /**
     * 📝 Shows status message
     */
    const showStatus = (message, duration = 3000) => {
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, duration);
    };

    /**
     * ⌨️ Simulates typing text
     */
    const typeText = async (text, speed = 20, isAscii = false) => {
        const div = document.createElement('div');
        div.className = isAscii ? 'ascii-art' : 'terminal-text';
        terminalOutput.appendChild(div);
        
        for (let char of text) {
            div.textContent += char;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    };

    /**
     * 📝 Adds text to terminal
     */
    const addToTerminal = (text, isCommand = false, isAscii = false) => {
        const div = document.createElement('div');
        div.className = isAscii ? 'ascii-art' : 'terminal-text';
        if (isCommand) {
            div.textContent = '> ' + text;
        } else {
            div.textContent = text;
        }
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    /**
     * 🎬 Shows main content
     */
    const showMainContent = async () => {

        await typeText('[STATUS] Website under construction', 1);
        await typeText('');

        await typeText('[INFO] David Weigend - Futurist, Education Expert, and Designer. Based in Berlin, Germany', 1);
        await typeText('');

        await typeText('[CONTACT] To connect, please press...', 1);
        await typeText('  [X] for x', 1);
        await typeText('  [L] for LinkedIn', 1);
        await typeText('  [M] to send a Message', 1);
        await typeText('');
    };

    /**
     * 🎨 Startup animation sequence
     */
    const startupAnimation = async () => {
        // Clear terminal
        terminalOutput.innerHTML = '';
        
        // Show ASCII art with ultra-fast typing effect (1ms)
        await typeText(asciiArt + '\n\n', 1, true);
        
        // Show main content with ultra-fast typing animation
        await showMainContent();
    };

    // 📧 Email form functionality
    const updateCharCount = () => {
        const count = messageInput.value.length;
        charCount.textContent = `${count}/500`;
        if (count > 500) {
            messageInput.value = messageInput.value.substring(0, 500);
        }
    };

    const resetForm = () => {
        messageInput.value = '';
        charCount.textContent = '0/500';
        emailPopup.classList.remove('active');
    };

    const sendMessage = async () => {
        const message = messageInput.value.trim();
        if (!message) {
            showStatus('please enter a message');
            return;
        }

        try {
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                showStatus('message sent successfully');
                resetForm();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showStatus('error sending message. please try again');
            console.error('Error:', error);
        }
    };

    // 🎮 Event listeners
    messageInput.addEventListener('input', updateCharCount);
    closePopup.addEventListener('click', resetForm);
    emailPopup.addEventListener('click', (e) => {
        if (e.target === emailPopup) {
            resetForm();
        }
    });
    sendEmail.addEventListener('click', sendMessage);

    // Handle terminal input
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommand(terminalInput.value);
        }
    });

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only handle shortcuts when not typing in input fields
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA') {
            const key = e.key.toLowerCase();
            if (shortcuts[key]) {
                shortcuts[key]();
            }
        }
    });

    /**
     * 🎯 Handles command input
     */
    const handleCommand = (command) => {
        const cmd = command.toLowerCase().trim();
        
        if (shortcuts[cmd]) {
            shortcuts[cmd]();
        }

        // Clear input and scroll to bottom
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    // 🚀 Start animation sequence
    startupAnimation();
});
