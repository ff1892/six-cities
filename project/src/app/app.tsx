import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import PrivateRoute from '../components/private-route/private-route';
import MainScreen from '../components/screens/main/main';
import SignInScreen from '../components/screens/sign-in/sign-in';
import FavoritesScreen from '../components/screens/favorites/favorites';
import FavoritesEmptyScreen from '../components/screens/favorites-empty/favorites-empty';
import PropertyScreen from '../components/screens/property/property';
import NotFoundScreen from '../components/screens/not-found/not-found';
import { Offer } from '../types/offer';

type AppProps = {
  offers: Offer[],
}

function App({offers}: AppProps): JSX.Element {
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
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.FavoritesEmpty}>
          <FavoritesEmptyScreen />
        </Route>
        <Route exact path={AppRoute.Offers}>
          <PropertyScreen offers={offers}/>
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
