import React, { useContext, useMemo, useState } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import Player from '../Player';
import RequestForm from '../RequestForm';
import RenderList from '../RenderList';

export default function PreviewZone() {
  const { activities } = useContext(StoreContext);

  const [shouldDisplayPreview, setShouldDisplayPreview] = useState(false);

  const displayPreview = useMemo(() => {
    if (!shouldDisplayPreview) return null;
    return <Player />;
  }, [activities, shouldDisplayPreview]);

  const displayRenderList = () => {
    setShouldDisplayPreview(false);
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
        {!shouldDisplayPreview && <RenderList />}
      </>
    </section>
  );
}
