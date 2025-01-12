import { StyledForm } from "./Form.styled";

import { ReactNode } from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;
