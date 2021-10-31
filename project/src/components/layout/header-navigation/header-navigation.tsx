import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { logoutAction } from '../../../store/api-actions';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus } from '../../../store/user-data/selectors';

function HeaderNavigation(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={isAuthorized ? AppRoute.Favorites : AppRoute.SignIn}>
            <a className="header__nav-link header__nav-link--profile" href="/">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              { isAuthorized
                ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                : <span className="header__login">Sign in</span> }
            </a>
          </Link>
        </li>

        { isAuthorized &&
          <li className="header__nav-item">
            <a
              className="header__nav-link"
              href="/"
              onClick={handleSignOut}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li> }
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
