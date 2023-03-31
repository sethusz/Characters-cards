import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import SingleComicPage from '../pages/SingleComicPage';
import Page404 from '../pages/404'

const App = () => {

  return (
    <BrowserRouter>

      <div className="app">
        <AppHeader />
        <main>
          <Routes>

            <Route exact path='/Characters-cards/' element={<MainPage />} index/>
            <Route path='/comics' element={<ComicsPage />} />
            <Route path='/comics/:comicId' element={<SingleComicPage />} />
            <Route path="*" element={<Page404/>}/>

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}


export default App;