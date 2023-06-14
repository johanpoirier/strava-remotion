import React, { useContext } from 'react';
import { StoreContext } from '../../contexts/StoreContext';
import './welcome.css';

export default function RenderList() {
  const { athlete } = useContext(StoreContext);

  return <header>Hello {athlete.firstname}!</header>;
}
