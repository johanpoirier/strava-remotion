import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { continueRender, delayRender } from 'remotion';
import { getAccessToken, isLoggedIn } from '../services/auth';
import { getDataForStore } from '../services/data';
import { Store } from '../models/Store';
import { StoreContext } from '../contexts/StoreContext';
import Welcome from '../components/Welcome';
import ActivityList from '../components/ActivityList';
import PreviewZone from '../components/PreviewZone';
import { Puff } from 'react-loader-spinner';
import './home.css';

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
    return (
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#fc5200"
        ariaLabel="puff-loading"
        wrapperStyle={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        wrapperClass=""
        visible={true}
      />
    );
  }

  return (
    <StoreContext.Provider value={store}>
      <main className="home">
        <Welcome />
        <ActivityList />
        <PreviewZone />
      </main>
    </StoreContext.Provider>
  );
}
