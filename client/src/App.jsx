import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './App.css'
import Init from './pages/init';
import Room from './pages/room';
import Admin from "./pages/admin";
import { AppProvider } from "./providers/AppContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Init />
  },
  {
    path: '/room',
    element: <Room />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);
function App() {

  return (
    <>
    <div className="app">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </div>
    </>
  )
}

export default App
