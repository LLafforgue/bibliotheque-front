import { createBrowserRouter, Outlet, RouterProvider, useRouteError, useLocation, useNavigation } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';
import Header from "./components/Header";
import Espaces from './pages/Espaces';
import Favoris from './pages/Favoris';
import NvPassword from'./pages/accueil/NvPassword';
import ResetPassword from './pages/accueil/ResetPassword';
import Protected from './hooks/Protected';
import Spinner from './kit/Spinner';
import fetchList from './hooks/fetchList';


const router = createBrowserRouter([
  {
    path:'/',
    element:<Accueil/>,
    errorElement: <PageError/>
  },
  {
    path:'/nvpassword',
    element:<NvPassword/>,//formulaire post (email)
    errorElement:<PageError/>,
    children:[
      {
        path:':token',
        element:<ResetPassword/>
      }
    ]
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
        element: <Favoris/>,
        loader: async ()=>{
          const response = await fetchList('liens/favoris','GET')
          return {response}
        }
      },
      {
        path:':id',
        element: <div>Salle</div>
        // loader:
      },
      {
        path:'nouvel',
        element: <div>Nouvel Salle</div>
      },
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
  const path = useLocation().pathname==='/espaces'
  const {state} = useNavigation();
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900 transition-colors duration-500 w-full">
      <Header/>
      {state==='loading'&&<Spinner/>}
    {path ? <Protected Component={Espaces} />:<Protected Component={Outlet} />}
    </div>
  )
}


function App() {

  return (
    <div className="font-DMSans w-full">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
