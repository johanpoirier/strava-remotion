import { createContext } from 'react';
import { Store } from '../models/Store';

export const StoreContext = createContext<Store>(undefined!);
