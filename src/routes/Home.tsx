import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { continueRender, delayRender } from 'remotion';
import { getAccessToken, isLoggedIn } from '../services/auth';
import { getDataForStore } from '../services/data';
import { Store } from '../models/Store';
import { StoreContext } from '../contexts/StoreContext';
import Preview from '../components/Preview';
import RequestForm from '../components/RequestForm';
import RenderList from '../components/RenderList';

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

  return (
    <StoreContext.Provider value={store}>
      <RequestForm />
      <RenderList />
      <Preview />
    </StoreContext.Provider>
  );
}
