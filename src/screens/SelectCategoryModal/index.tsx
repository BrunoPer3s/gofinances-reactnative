import React, { useState } from "react";
import { FlatList } from "react-native";
import { Header } from "../../components/Header";
import { categories } from "../../utils/categories";
import {
  Container,
  Category,
  Icon,
  Name,
  ListContainer,
  SubmitButton,
  SubmitButtonText,
  ColoredView
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface SelectCategoryModalProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function SelectCategoryModal({category, closeSelectCategory, setCategory} : SelectCategoryModalProps) {
  const [isPressed, setIsPressed] = useState('');

  function handleSelectCategory (item: Category) {
    setCategory({
      key: item.key,
      name: item.name
    });
      
    setIsPressed(item.name);
  }

  return (
    <Container>
      <Header title="Categoria" modal={true} />
      <ListContainer>
        <FlatList
          data={categories}
          style={{ flex: 1, width: "100%" }}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Category onPress={() => handleSelectCategory(item)} isActive={item.name === isPressed} backgroundColor={item.color}>
              <ColoredView backgroundColor={item.color}/>
              <Icon name={item.icon} isActive={item.name === isPressed}  />
              <Name isActive={item.name === isPressed}>{item.name}</Name>
            </Category>
          )}
        />
      </ListContainer>
      <SubmitButton onPress={closeSelectCategory}>
        <SubmitButtonText>Selecionar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
