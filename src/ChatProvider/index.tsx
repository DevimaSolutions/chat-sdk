import FireBaseAdapter from "../fireBase-adapter";
import { IFirebaseConfig } from "../types/config";
import React, { createContext, useContext, useMemo } from "react";

interface IDetailedArtworkProps {
  sendMessageProvider(message: string): void;
}

interface ProviderProps {
  children: React.ReactNode;
  config: IFirebaseConfig;
  provider: "firebase" | "websocket";
}

export const ChatContext = createContext<IDetailedArtworkProps>({
  sendMessageProvider: () => {},
});

const adapterImplementationMap = {
  firebase: FireBaseAdapter,
  websocket: FireBaseAdapter,
};

export const ChatProvider = ({ children, config, provider }: ProviderProps) => {
  const chatAdapter = useMemo(() => {
    const Adapter = adapterImplementationMap[provider];
    return new Adapter({ config });
  }, [provider, config]);

  const sendMessageProvider = (message: string) => {
    chatAdapter.sendMessage(message);
  };

  return (
    <ChatContext.Provider value={{ sendMessageProvider }}>
      {children}
    </ChatContext.Provider>
  );
};

export const usePageDetailedArtwork = () => {
  return useContext(ChatContext);
};

export default usePageDetailedArtwork;
