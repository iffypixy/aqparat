import * as React from "react";
import styled from "@emotion/styled";
import {useForm} from "react-hook-form";

import {authModel, AuthTemplate} from "@features/auth";
import {Button, Input, Link} from "@shared/ui/atoms";
import {regex} from "@shared/lib/regex";
import {useDispatch} from "@shared/lib/store";
import {VStack} from "@chakra-ui/react";

export const RegisterAsOrgPage: React.FC = () => {
  return (
    <AuthTemplate>
      <Wrapper>
        <Title>Sign up as organisation</Title>
        <RegisterForm />

        <VStack>
          <RegisterLink to="/login">Log in</RegisterLink>

          <RegisterLink to="/register-as-volunteer">
            Are you a volunteer? Sign up as volunteer here
          </RegisterLink>
        </VStack>
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

const Title = styled("h1")`
  color: #2d2d2d;
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const RegisterLink = styled(Link)`
  font-size: 1.4rem;
  text-decoration: underline;
  text-transform: uppercase;
  opacity: 0.65;
`;

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  date: number;
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
    date: register("date", {
      required: {
        value: true,
        message: "date is required",
      },
    }),
  };

  const handleFormSubmit = (data: RegisterFormData) => {
    dispatch(
      authModel.actions.registerAsOrg({
        ...data,
        date: new Date((data as any).date),
      } as any),
    );
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

      <Input
        {...form.date}
        type="number"
        min="1990"
        max="2022"
        step="1"
        variant="flushed"
        placeholder="Foundation year"
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
