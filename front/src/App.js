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
import { UserProvider } from './providers';
import {
  Home,
  LoginRegister,
  Settings,
  CreateEditArticle,
  Article,
  Profile,
} from './pages';

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
