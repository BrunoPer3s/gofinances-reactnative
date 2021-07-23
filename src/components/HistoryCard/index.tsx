import React from 'react';
import {
  Container,
  Title,
  StyledView,
  Box,
  Amount,
} from './styles';

interface HistoryCardProps {
  title: string 
  color: string 
  amount: string;
}

export function HistoryCard ({title, color, amount} :HistoryCardProps) {
  return (
    <Container>
      <Box>
        <StyledView color={color}/>
        <Title>{title}</Title>
      </Box>
      <Amount>{amount}</Amount>
    </Container>
  )
}