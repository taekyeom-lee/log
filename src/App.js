import { Route, Switch } from 'react-router-dom';

import AllPostPage from './pages/AllPost';
import NewPostPage from './pages/NewPost';
import BookmarksPage from './pages/Bookmarks';
import Header from './components/layout/Header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <AllPostPage />
        </Route>
        <Route path="/write">
          <NewPostPage />
        </Route>
        <Route path="/bookmarks">
          <BookmarksPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
