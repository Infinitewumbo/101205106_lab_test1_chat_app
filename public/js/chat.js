const socket = io();

// Get User and Room from LocalStorage (saved during Login)
const username = localStorage.getItem('username');
const room = localStorage.getItem('room');

// Redirect to login if no session found
if (!username || !room) {
    window.location.href = 'login.html';
}

const chatBox = $('#chatBox');
const msgInput = $('#msgInput');
const sendBtn = $('#sendBtn');
const roomName = $('#roomName');
const sidebarRoomName = $('#sidebarRoomName');
const typingIndicator = $('#typingIndicator');
const leaveBtn = $('#leaveBtn');

// 1. Join Room
socket.emit('joinRoom', { username, room });
roomName.text(room);
sidebarRoomName.text(room);

// 2. Listen for Messages
socket.on('message', (data) => {
    appendMessage(data);
    chatBox.scrollTop(chatBox[0].scrollHeight);
});

// 3. Listen for Typing
socket.on('typing', (data) => {
    typingIndicator.text(data);
    setTimeout(() => typingIndicator.text(''), 3000);
});

// 4. Send Message
sendBtn.click(sendMessage);

// Allow pressing "Enter" to send
msgInput.keypress((e) => {
    if (e.which === 13) sendMessage();
});

// Typing Event
msgInput.on('input', () => {
    socket.emit('typing', { username, room });
});

// 5. Leave Room
leaveBtn.click(() => {
    const confirmLeave = confirm("Are you sure you want to leave the chat?");
    if (confirmLeave) {
        socket.emit('leaveRoom', { username, room });
        localStorage.removeItem('room'); 
        window.location.href = 'login.html';
    }
});


function sendMessage() {
    const message = msgInput.val().trim();
    if (message) {
        // Emit to server
        socket.emit('chatMessage', { from_user: username, room, message });
        msgInput.val(''); // Clear input
    }
}

function appendMessage(data) {
    const isMe = data.from_user === username;
    const isSystem = data.from_user === 'System';

    let msgHTML;

    if (isSystem) {
        // System Message (Join/Leave)
        msgHTML = `
            <div class="flex justify-center my-2">
                <span class="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    ${data.message}
                </span>
            </div>`;
    } else {
        // User Message
        msgHTML = `
            <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4">
                <span class="text-xs text-gray-500 dark:text-gray-400 mb-1">${data.from_user}</span>
                <div class="px-4 py-2 rounded-lg max-w-xs shadow-md 
                    ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'}">
                    ${data.message}
                </div>
            </div>`;
    }

    chatBox.append(msgHTML);
}