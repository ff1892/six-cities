import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../const';
import { State } from '../types/state';
import PrivateRoute from '../components/private-route/private-route';
import MainScreen from '../components/screens/main/main';
import SignInScreen from '../components/screens/sign-in/sign-in';
import FavoritesScreen from '../components/screens/favorites/favorites';
import PropertyScreen from '../components/screens/property/property';
import NotFoundScreen from '../components/screens/not-found/not-found';

const mapStateToProps = ({authorizationStatus, offers}: State) => ({
  authorizationStatus,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({offers}: PropsFromRedux): JSX.Element {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen offers={offers} />}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.Offers}/:offerId`}>
          <PropertyScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
