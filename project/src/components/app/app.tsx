import MainScreen from '../main/main';

type AppProps = {
  cardCount: number;
}

function App({cardCount}: AppProps): JSX.Element {
  return (
    <MainScreen cardCount={cardCount}/>
  );
}

export default App;
