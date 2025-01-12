import imgRegister from "../../assets/register.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { passwordSchema } from "../../utils/schemas/yup.schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form/Form";
import { FormContainer, FormRow } from "../../components/Form/Form/Form.styled";
import PasswordInput from "../../components/Form/PasswordInput/PasswordInput";

type LoginType = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
};

const Register: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
    password: passwordSchema,
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginType) => {
    const newArr = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      password: data.password,
    };

    auth.handleRegister(newArr);
  };

  return (
    <FormContainer>
      <img src={imgRegister} alt="placeholder" />
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <h3>
            Already have an account?
            <a onClick={() => navigate(-1)}>Sign In</a>
          </h3>
          <Input
            label="Email address"
            error={errors.email?.message || null}
            type="text"
            placeholder="Your email address"
            id="email"
            register={register}
          />
          <PasswordInput
            placeholder="Password"
            register={register}
            error={errors.password?.message || null}
          />
          <FormRow>
            <Input
              label="First name"
              error={errors.first_name?.message || null}
              type="text"
              placeholder="First name"
              id="first_name"
              register={register}
            />
            <Input
              label="Last name"
              error={errors.last_name?.message || null}
              type="text"
              placeholder="Last name"
              id="last_name"
              register={register}
            />
          </FormRow>
          <Input
            label="Phone"
            error={errors.phone?.message || null}
            type="text"
            placeholder="Phone"
            id="phone"
            register={register}
          />
          <Button type="primary">Sign Up</Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Register;
