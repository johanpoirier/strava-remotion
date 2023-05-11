import { useSearchParams } from 'react-router-dom';
import App from '../components/App';

export default function Root() {
    const [searchParams] = useSearchParams();
    return (<App code={searchParams.get('code') ?? undefined} />);
}
