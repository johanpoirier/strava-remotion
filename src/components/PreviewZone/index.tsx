import React, { useContext, useMemo, useState } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import Player from '../Player';
import RequestForm from '../RequestForm';
import RenderList from '../RenderList';

export default function PreviewZone() {
  const { activities } = useContext(StoreContext);

  const [shouldDisplayPreview, setShouldDisplayPreview] = useState(false);
  const [shouldDisplayRenderList, setShouldDisplayRenderList] = useState(true);

  const displayPreview = useMemo(() => {
    if (!shouldDisplayPreview) return null;
    return <Player />;
  }, [activities, shouldDisplayPreview]);

  const displayRenderList = () => {
    setShouldDisplayPreview(false);
    setShouldDisplayRenderList(true);
  };

  return (
    <section className="preview-zone">
      <div className="preview-zone-actions">
        <button type="button" onClick={() => setShouldDisplayPreview(true)}>
          Show preview
        </button>
        <RequestForm onRequest={displayRenderList} />
      </div>
      <>
        {displayPreview}
        {shouldDisplayRenderList && <RenderList />}
      </>
    </section>
  );
}
