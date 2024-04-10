import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import MainWrapper from "../components/MainWrapper/MainWrapper";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
}
