import React from "react";
import { View } from "react-native";
import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Amount,
  Box,
  TypeText,
  Icon,
  Date,
  TypeContainer,
} from "./styles";


export interface TransactionCardData {
  name: string;
  type: "income" | "outcome";
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const category = categories.filter(
    category => category.key === data.category
  )[0];

  return (
    <Container>
      <View>
        <Title>{data.name}</Title>
        <Amount type={data.type}>
          {data.type === "outcome" && "- "}{data.amount}
        </Amount>
      </View>
      <Box>
        <TypeContainer>
          <Icon name={category.icon} />
          <TypeText>{category.name}</TypeText>
        </TypeContainer>
        <Date>{data.date}</Date>
      </Box>
    </Container>
  );
}
