import React, { useContext, useEffect, useState } from 'react';
import './render-list.css';
import { fetchUserRenderList } from '../../services/api';
import { StoreContext } from '../../contexts/StoreContext';
import { formatTimeDate } from '../../tools/format-date';

export default function RenderList() {
  const [renderList, setRenderList] = useState<any[]>([]);
  const { athlete } = useContext(StoreContext);

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
        return 'created';
      case 1:
        return 'rendering';
      case 2:
        return 'ready';
      case 3:
        return 'in error';
      default:
        return '?';
    }
  };

  const displayRender = (render: any) => {
    if (render.status === 2) {
      return (
        <li key={`render-${render.id}`}>
          <a href={`/out/render-${render.id}.mp4`}>
            Download video #{render.id} from {formatTimeDate(render.createdAt * 1000)}
          </a>
        </li>
      );
    }
    return (
      <li key={`render-${render.id}`}>
        Video request #{render.id} from {formatTimeDate(render.createdAt * 1000)} is {getStatus(render.status)}
      </li>
    );
  };

  return <ul className="render-list">{renderList.map(displayRender)}</ul>;
}
