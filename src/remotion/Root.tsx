import React from 'react';
import {Composition} from 'remotion';
import {DataContext} from '../contexts/DataContext';
import {MyActivities} from './MyActivities';
import {MyActivity} from '../models/MyActivity';
import {decodeEncodedPolyline} from '../services/leaflet';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './style.css';

Cabin.loadFont('normal', { weights: ['400', '700'] });
Cabin.loadFont('italic', { weights: ['400'] });

export const RemotionRoot: React.FC = () => {
    const activities: MyActivity[] = [{
        "name": "Sortie Vélo dans l'après-midi",
        "distance": 10566.5,
        "duration": 2359,
        "elevationGain": 185.0,
        "type": "MountainBikeRide",
        "id": "9038954393",
        "startDate": "2023-05-09T11:03:55Z",
        "map": decodeEncodedPolyline("clpuGwdy[Dg@BeBEqCD_DHcAV{@Dm@EkEOu@?Mf@kB?KCMGKqBu@qF{ByAu@iAw@qDwC}A_BaAu@[a@o@{BGOa@g@_CuAWWm@{@g@aAi@uAa@yAEIQEa@?i@IcBk@c@SwAiAkDgDg@[YIOAoAL_@?}Em@cBK_AUwAg@oBy@WSW]kAwCiAsBQg@[wBSoBA}@J}AE_@EKkByB}@kBW]c@g@YYkAq@YYKOWo@c@qAOWe@_@g@q@c@w@MQWMINMx@Ef@Ff@t@jC@NADC@CAIUS]y@i@YKA@EJ@H`@b@v@vABL?JIBS[UQc@Ow@IQ@CBCH@Fp@ZZZN\\AZAJSZoA|AU`@k@t@CFEf@?\\BLd@l@zAvDJh@B\\?JET?^DzAI\\GDeCHo@HMJGTEd@QxEKnKS`BaAdDKdAEpEKjAFJZZt@z@^j@Xz@R~@@n@En@aA`EEx@GlD@l@RpDO`EDv@h@|BFl@JlIGp@IxA@`ACXOd@}@bBi@bCW|@m@tAC\\~@v@lBxAf@B\\F\\Nr@b@PCzDcBpDiBzD{BhBq@fASfA@PALGx@Bb@GN?^l@Rj@Ll@Fj@ERq@`Aw@|@]j@u@v@e@`@}@VIP?RHNT@hA_@v@e@~@s@f@g@pA_Av@s@RCh@TPBb@g@Vg@Nm@F_@AoAEg@?w@Io@@KFG^W@SYsCSU]BSOGk@MeBImBAwADmBH]BAnBrAdAl@hDzBxBtBtAlAb@X\\Nt@P~@L`Cz@hAh@p@PfAPl@Fh@Hp@DTDr@Bl@PROhBcCVu@Ls@BGJEDDPb@Xz@h@`DXbCNlCR~BjAnDHn@f@nBPbBQxFDlDHrAHX|@lAjDlDbAl@pBp@xAjBRQBK\\aC\\_DR{ECaAHqA@mAEo@GUSi@Ee@HsDBgE"),
        "streams": {
            "distance": {
                "data": []
            },
            "altitude": {
                "data": []
            }
        }
    }];
    return (
        <DataContext.Provider value={activities}>
            <Composition
                id="InMotion"
                component={MyActivities}
                durationInFrames={60}
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