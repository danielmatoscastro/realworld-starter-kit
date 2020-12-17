import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import {
  LOGIN,
  REGISTER,
  SETTINGS,
  EDITOR,
  EDITOR_SLUG,
  ARTICLE_SLUG,
  PROFILE_SLUG,
  FAVORITES_SLUG,
  HOME,
} from './routes';
import UserProvider from './providers/UserProvider';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Settings from './pages/Settings';
import CreateEditArticle from './pages/CreateEditArticle';
import Article from './pages/Article';
import Profile from './pages/Profile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path={[LOGIN, REGISTER]}>
            <LoginRegister />
          </Route>
          <Route path={SETTINGS}>
            <Settings />
          </Route>
          <Route path={[EDITOR, EDITOR_SLUG]}>
            <CreateEditArticle />
          </Route>
          <Route path={ARTICLE_SLUG}>
            <Article />
          </Route>
          <Route path={[PROFILE_SLUG, FAVORITES_SLUG]}>
            <Profile />
          </Route>
          <Route path={HOME} exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
