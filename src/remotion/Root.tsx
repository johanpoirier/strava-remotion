import React from 'react';
import {Composition} from 'remotion';
import {DataContext} from '../contexts/DataContext';
import {MyActivities} from "./MyActivities";

export const RemotionRoot: React.FC = () => {
    return (
        <DataContext.Provider value={[]}>
            <Composition
                id="InMotion"
                component={MyActivities}
                durationInFrames={1800}
                fps={30}
                width={1024}
                height={768}
                defaultProps={{
                    token: '',
                }}
            />
        </DataContext.Provider>
    );
};