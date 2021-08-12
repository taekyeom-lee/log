import { Route, Switch } from 'react-router-dom';

import AllPostPage from './pages/AllPost';
import NewPostPage from './pages/NewPost';
// import FavoritesPage from './pages/Favorites';
import BookmarksPage from './pages/Bookmarks';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <AllPostPage />
          </Route>
          <Route path='/write'>
            <NewPostPage />
          </Route>
          <Route path='/bookmarks'>
            <BookmarksPage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
