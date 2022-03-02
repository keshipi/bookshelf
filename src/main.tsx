import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { QueryParamProvider } from 'use-query-params';

import './index.css';
import App from './App';

const RouteAdapter: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location: Location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  if (!children) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return children({ history: adaptedHistory, location });
};
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter as unknown as React.FunctionComponent}>
        <App />
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
