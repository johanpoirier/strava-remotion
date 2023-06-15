import React, { useContext } from 'react';
import { StoreContext } from '../../contexts/StoreContext';
import './welcome.css';
import { useTranslation } from 'react-i18next';

export default function RenderList() {
  const { athlete } = useContext(StoreContext);
  const { t } = useTranslation();

  return <header>{t('welcome.title', { firstname: athlete.firstname })}</header>;
}
