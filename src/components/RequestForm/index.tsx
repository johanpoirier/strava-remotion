export default function RequestForm() {
    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Number of activities:
                <input name="activityCount" type="number" defaultValue="10" />
            </label>
            <button type="submit">Generate</button>
        </form>
    );
}