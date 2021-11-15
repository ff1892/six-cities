import { Link } from 'react-router-dom';
import './style.css';

function NotFound(): JSX.Element {
  return (
    <main>
      <div className="container">
        <section className="not-found">
          <div className="not-found__wrapper">
            <h1 className="not-found__status">
              404.
              <br />
              Page not found
            </h1>
            <Link className="not-found__link" to="/" title="Main Page">
                Go to main page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFound;
