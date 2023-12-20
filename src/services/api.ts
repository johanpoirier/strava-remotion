import { Render } from '../models/Render';

export async function addRenderRequest({
  userId,
  token,
  lang = 'en',
}: {
  userId: string;
  token: string;
  lang: string;
}) {
  const data = { userId, token, lang };
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/render`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post a render request: ${response.statusText} (${response.status})`);
  }

  return response.json();
}
export async function fetchUserRenderList(userId: string): Promise<Render[]> {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${userId}/renders`);

  if (!response.ok) {
    throw new Error(`Failed to post a render request: ${response.statusText} (${response.status})`);
  }

  return response.json();
}
