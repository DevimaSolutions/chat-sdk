import ChatManager from "./chat-adapter";



const config = {
  apiKey: "AIzaSyBtuhnlTWFdiP16qQzrvwTmz-0r0zxzLXU",
  authDomain: "fir-chat-8cdb3.firebaseapp.com",
  databaseURL: "https://fir-chat-8cdb3-default-rtdb.firebaseio.com",
  projectId: "fir-chat-8cdb3",
  storageBucket: "fir-chat-8cdb3.appspot.com",
  messagingSenderId: "572638199503",
  appId: "1:572638199503:web:1c5ffbcd78d76fed74c1ba",
  measurementId: "G-5EKRTJHXYR",
};

describe("ChatManager", () => {
  test("options", () => {
    const manager = new ChatManager({ config });
    console.log('options ====>>>  ', manager.getOptions());
  });

});
