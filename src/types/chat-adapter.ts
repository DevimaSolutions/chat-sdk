import { IFirebaseConfig } from "./config";

export interface IChatAdapterOptions {
  config: IFirebaseConfig;
}

export default interface IChatAdapter {
  /**
   * @description Removes all active event listeners on this object.
   * Remove response interceptor that refreshes token from axios instance.
   * Instance should not be used after disposing!
   */
  dispose(): void;

  /**
   * @returns true if dispose method was called on this instance.
   */
  isDisposed(): boolean;

  onMessageReceived(callback: any): any;
  onMessageSent(callback: any): any;
}


export interface IFirebaseChatAdapter extends IChatAdapter {
  sendMessage(message: string): void;
  getMessages(): string[];
}
