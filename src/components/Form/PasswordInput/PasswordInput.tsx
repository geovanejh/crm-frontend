import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordContainer, StyledPasswordInput } from "./PasswordInput.styled";
import { StyledError, StyledLabel } from "../Input/Input.styled";
import { TbAlertTriangle } from "react-icons/tb";

interface PasswordInputProps {
  placeholder: string;
  register: UseFormRegister<any>;
  error: string | null;
}
const PasswordInput = ({
  placeholder,
  register,
  error,
}: PasswordInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleShowPass = (): void => {
    setShowPass(!showPass);
  };

  return (
    <>
      <PasswordContainer>
        <StyledLabel error={error}>Password</StyledLabel>
        <div>
          <StyledPasswordInput
            error={error}
            type={showPass ? "text" : "password"}
            placeholder={placeholder}
            {...register("password")}
          />
          <>
            {showPass ? (
              <FaEye onClick={() => handleShowPass()} />
            ) : (
              <FaEyeSlash onClick={() => handleShowPass()} />
            )}
          </>
        </div>
      </PasswordContainer>
      {error && (
        <StyledError>
          <TbAlertTriangle />
          {error}
        </StyledError>
      )}
    </>
  );
};

export default PasswordInput;
