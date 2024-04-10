import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Error404 from "./pages/Error404";
import RootLayout from "./pages/Root";
import Auth from "./pages/Auth/Auth";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Main from "./pages/Main/Main";
import History from "./pages/History";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Main /> },
      { path: "history", element: <History /> },
    ],
  },
  {
    path: "/authentication",
    element: <Navigate to="/" replace />,
  },
]);

const commonRouter = createBrowserRouter([
  {
    path: "*",
    element: <Error404 />,
  },
  {
    index: true,
    element: <Navigate to="/authentication" replace />,
  },
  {
    path: "/authentication",
    element: <Auth />,
  },
]);

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <RouterProvider router={authCtx.isLoggedIn ? authRouter : commonRouter} />
  );
}

export default App;
