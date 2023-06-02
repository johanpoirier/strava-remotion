import React, { useContext, useMemo, useState } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import Player from '../Player';

export default function PreviewZone() {
  const { activities } = useContext(StoreContext);

  const [displayPreview, setDisplayPreview] = useState(false);

  const renderPreview = useMemo(() => {
    if (!displayPreview) return null;
    return <Player />;
  }, [activities, displayPreview]);

  return (
    <section className="preview-zone">
      <button type="button" onClick={() => setDisplayPreview(true)}>
        Generate preview
      </button>
      {renderPreview}
    </section>
  );
}
