import { ChatEventsNames } from "../constants";
import IChatAdapter, { IChatAdapterOptions } from "../types/chat-adapter";

import Emitter, { IEmitter } from "../emitter";

export default class ChatAdapter implements IChatAdapter {
  protected readonly _emitter: IEmitter;

  protected _isDisposed: boolean;

  protected readonly _options: Required<any>;

  constructor(options: IChatAdapterOptions) {
    this._emitter = new Emitter();
    this._isDisposed = false;
    this._options = options;
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.onMessageSent = this.onMessageSent.bind(this);
  }

  /**
   * @returns true if dispose method was called on this instance.
   */
  isDisposed(): boolean {
    return this._isDisposed;
  }

  getOptions(): any {
    return this._options;
  }

  protected _ensureInstanceNotDisposed() {
    if (this._isDisposed) {
      throw new Error("Instance was disposed");
    }
  }

  protected _emitEvents(...args: ChatEventsNames[]) {
    args.forEach((eventName) => {
      this._emitter.emit(eventName, this);
    });
  }

  /**
   * @description Removes all active event listeners on this object.
   * Instance should not be used after disposing!
   */
  dispose(): void {
    this._emitter.removeAllListeners();
    this._isDisposed = true;
  }

  protected _createSubscription<EventName extends ChatEventsNames>(
    eventName: EventName
  ) {
    this._ensureInstanceNotDisposed();

    return (callback: any): any => {
      this._emitter.addListener(eventName, callback);

      return () => {
        this._emitter.removeListener(eventName, callback);
      };
    };
  }

  onMessageReceived = this._createSubscription(
    ChatEventsNames.onMessageReceived
  ).bind(this);

  onMessageSent = this._createSubscription(ChatEventsNames.onMessageSent).bind(
    this
  );
}
