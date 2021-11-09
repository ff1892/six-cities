import { Route, Redirect, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/reducers/user-data/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render } = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn} />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={render}
    />
  );
}

export default PrivateRoute;
