import { createContext } from 'react';
import { IUserDetailsInfo } from 'teko-oauth2';
import { currentUser } from 'services/mocks/user';

interface StoreContextType {
  currentUser: IUserDetailsInfo;
}

export const StoreContext = createContext<StoreContextType>({
  currentUser,
});
