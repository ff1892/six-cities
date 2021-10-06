import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <main>
      <div className="container">
        <section className="not-found"
          style={{
            marginTop: '30vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="not-found__wrapper"
            style={{
              textAlign: 'center',
            }}
          >
            <h1 className="not-found__status"
              style = {{
                fontSize: '35px',
              }}
            >
              404.
              <br />
              Page not found
            </h1>
            <Link className="not-found__link" to="/" title="Main Page"
              style={{
                fontSize: '20px',
                borderBottom: '1px solid #383838',
              }}
            >
                Go to main page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFound;
