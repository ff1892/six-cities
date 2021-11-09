import { useRef, FormEvent } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AuthData } from '../../../types/auth-data';
import { AppRoute, AuthorizationStatus, City, UploadStatus } from '../../../const';
import { getRandomArrayValue, validatePassword } from '../../../utils/common';
import { changeCity } from '../../../store/actions';
import { getAuthorizationStatus, getUploadUserInfoStatus } from '../../../store/reducers/user-data/selectors';
import { getSelectedCity } from '../../../store/reducers/app-state/selectors';
import { loginAction } from '../../../store/api-actions/user';
import Header from '../../layout/header/header';
import CityTab from '../../layout/city-tab/city-tab';

function SignIn(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const uploadingStatus = useSelector(getUploadUserInfoStatus);
  const selectedCity = useSelector(getSelectedCity);

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const isPosting = uploadingStatus === UploadStatus.Posting;

  const dispatch = useDispatch();
  const onFormSubmit = (authData: AuthData) => dispatch(loginAction(authData));
  const onCityClick = (city: string) => dispatch(changeCity(city));

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handlePasswordChange = (evt: FormEvent<HTMLInputElement>) => {
    if (passwordRef.current) {
      passwordRef.current.setCustomValidity(
        validatePassword(passwordRef.current.value),
      );
      passwordRef.current.reportValidity();
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      onFormSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  if (isAuthorized) {
    return <Redirect to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header isHeaderNavigation={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isPosting}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                  disabled={isPosting}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isPosting}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <CityTab
                selectedCity={selectedCity}
                onCityClick={onCityClick}
                city={getRandomArrayValue(Object.values(City))}
                selectedView
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
