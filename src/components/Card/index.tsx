import React from 'react';
import { View } from 'react-native';

import {
  Container,
  Title,
  Icon,
  AmountText,
  LastTransactionText,
} from './styles';

interface CardProps {
  name: string;
  type: 'income' | 'outcome' | 'total';
  amount: string;
  lastTransactionDate?: string;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function Card ({ name, type, amount = "R$ 0.00", lastTransactionDate } : CardProps) {
  if (type === 'income' && !lastTransactionDate) {
    console.log('safgsadgdasgsagsdgsg')
  }
  return (
    <Container type={type}>
        <Title type={type}>{name}</Title>
        <Icon name={icon[type]} type={type}/>
        <View>
          <AmountText type={type}>{amount}</AmountText>
          <LastTransactionText type={type}>
            {type === 'income' && (
              lastTransactionDate ? `Última entrada foi${lastTransactionDate}` : 'Não há transações'
            ) }
             {type === 'outcome' && (
              lastTransactionDate ? `Última saída foi${lastTransactionDate}` : 'Não há transações'
            ) }
            {type === 'total' && ''}
          </LastTransactionText>
        </View>
    </Container>
  )
}