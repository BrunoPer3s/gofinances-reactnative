import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card } from "../../components/Card";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  GreetingsText,
  NameText,
  Icon,
  CardsContainer,
  ListText,
  TrasanctionList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import { formatValueToCurrency } from "../../utils/formatValueToCurrency";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/UseAuth";

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction?: string;
}

interface HighlightCardData {
  incomeBalance: HighlightProps;
  outcomeBalance: HighlightProps;
  totalBalance: HighlightProps;
}



export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>(
    {} as HighlightCardData
  );

  const { data: user } = useAuth();
  const dataKey = `@gofinances:transactions_user:${user?.id}`;

  const { logOut, data } = useAuth();

  function getLastTransactionDate(collection: DataListProps[], type: 'income' | 'outcome'): string {
    const lastTransaction = Math.max.apply(Math, collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) =>
        new Date(transaction.date).getTime()
      ));

    const lastTransactionFormatted = format(
      new Date(lastTransaction), "' dia' dd 'de' MMMM", {
        locale: ptBR
      }
    );

    return lastTransactionFormatted;
  }

  async function getStoragedData() {
    const data = await AsyncStorage.getItem(dataKey);

    if(!data) {
      setIsLoading(false);
      return
    }

    const transactions = JSON.parse(data);

    /* const transactions = data ? JSON.parse(data) : [] */

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === "income") {
          incomeTotal += Number(transaction.amount);
        } else {
          outcomeTotal += Number(transaction.amount);
        }

        return {
          id: transaction.id,
          name: transaction.name,
          type: transaction.type,
          category: transaction.category,
          amount: Number(transaction.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          date: format(new Date(transaction.date), "dd'/'MM'/'uuuu"),
        };
      }
    );

    setTransactions(transactionsFormatted);

    const hasIncomeTransactions = transactions.some((transaction: DataListProps) => transaction.type === 'income');
    const hasOutcomeTransactions = transactions.some((transaction: DataListProps) => transaction.type === 'outcome');

    const lastTransactionIncome = hasIncomeTransactions 
      ? getLastTransactionDate(transactions, 'income') 
      : '';

    const lastTransactionOutcome = hasOutcomeTransactions 
      ? getLastTransactionDate(transactions, 'outcome')
      : '';
    
    const lastTransactionTotal = ``;
    console.log(lastTransactionIncome);
    console.log(lastTransactionOutcome);

    setHighlightCardData({
      incomeBalance: {
        amount: formatValueToCurrency(incomeTotal),
        lastTransaction: lastTransactionIncome
      },
      outcomeBalance: {
        amount: formatValueToCurrency(outcomeTotal),
        lastTransaction: lastTransactionOutcome
      },
      totalBalance: {
        amount: formatValueToCurrency(incomeTotal - outcomeTotal),
        lastTransaction: lastTransactionTotal
      },
    });
    setIsLoading(false);
  }

  /* seEffect(() => {
    getStoragedData()

    async function removeData () {
      await AsyncStorage.removeItem(dataKey);
    }

    removeData();
  }, []); */

  useFocusEffect(
    useCallback(() => {
      getStoragedData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: data?.photo,
                  }}
                />
                <GreetingsText>
                  Olá,{"\n"}
                  <NameText>{data?.name}</NameText>
                </GreetingsText>
              </UserInfo>
              <LogoutButton onPress={logOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <CardsContainer>
            <Card
              name="Entradas"
              type="income"
              amount={highlightCardData?.incomeBalance?.amount}
              lastTransactionDate={highlightCardData?.incomeBalance?.lastTransaction}
            />
            <Card
              name="Saídas"
              type="outcome"
              amount={highlightCardData?.outcomeBalance?.amount}
              lastTransactionDate={highlightCardData?.outcomeBalance?.lastTransaction}
            />
            <Card
              name="Total"
              type="total"
              amount={highlightCardData?.totalBalance?.amount}
              lastTransactionDate={highlightCardData?.totalBalance?.lastTransaction}
            />
          </CardsContainer>
          <ListText>Listagem</ListText>
          <TrasanctionList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          ></TrasanctionList>
        </>
      )}
    </Container>
  );
}
