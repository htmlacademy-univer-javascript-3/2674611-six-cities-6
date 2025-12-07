import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import React from 'react';
import {logout} from '../../store/action.ts';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userData = useAppSelector((state) => state.userData);
  const favoritesCount = useAppSelector((state) =>
    state.offers.filter((offer) => offer.isFavorite).length
  );

  const handleLogoutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              to="/"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth && userData ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="favorites"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          src={userData.avatarUrl}
                          alt={userData.name}
                          width="54"
                          height="54"
                        />
                      </div>
                      <span className="header__user-name user__name">
                        {userData.email}
                      </span>
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
