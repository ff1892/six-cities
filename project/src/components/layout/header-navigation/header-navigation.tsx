import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { logoutAction } from '../../../store/api-actions';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizationStatus, getUserInfo } from '../../../store/user-data/selectors';

function HeaderNavigation(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userInfo = useSelector(getUserInfo);
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
              <div className="header__avatar-wrapper user__avatar-wrapper"
                style={{
                  backgroundImage: `url(${userInfo?.avatarUrl})`,
                  borderRadius: '50%',
                }}
              />
              { isAuthorized
                ? <span className="header__user-name user__name">{userInfo?.email}</span>
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
