import { Link } from 'react-router-dom';

type FooterProps = {
  isContainer: boolean,
};

function Footer({isContainer = true}: FooterProps): JSX.Element {
  return (
    <footer
      className={`footer ${isContainer ? 'containter': ''}`}
    >
      <Link className="footer__logo-link" to="/" title="Main page">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
}

export default Footer;
