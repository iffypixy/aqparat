import * as React from "react";
import styled from "@emotion/styled";
import {useForm} from "react-hook-form";
import {Heading, Select} from "@chakra-ui/react";

import {authModel, AuthTemplate} from "@features/auth";
import {Input, Link, Button} from "@shared/ui/atoms";
import {useDispatch} from "@shared/lib/store";
import {regex} from "@shared/lib/regex";
import {UserType} from "@entities/user";

export const LoginPage: React.FC = () => {
  return (
    <AuthTemplate>
      <Wrapper>
        <Heading as="h1" size="4x1">
          Sign in
        </Heading>

        <LoginForm />

        <Link to="/register-as-volunteer">Create account as volunteer</Link>
        <Link to="/register-as-org">Create account as organisation</Link>
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

interface LoginFormData {
  email: string;
  password: string;
  type: UserType;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const {handleSubmit, formState, register} = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
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
    type: register("type", {
      required: {
        value: true,
        message: "log in as whom?",
      },
    }),
  };

  const handleFormSubmit = (data: LoginFormData) => {
    dispatch(authModel.actions.login(data));
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
        {...form.password}
        type="password"
        placeholder="x x x x x x x"
        variant="flushed"
      />

      <Choice {...form.type} placeholder="Log in as">
        <option value="volunteer">Volunteer</option>
        <option value="organisation">Organisation</option>
      </Choice>

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

const Choice = styled(Select)`
  font-weight: 500;
  font-size: 1.6rem;
  height: auto;
  padding: 1.5rem;
`;
