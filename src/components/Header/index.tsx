import React from 'react';
import {
  Container,
  Title
} from './styles';

interface HeaderProps {
  title: string;
  modal?: boolean;
}

export function Header ({title, modal}: HeaderProps) {
  return (
    <Container modal={modal!}>
      <Title>{title}</Title>
    </Container>
  );
}