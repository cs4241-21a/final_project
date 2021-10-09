import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TournamentCreationPage from './pages/TournamentCreation';
import TournamentPage from './pages/Tournament';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import SinglePage from './pages/SinglePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/single' component={SinglePage} />
        <Route path='/tournament-create/:userId' component={TournamentCreationPage} />
        <Route path='/tournament/:tournamentId' component={TournamentPage} />
        <Route path='*'>
          <ErrorPage errorCode={'404 Not Found'} errorMessage={'The page you are looking for does not exist.'} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
