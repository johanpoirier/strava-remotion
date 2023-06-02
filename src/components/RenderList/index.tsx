import React, { useContext, useEffect, useState } from 'react';
import { fetchUserRenderList } from '../../services/api';
import { StoreContext } from '../../contexts/StoreContext';

export default function RenderList() {
  const [renderList, setRenderList] = useState<any[]>([]);
  const { athlete } = useContext(StoreContext);

  useEffect(() => {
    if (!athlete) {
      return;
    }
    fetchUserRenderList(athlete.id).then(setRenderList);
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
        return 'error';
      default:
        return '?';
    }
  };

  const displayRender = (render: any) => {
    if (render.status === 2) {
      return (
        <li>
          <a href={`/out/render-${render.id}.mp4`}>Download render {render.id}</a>
        </li>
      );
    }
    return (
      <li>
        Render {render.id} -- {getStatus(render.status)}
      </li>
    );
  };

  return <ul>{renderList.map(displayRender)}</ul>;
}
