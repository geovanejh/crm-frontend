import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import imgLogin from "../../assets/login.jpg";
import { useAuth } from "../../context/AuthContext";
import { passwordSchema } from "../../utils/schemas/yup.schemas";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/Form/PasswordInput/PasswordInput";
import Input from "../../components/Form/Input/Input";
import Form from "../../components/Form/Form/Form";
import { FormContainer } from "../../components/Form/Form/Form.styled";

type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean | undefined;
};

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
    password: passwordSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginType) => {
    auth.handleLogin(data);
  };

  return (
    <FormContainer>
      <img src={imgLogin} alt="placeholder" />
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign in</h1>
          <h3>
            Don't have an account?
            <a onClick={() => navigate("/register")}>Sign Up</a>
          </h3>
          <Input
            label="Email address"
            error={errors.email?.message || null}
            type="text"
            placeholder="Email address"
            id="email"
            register={register}
          />
          <PasswordInput
            placeholder="Password"
            register={register}
            error={errors.password?.message || null}
          />
          <a>Forgot password?</a>
          <Button type="primary">Sign in</Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Login;
