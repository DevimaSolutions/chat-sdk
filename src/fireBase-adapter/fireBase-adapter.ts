import {
  IChatAdapterOptions,
  IFirebaseChatAdapter,
} from "../types/chat-adapter";

import ChatAdapter from "../chat-adapter/chat-adapter";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { ChatEventsNames } from "../constants";

export default class FireBaseAdapter
  extends ChatAdapter
  implements IFirebaseChatAdapter
{
  protected _fireBaseApp: FirebaseApp;

  protected _DbInstance: Database;

  constructor(options: IChatAdapterOptions) {
    super(options);
    this._fireBaseApp = initializeApp(this._options.config);
    this._DbInstance = getDatabase(this._fireBaseApp);
  }

  sendMessage(message: string): void {}
  getMessages(): string[] {
    return ["test"];
  }

  init(): void {
    const messagesRef = ref(
      this._DbInstance,
      'messages'
    );
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log('messages ===>', data);
      this._emitter.emit(ChatEventsNames.onMessageReceived, data)
    });
  }

  //   CreateUser(name: string): void {
  //     set(ref(this._DbInstance, "users/" + name), {
  //       username: name,
  //     });
  //   }

  //   ReadData(): void {
  //     const dbRef = ref(getDatabase());
  //     get(child(dbRef, `users/Arsen`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           console.log('Data =====', snapshot.val());
  //         } else {
  //           console.log("No data available");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
}
