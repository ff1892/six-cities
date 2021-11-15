import './style.css';

function Loader(): JSX.Element {
  return (
    <div
      className="loader"
      data-testid="loader"
    >
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
