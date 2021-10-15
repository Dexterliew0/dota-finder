import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import MatchDetail from './components/MatchDetail';
import MatchList from './components/MatchList';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <MatchList />
        </Route>
        <Route path="/match_detail/:id">
          <MatchDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
