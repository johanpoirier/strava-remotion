import React, { useSearchParams } from 'react-router-dom';
import StravaLogin from '../components/StravaLogin';

export default function Login() {
  const [searchParams] = useSearchParams();
  return <StravaLogin code={searchParams.get('code') ?? undefined} />;
}
