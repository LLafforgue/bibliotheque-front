import './styles/App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Accueil/>
  },
  {
    path: '/espaces',
    element :<>
    <div>Header</div>
    <Outlet/>
    </>,
    children : [
      {
        path:'user',
        element: <div className='p-2'>User</div>
      },
      {
        path:'favoris',
        element: <div>Favoris</div>
      },
      {
        path:':id',
        element: <div>Salle</div>
      },
  ]
  }
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
