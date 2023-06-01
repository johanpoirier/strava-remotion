import {useCallback, useContext} from 'react';
import './style.css';
import {addRenderRequest} from '../../services/api';
import {getAccessToken} from '../../services/auth';
import {UserContext} from '../../contexts/UserContext';

export default function RequestForm() {
    const athlete = useContext(UserContext);

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (!athlete) {
            console.error('Unknown athlete…')
            return;
        }

        addRenderRequest({
            userId: athlete.id,
            token: getAccessToken()!,
            // @ts-ignore
            activityCount: parseInt(formJson.activityCount, 10)
        }).catch(console.error);
    }, [athlete]);

    return (
        <form method="post" onSubmit={handleSubmit} className="request-form">
            <label>
                Number of activities:
                <input name="activityCount" type="number" defaultValue="5" />
            </label>
            <button type="submit">Generate</button>
        </form>
    );
}