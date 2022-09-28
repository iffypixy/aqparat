import * as React from "react";
import styled from "@emotion/styled";
import {useForm} from "react-hook-form";

import {authModel, AuthTemplate} from "@features/auth";
import {Button, H1, Input, Link} from "@shared/ui/atoms";
import {regex} from "@shared/lib/regex";
import {useDispatch} from "@shared/lib/store";

export const RegisterAsOrgPage: React.FC = () => {
  return (
    <AuthTemplate>
      <Wrapper>
        <H1>Sign up as organisation</H1>
        <RegisterForm />
        <Link to="/login">Log in</Link>

        <Link to="/register-as-volunteer">
          Are you a volunteer? Sign up as volunteer here
        </Link>
      </Wrapper>
    </AuthTemplate>
  );
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;

  & > :not(:first-child) {
    margin-top: 2rem;
  }
`;

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();

  const {handleSubmit, formState, register} = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const form = {
    email: register("email", {
      required: {
        value: true,
        message: "email is required",
      },
      pattern: {
        value: regex.email,
        message: "email is not valid",
      },
    }),
    name: register("name", {
      required: {
        value: true,
        message: "email is required",
      },
    }),
    password: register("password", {
      required: {
        value: true,
        message: "password is required",
      },
      minLength: {
        value: 8,
        message: "password must contain at least 8 characters",
      },
      maxLength: {
        value: 100,
        message: "password must not exceed 100 characters",
      },
    }),
  };

  const handleFormSubmit = (data: RegisterFormData) => {
    dispatch(authModel.actions.registerAsOrg(data));
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...form.name}
        type="text"
        placeholder="Astana Jastary"
        variant="flushed"
      />

      <Input
        {...form.email}
        type="email"
        placeholder="peter82@gmail.com"
        variant="flushed"
      />

      <Input
        {...form.password}
        type="password"
        placeholder="x x x x x x x"
        variant="flushed"
      />

      <Button type="submit" disabled={!formState.isValid}>
        Continue
      </Button>
    </Form>
  );
};

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > :not(:first-child) {
    margin-top: 3rem;
  }
`;
