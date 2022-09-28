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

export const MyOrganisations: React.FC = () => {
  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <Wrapper>
          <Heading as="h2" size="4x1" style={{fontSize: "3.4rem"}}>
            Organisations I am in
          </Heading>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th isNumeric>no. volunteers</Th>
                  <Th isNumeric>foundation date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>astana jastary</Td>
                  <Td>403</Td>
                  <Td isNumeric>12.04.2014</Td>
                </Tr>
                <Tr>
                  <Td>for jastar</Td>
                  <Td>254</Td>
                  <Td isNumeric>14.11.2018</Td>
                </Tr>
                <Tr>
                  <Td>volunteers</Td>
                  <Td>101</Td>
                  <Td isNumeric>01.12.2021</Td>
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

const TT = styled(Table)``;
