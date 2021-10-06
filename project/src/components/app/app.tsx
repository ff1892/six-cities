import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../screens/main/main';
import MainEmptyScreen from '../screens/main-empty/main-empty';
import SignInScreen from '../screens/sign-in/sign-in';
import FavoritesScreen from '../screens/favorites/favorites';
import FavoritesEmptyScreen from '../screens/favorites-empty/favorites-empty';
import RoomScreen from '../screens/room/room';
import NotFoundScreen from '../screens/not-found/not-found';

type AppProps = {
  cardCount: number;
}

function App({cardCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen cardCount={cardCount} />
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
          render={() => <FavoritesScreen />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.FavoritesEmpty}>
          <FavoritesEmptyScreen />
        </Route>
        <Route exact path={AppRoute.Room}>
          <RoomScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
