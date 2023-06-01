import { createContext } from 'react';
import {Athlete} from '../models/Athlete';

export const UserContext = createContext<Athlete | undefined>(undefined);