class Chatroom {
    constructor(room, username){
      this.room = room;
      this.username = username;
      this.chats = db.collection('chats');
      this.unsub;
    }
    async addChat(message){
      // format a chat object
      const chat = {
        message: message,
        username: this.username,
        room: this.room,
      };
      // save the chat document
      const response = await this.chats.add(chat);
      return response;
    }
    getChats(callback){
      this.unsub = this.chats
        .where('room', '==', this.room)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
              callback(change.doc.data());
            }
          });
      });
    }
    updateName(username){
      this.username = username;
      localStorage.setItem("username", username);
    }
    updateRoom(room){
      this.room = room;
      console.log('room updated');
      if(this.unsub){
        this.unsub();
      }
    }
  }

  console.log(db)
