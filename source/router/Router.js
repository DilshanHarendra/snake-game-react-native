import React from 'react';
import {Route, Routes, NativeRouter} from 'react-router-native';
import DefaultLayout from '../layouts/DefaultLayout';
import Player from '../views/Player';
import Users from '../views/Users';

function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/player" element={<Player />} />
          <Route path="/" element={<Users />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}
export default Router;
