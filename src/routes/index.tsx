import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/UseAuth';

export function Routes () {
  const { data } = useAuth();
  return (
    <NavigationContainer>
      {data?.id ? <AppRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  )
}