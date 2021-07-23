import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Main,
  CardsContainer,
  ChartContainer,
  NoDataText,
  MonthText,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
} from "./styles";

import { categories } from "../../utils/categories";
import { formatValueToCurrency } from "../../utils/formatValueToCurrency";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/esm/locale";
import { useAuth } from "../../hooks/UseAuth";

interface TrasactionData {
  type: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByUsedCategories, seTotalByUsedCategories] = useState<
    CategoryData[]
  >([]);
  const [hasData, setHasData] = useState(false);
  const { data } = useAuth();

  function handleDateChange(type: "next" | "prev") {
    if (type === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
      
    }
  }

  async function loadData() {
    const dataKey = `@gofinances:transactions_user:${data?.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    if (!response) {
      return;
    }

    setHasData(true);
    const responseFormatted = response ? JSON.parse(response) : [];

    const outcomeTransactions = responseFormatted.filter(
      (transaction: TrasactionData) => transaction.type === "outcome" &&
      new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
      new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );

    const outcomeTransactionsTotal = outcomeTransactions.reduce(
      (accumulator: number, transaction: TrasactionData) => {
        return accumulator + Number(transaction.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      outcomeTransactions.forEach((transaction: TrasactionData) => {
        if (category.key === transaction.category) {
          categorySum += Number(transaction.amount);
        }
      });

      const percent = (categorySum / outcomeTransactionsTotal) * 100;
      const percentFormatted = `${percent.toFixed(0)}%`;

      if (categorySum > 0) {
        totalByCategory.push({
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: formatValueToCurrency(categorySum),
          percent,
          percentFormatted,
        });
      }
    });

    seTotalByUsedCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );
  return (
    <Container>
      <Header title="Resumo por categoria" />
      <Main>
        {hasData ? (
          <>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange("prev")}>
                <MonthSelectIcon name="left" />
              </MonthSelectButton>

              <MonthText>{format(selectedDate, 'MMMM, yyyy', {
                locale: ptBR
              })}</MonthText>

              <MonthSelectButton onPress={() => handleDateChange("next")}>
                <MonthSelectIcon name="right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByUsedCategories}
                colorScale={totalByUsedCategories.map(
                  (category) => category.color
                )}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: "bold",
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={60}
                x="percentFormatted"
                y="total"
                height={RFValue(350)}
                width={RFValue(350)}
              />
            </ChartContainer>
            <CardsContainer>
              {totalByUsedCategories.map((category) => (
                <HistoryCard
                  key={category.name}
                  color={category.color}
                  title={category.name}
                  amount={category.totalFormatted}
                />
              ))}
            </CardsContainer>
          </>
        ) : (
          <NoDataText>Por favor realize uma transação</NoDataText>
        )}
      </Main>
    </Container>
  );
}
