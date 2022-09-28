export const a = 1;
import {
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import * as React from "react";

export const MyVolunteers: React.FC = () => {
  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <Wrapper>
          <Heading as="h2" size="4x1" style={{fontSize: "3.4rem"}}>
            Volunteers in my organisation
          </Heading>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th isNumeric>birth date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Imanali Rakhimzhanov</Td>
                  <Td isNumeric>12.04.2004</Td>
                </Tr>
                <Tr>
                  <Td>Aibar Kasengazy</Td>
                  <Td isNumeric>14.11.2008</Td>
                </Tr>
                <Tr>
                  <Td>Asanali Amantaev</Td>
                  <Td isNumeric>01.12.2001</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
    </Template.Main>
  );
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5rem;

  & > :not(:first-child) {
    margin-top: 5rem;
  }
`;

const List = styled("div")`
  & > :not(:first-child) {
    margin-top: 1rem;
  }
`;
