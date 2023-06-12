import React, { useCallback, useContext } from 'react';
import './style.css';
import { addRenderRequest } from '../../services/api';
import { getAccessToken } from '../../services/auth';
import { StoreContext } from '../../contexts/StoreContext';

export default function RequestForm({ onRequest }: { onRequest: () => void }) {
  const { athlete } = useContext(StoreContext);

  const handleSubmit = useCallback(
    (e: any) => {
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
      })
        .then(onRequest)
        .catch(console.error);
    },
    [athlete],
  );

  return (
    <form method="post" onSubmit={handleSubmit} className="request-form">
      <button type="submit">Request render</button>
    </form>
  );
}
