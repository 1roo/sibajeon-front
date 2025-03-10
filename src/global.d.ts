declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: { theme: string; size: string }
          ) => void;
          prompt: () => void;
        };
      };
    };

    naver: {
      LoginWithNaverId: new (options: {
        clientId: string;
        callbackUrl: string;
        isPopup: boolean;
        loginButton: { color: string; type: number; height: number };
      }) => {
        init: () => void;
        authorize: () => void;
      };
    };

    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

export {};
