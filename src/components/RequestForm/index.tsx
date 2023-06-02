import React, { useCallback, useContext } from 'react';
import './style.css';
import { addRenderRequest } from '../../services/api';
import { getAccessToken } from '../../services/auth';
import { StoreContext } from '../../contexts/StoreContext';

export default function RequestForm() {
  const store = useContext(StoreContext);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      const formJson = Object.fromEntries(formData.entries());

      const token = getAccessToken();
      if (!token) {
        console.error('Unknown token…');
        return;
      }

      if (!store?.athlete) {
        console.error('Unknown athlete…');
        return;
      }

      addRenderRequest({
        userId: store?.athlete.id,
        token,
        activityCount: parseInt(formJson.activityCount.toString(), 10),
      }).catch(console.error);
    },
    [store?.athlete],
  );

  return (
    <form method="post" onSubmit={handleSubmit} className="request-form">
      <label>
        Number of activities:
        <input name="activityCount" type="number" defaultValue="5" />
      </label>
      <button type="submit">Generate</button>
    </form>
  );
}
