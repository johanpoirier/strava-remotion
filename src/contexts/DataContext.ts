import { createContext } from 'react';
import {MyActivity} from '../models/MyActivity';

export const DataContext = createContext<MyActivity[]>([]);