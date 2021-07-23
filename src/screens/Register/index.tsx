import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from 'react-native-uuid';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from "../../components/Button";
import { CategorySelect } from "../../components/CategorySelect";
import { Header } from "../../components/Header";
import { InputForm } from "../../components/InputForm";
import { SelectCategoryModal } from "../SelectCategoryModal";

import {
  Container,
  Content,
  Box,
  Form
} from "./styles";
import { SubmitButton } from "../../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/UseAuth";

interface Category {
  key: string;
  name: string;
}

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O preço é obrigatório')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { data } = useAuth();
  const dataKey = `@gofinances:transactions_user:${data?.id}`;

  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const { control, reset ,handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data): [];

      const formattedData = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate('Listagem');

    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível salvar');
    }

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
        <Content>
          <Form>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <Box>
              <Button
                type="income"
                onPress={() => handleTransactionsTypeSelect("income")}
                isActived={transactionType === "income"}

              />
              <Button
                type="outcome"
                onPress={() => handleTransactionsTypeSelect("outcome")}
                isActived={transactionType === "outcome"}
              />
            </Box>
            <CategorySelect
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Form>
          <SubmitButton
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Content>
        <Modal visible={categoryModalOpen} statusBarTranslucent>
          <SelectCategoryModal
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
