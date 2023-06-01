import './style.css';
import {addRenderRequest} from "../../services/api";
import {getAccessToken} from '../../services/auth';

export default function RequestForm() {
    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        // @ts-ignore
        addRenderRequest({token: getAccessToken()!, activityCount: parseInt(formJson.activityCount, 10)}).then(console.log).catch(console.error);
    }

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