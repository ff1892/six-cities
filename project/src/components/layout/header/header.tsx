import { Link } from 'react-router-dom';
import NavigationAuth from '../navigation-auth/navigation-auth';
import NavigationNoAuth from '../navigation-no-auth/navigation-no-auth';

type headerNavigationProps = {
  isHeaderNavigation?: boolean;
  isAuth?: boolean;
}

function Header({ isHeaderNavigation = true, isAuth}: headerNavigationProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isHeaderNavigation && isAuth ? <NavigationAuth /> : '' }
          {isHeaderNavigation && !isAuth ? <NavigationNoAuth /> : '' }
        </div>
      </div>
    </header>
  );
}

export default Header;
