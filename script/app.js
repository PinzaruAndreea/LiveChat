// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector(".form")
const newNameForm = document.querySelector(".updatemsg")
const updateMsg = document.querySelector(".update-msg")
const rooms = document.querySelector(".chat-rooms")

// add a new chat
newChatForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
})

// update username
newNameForm.addEventListener("submit", e=> {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show then hide the update message
    updateMsg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMsg.innerText =``, 3000);
});

//update the chat room
rooms.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChats( chat => chatUI.render(chat));
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : "anon";


// class instances
const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(chatList);


// get chats & render
chatroom.getChats(data => chatUI.render(data));


console.log(chatUI);