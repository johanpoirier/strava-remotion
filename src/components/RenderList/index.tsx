import React, { useContext, useEffect, useState } from 'react';
import './render-list.css';
import { fetchUserRenderList } from '../../services/api';
import { StoreContext } from '../../contexts/StoreContext';
import { formatTimeDate } from '../../tools/format-date';
import { useTranslation } from 'react-i18next';

export default function RenderList() {
  const [renderList, setRenderList] = useState<any[]>([]);
  const { athlete } = useContext(StoreContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (!athlete) {
      return;
    }
    fetchUserRenderList(athlete.id).then(setRenderList);

    const interval = setInterval(() => {
      fetchUserRenderList(athlete.id).then(setRenderList);
    }, 10000);
    return () => clearInterval(interval);
  }, [athlete]);

  const getStatus = (statusCode: number): string => {
    switch (statusCode) {
      case 0:
        return t('render-list.created');
      case 1:
        return t('render-list.rendering');
      case 2:
        return t('render-list.ready');
      case 3:
        return t('render-list.error');
      default:
        return '?';
    }
  };

  const displayRender = (render: any) => {
    if (render.status === 2) {
      return (
        <li key={`render-${render.id}`}>
          <a href={`/out/render-${render.id}.mp4`}>
            {t('render-list.download-video', { id: render.id, date: formatTimeDate(render.createdAt * 1000) })}
          </a>
        </li>
      );
    }
    return (
      <li key={`render-${render.id}`}>
        {t('render-list.video-request', {
          id: render.id,
          date: formatTimeDate(render.createdAt * 1000),
          status: getStatus(render.status),
        })}
      </li>
    );
  };

  return <ul className="render-list">{renderList.map(displayRender)}</ul>;
}
