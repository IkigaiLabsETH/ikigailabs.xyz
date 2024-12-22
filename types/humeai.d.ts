declare module '@humeai/voice-react' {
  import { FC } from 'react'

  interface VoiceProviderProps {
    auth: {
      type: "accessToken";
      value: string;
    };
    configId: string;
    onToolCall: (message: any) => void;
    children: React.ReactNode;
  }

  export const VoiceProvider: FC<VoiceProviderProps>
}
