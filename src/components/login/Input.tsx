import styled from "styled-components";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  width: 200px;
  padding: 5px;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 5px;
  outline: 1px solid rgb(222, 222, 222);
  margin: 5px 0;
`;

export default Input;
