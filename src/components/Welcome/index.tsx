import React, { useContext } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';

export default function RenderList() {
  const { athlete } = useContext(StoreContext);

  return <header>Hello {athlete.firstname}!</header>;
}
