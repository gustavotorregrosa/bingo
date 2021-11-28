import logo from './logo.svg';
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';
import Layout from './components/Layout';
import Board from './components/Board';
import BingoHeader from './components/BingoHeader'

function App() {
  return (
    <Layout>
      <BingoHeader />
      <Board />
    </Layout>
  );
}

export default App;
