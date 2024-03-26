import React from 'react';

import useFetch from '../hooks/useFetch';

function PageNotFound404() {
  return (
    <span>404: Page Not Found</span>
  );
}

function Loading() {
  return (
    <span>Loading...</span>
  );
}

function Err({ error }) {
  return (
    <span>
      Error:
      {error.message}
    </span>
  );
}

function WithLogging({ data, children }) {
  console.log('')
  return (
    <>
      {children}
    </>
  );
}

function DisplayRemoteData({url, }) {
  const { status, data, error } = useFetch(url);

  switch (status) {
    case 'fetching':
      return <Loading />;
    case 'error':
      return <Err error={error} />;
    case 'fetched':
      if (!data) return null;
      return
        <MyComponent data={data.results} />

    default:
      return <PageNotFound404 />;
  }
}

const withAPIFeedback =
  (Component) =>
  ({ hasError, isLoading, data }) => {
    if (isLoading) return <p>Loading…</p>;
    if (hasError) return <p>Sorry, data could not be fetched.</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{ data }} />;
  };

const UsersList = ({ data }) => {
  const { users } = data;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const { data, loading, error } = fetchData();
const UsersListWithFeedback = withAPIFeedback(UsersList);
<UsersListWithFeedback {...{ data, error }} isLoading={loading} />;
