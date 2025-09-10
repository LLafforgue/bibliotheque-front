import { createBrowserRouter, Outlet, RouterProvider, useRouteError } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';
import Header from "./components/Header";


const router = createBrowserRouter([
  {
    path:'/',
    element:<Accueil/>,
    errorElement: <PageError/>
  },
  {
    path: '/espaces',
    element : <PageEspaces/>,
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
      {
        path:'nouvel',
        element: <div>Nouvel Salle</div>
      }
  ]
  }
]);

function PageError () {
  const error = useRouteError();
  return (
  <div className='min-h-screen flex flex-col justify-center items-center gap-4 bg-red-50 text-red-800 p-5'>
  <h1 className='font-bold text-violet-500 '>Une erreur est survenue</h1>
  <p className='text-gray-800 '>{error?.error?.toString() ?? error?.toString()}</p>  
  </div>
)
}

function PageEspaces() {
  return (<>
    <Header/>
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900 transition-colors duration-500 w-full">
    <Outlet/>
    </div>
  </>)
}


function App() {

  return (
    <div className="font-DMSans">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
