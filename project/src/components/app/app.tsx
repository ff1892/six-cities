import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../screens/main/main';
import SignInScreen from '../screens/sign-in/sign-in';
import FavoritesScreen from '../screens/favorites/favorites';
import PropertyScreen from '../screens/property/property';
import NotFoundScreen from '../screens/not-found/not-found';


function App(): JSX.Element {

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
          render={() => <FavoritesScreen />}
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

export default App;
