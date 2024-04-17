import {
  Navigate,
  Outlet,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import MainWrapper from "../components/MainWrapper/MainWrapper";
import { useEffect } from "react";

export default function RootLayout() {
  const token = useRouteLoaderData("root");
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // useEffect(() => {

  // }, [token]);
  if (!token) {
    return (
      <>
        <Navigate to="/authentication" replace />
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <MainNavigation />
          <MainWrapper>
            <Outlet />
          </MainWrapper>
        </>
      )}
    </>
  );
}

export function loader() {}
