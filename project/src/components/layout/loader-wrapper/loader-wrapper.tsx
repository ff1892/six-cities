import Loader from '../loader/loader';

type LoadWrapperProps = {
  isLoad: boolean,
  children: JSX.Element,
};

function LoadWrapper({isLoad, children}: LoadWrapperProps): JSX.Element {
  return (isLoad && children) || <Loader />;
}

export default LoadWrapper;
