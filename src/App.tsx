import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ROUTES } from './costants/routes';
import { Services } from './pages/Services';
import { Navigation } from './components/Navigation';

const App: FC = () => (
  <div>
    <Navigation />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.BLOG} element={<Blog />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.SERVICES} element={<Services />} />
    </Routes>
  </div>
);

export default App;
