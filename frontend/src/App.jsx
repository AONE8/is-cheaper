import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Error404 from "./pages/Error404";
import RootLayout from "./pages/Root";
import Auth from "./pages/Auth/Auth";

const isAuth = false;

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: "" }, // path: ""
      { path: "products", element: "" },
      { path: "products/:productId", element: "" },
    ],
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
  return <RouterProvider router={isAuth ? authRouter : commonRouter} />;
}

export default App;
