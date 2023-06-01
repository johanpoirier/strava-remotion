export async function addRenderRequest({token, activityCount}: {token: string, activityCount: number}) {
    const data = {userId: 'test', token, activityCount};
    console.log('addRenderRequest', data);
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/render`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Failed to post a render request: ${response.statusText} (${response.status})`);
    }

    return response.json();
}
