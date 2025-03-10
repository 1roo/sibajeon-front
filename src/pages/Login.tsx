import { useEffect, useState } from "react";
import { login } from "../services/authService";
import Input from "../components/login/Input";
import Button from "../components/login/Button";
import { Container, ColumnFlex, RowFlex } from "../globalCss";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../components/login/SocialLogin";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { provider, code } = event.data;
      if (code) {
        console.log(`${provider} 로그인 성공! 받은 코드:`, code);

        // ✅ 백엔드로 `code`를 보내서 `access_token` 요청
        fetch(`http://localhost:5000/auth/${provider}/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(`${provider} 로그인 완료`, data);
            localStorage.setItem("token", data.access_token);
            navigate("/");
          })
          .catch((err) => console.error(`${provider} 로그인 실패`, err));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      alert("로그인 성공!");
    } else {
      alert("로그인 실패");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <ColumnFlex>
        <img src="/logo.png" style={{ width: "150px" }} alt="logo" />
        <h3 style={{ margin: "20px 0 10px" }}>SIGN IN</h3>
        <form onSubmit={handleSubmit}>
          <RowFlex>
            <ColumnFlex>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </ColumnFlex>
            <Button type="submit">로그인</Button>
          </RowFlex>
        </form>
        <RowFlex style={{ margin: "50px 0" }}>
          <SocialLogin />
        </RowFlex>
        <RowFlex>
          <span style={{ color: "#9B9B9B", fontSize: "13px" }}>
            아직 계정이 없으신가요?
          </span>
          <span
            style={{
              color: "#00478C",
              textDecoration: "underLine",
              fontSize: "15px",
              marginLeft: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleSignup}>
            회원가입
          </span>
        </RowFlex>
      </ColumnFlex>
    </Container>
  );
};

export default Login;
