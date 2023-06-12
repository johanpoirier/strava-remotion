import React, { useContext, useMemo, useState } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import Player from '../Player';
import RequestForm from '../RequestForm';

export default function PreviewZone() {
  const { activities } = useContext(StoreContext);

  const [displayPreview, setDisplayPreview] = useState(false);

  const renderPreview = useMemo(() => {
    if (!displayPreview) return null;
    return <Player />;
  }, [activities, displayPreview]);

  return (
    <section className="preview-zone">
      <div className="preview-zone-actions">
        <button type="button" onClick={() => setDisplayPreview(true)}>
          Show preview
        </button>
        <RequestForm />
      </div>
      {renderPreview}
    </section>
  );
}
