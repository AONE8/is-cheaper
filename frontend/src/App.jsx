import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import RootLayout from "./pages/Root";
import Auth, { action as authAction } from "./pages/Auth/Auth";
import Main, { action as mainAction } from "./pages/Main/Main";
import History, { loader as historyLoader } from "./pages/History/History";
import { getJWT } from "./util/jwt-utils";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    loader: getJWT,
    children: [
      { index: true, element: <Main />, action: mainAction },
      { path: "history", element: <History />, loader: historyLoader },
      { path: "logout", action: logoutAction },
    ],
  },
  {
    path: "/authentication",
    element: <Auth />,
    action: authAction,
    loader: getJWT,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
