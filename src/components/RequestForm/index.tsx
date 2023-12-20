import React, { FormEvent, useCallback, useContext } from 'react';
import { addRenderRequest } from '../../services/api';
import { getAccessToken } from '../../services/auth';
import { StoreContext } from '../../contexts/StoreContext';
import './request-form.css';
import { useTranslation } from 'react-i18next';

export default function RequestForm({ onRequest }: { onRequest: () => void }) {
  const { athlete } = useContext(StoreContext);
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLElement>) => {
      e.preventDefault();

      // const form = e.target;
      // const formData = new FormData(form);
      //
      // const formJson = Object.fromEntries(formData.entries());

      const token = getAccessToken();
      if (!token) {
        console.error('Unknown token…');
        return;
      }

      addRenderRequest({
        userId: athlete.id,
        token,
        lang: window.navigator.language,
      })
        .then(onRequest)
        .catch(console.error);
    },
    [athlete],
  );

  return (
    <form method="post" onSubmit={handleSubmit} className="request-form">
      <button type="submit">{t('request-form.request-render')}</button>
    </form>
  );
}
