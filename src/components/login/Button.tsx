import styled from "styled-components";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 40px;
  height: 85px;
  font-weight: bold;
  padding: 0 10px;
  background-color: #1b8eec;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  align-self: center;
`;

export default Button;
