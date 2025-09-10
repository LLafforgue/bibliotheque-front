import { createBrowserRouter, Outlet, RouterProvider, useRouteError } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Accueil/>,
    errorElement: <PageError/>
  },
  {
    path: '/espaces',
    element :<>
    <div>Header</div>
    <Outlet/>
    </>,
    errorElement: <PageError/>,
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

function PageError () {
  const error = useRouteError();
  return (<div className='text-align'>
  <h1 className='font-bold text-violet-500'>Une erreur est survenue</h1>
  <p className='text-gray-800'>{error?.error?.toString() ?? error?.toString()}</p>  
  </div>
)
}

function App() {

  return (
    <div className="font-DMSans">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
