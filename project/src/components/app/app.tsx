import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../screens/main/main';
import MainEmptyScreen from '../screens/main-empty/main-empty';
import SignInScreen from '../screens/sign-in/sign-in';
import FavoritesScreen from '../screens/favorites/favorites';
import FavoritesEmptyScreen from '../screens/favorites-empty/favorites-empty';
import OfferScreen from '../screens/offer/offer';
import NotFoundScreen from '../screens/not-found/not-found';
import { Offer } from '../../types/offer';

type AppProps = {
  offers: Offer[],
}

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen offers={offers} />
        </Route>
        <Route exact path={AppRoute.MainEmpty}>
          <MainEmptyScreen />
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
          <OfferScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
