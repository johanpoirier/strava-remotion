import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { continueRender, delayRender } from 'remotion';
import { getAccessToken, isLoggedIn } from '../services/auth';
import { getDataForStore } from '../services/data';
import { Store } from '../models/Store';
import { StoreContext } from '../contexts/StoreContext';
import Welcome from '../components/Welcome';
import ActivityList from '../components/ActivityList';

export default function Home() {
  const navigate = useNavigate();

  const [accessToken] = useState<string | null>(getAccessToken);
  const [store, setStore] = useState<Store>();
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  });

  const fetchData = useCallback(async () => {
    if (accessToken) {
      const store = await getDataForStore(accessToken);
      setStore(store);

      continueRender(handle);
    }
  }, [accessToken, handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!store) {
    return <span>…</span>;
  }

  return (
    <StoreContext.Provider value={store}>
      <Welcome />
      <ActivityList />
    </StoreContext.Provider>
  );
}
