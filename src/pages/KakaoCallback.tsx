import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      console.log("Kakao 로그인 코드:", code);

      // ✅ 부모 창으로 로그인 코드 전달
      window.opener.postMessage(
        { provider: "kakao", code },
        window.location.origin
      );

      // ✅ 현재 창 닫기
      window.close();
    }
  }, [code]);

  return <h2>로그인 중...</h2>;
};

export default KakaoCallback;
