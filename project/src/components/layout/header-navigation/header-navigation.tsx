import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { ThunkAppDispatch } from '../../../types/action';
import { logoutAction } from '../../../store/api-actions';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSignOutClick() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function HeaderNavigation({ authorizationStatus, onSignOutClick }: PropsFromRedux): JSX.Element {

  const handleSignOut = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onSignOutClick();
  };

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

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

export {HeaderNavigation};
export default connector(HeaderNavigation);
