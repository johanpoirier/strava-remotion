import {useContext, useEffect, useState} from 'react';
import {fetchUserRenderList} from '../../services/api';
import {UserContext} from '../../contexts/UserContext';

export default function RenderList() {
    const [renderList, setRenderList] = useState<any[]>([]);
    const athlete = useContext(UserContext);

    useEffect(() => {
        if (!athlete) {
            return;
        }
        fetchUserRenderList(athlete.id).then(setRenderList);
    }, [athlete]);

    const displayRender = (render: any) => {
        return (<li>Render { render.id } --- <a href={`/out/render-${render.id}.mp4`}>Download</a></li>);
    };

    return (
        <ul>
            {renderList.map(displayRender)}
        </ul>
    );
}
