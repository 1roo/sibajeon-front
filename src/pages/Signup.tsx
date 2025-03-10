import { ColumnFlex, Container, RowFlex } from "../globalCss";

export default function Signup() {
  const handleSubmit = () => {};
  return (
    <Container>
      <ColumnFlex>
        <p>시바전의 회원이 되어주세요</p>
        <form onSubmit={handleSubmit}></form>
        <RowFlex>
          <span>이메일</span>
        </RowFlex>
      </ColumnFlex>
    </Container>
  );
}
