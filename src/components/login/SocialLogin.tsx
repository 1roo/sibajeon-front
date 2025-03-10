import { useEffect } from "react";

const SOCIAL_LOGIN_CONFIG = {
  google: {
    authUrl: `https://accounts.google.com/o/oauth2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }&response_type=code&scope=email profile`,
    logo: "/social_logos/google_logo.png",
  },

  naver: {
    authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      import.meta.env.VITE_NAVER_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_NAVER_REDIRECT_URI
    }&state=STATE_STRING`,
    logo: "/social_logos/naver_logo.png",
  },
  kakao: {
    authUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    }&response_type=code`,
    logo: "/social_logos/kakao_logo.png",
  },
};

const SocialLogin = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client"; // Google OAuth 스크립트
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleSocialLogin = (provider: "google" | "naver" | "kakao") => {
    const loginPopup = window.open(
      SOCIAL_LOGIN_CONFIG[provider].authUrl,
      `${provider}Login`,
      "width=500,height=600"
    );

    if (!loginPopup) {
      console.error("팝업 창이 차단되었습니다.");
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {Object.keys(SOCIAL_LOGIN_CONFIG).map((provider) => (
        <img
          key={provider}
          src={
            SOCIAL_LOGIN_CONFIG[provider as "google" | "naver" | "kakao"].logo
          }
          alt={`${provider}_login`}
          style={{ width: "40px", cursor: "pointer" }}
          onClick={() =>
            handleSocialLogin(provider as "google" | "naver" | "kakao")
          }
        />
      ))}
    </div>
  );
};

export default SocialLogin;
