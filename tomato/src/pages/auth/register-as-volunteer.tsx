import * as React from "react";
import styled from "@emotion/styled";
import {useForm} from "react-hook-form";

import {authModel, AuthTemplate} from "@features/auth";
import {Button, H1, Input, Link} from "@shared/ui/atoms";
import {regex} from "@shared/lib/regex";
import {useDispatch} from "@shared/lib/store";

export const RegisterAsVolunteerPage: React.FC = () => {
  return (
    <AuthTemplate>
      <Wrapper>
        <H1>Sign up as volunteer</H1>
        <RegisterForm />
        <Link to="/login">Log in</Link>

        <Link to="/register-as-org">
          Are you an organisation? Sign up as organisation here
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
  firstName: string;
  lastName: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();

  const {handleSubmit, formState, register} = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
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
    firstName: register("firstName", {
      required: {
        value: true,
        message: "first name is required",
      },
    }),
    lastName: register("lastName", {
      required: {
        value: true,
        message: "last name is required",
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
    dispatch(authModel.actions.registerAsVolunteer(data));
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...form.email}
        type="email"
        placeholder="peter82@gmail.com"
        variant="flushed"
      />

      <Input
        {...form.firstName}
        type="text"
        placeholder="Peter"
        variant="flushed"
      />

      <Input
        {...form.lastName}
        type="text"
        placeholder="Johnson"
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
