import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) return <div>Error...</div>;

  return <div>Something went wrong...</div>;
};

export default Error;
