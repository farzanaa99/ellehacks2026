import { createBrowserRouter } from "react-router-dom";
import IntroPage from  "../pages/IntroPage";
import MapPage from "../pages/MapPage";
import HomeBasePage from "../pages/HomeBasePage";
import BattlePage from "../pages/BattlePage";
import EndPage from "../pages/EndPage";
import DeathPage from "../pages/DeathPage";
import InfoCardsPage from "../pages/InfoCardsPage";

export const router = createBrowserRouter([
  { path: '/', element: <HomeBasePage /> },
  { path: '/home', element: <HomeBasePage /> },
  { path: '/map', element: <MapPage /> },
  { path: '/intro', element: <IntroPage /> },
  { path: '/battle', element: <BattlePage /> },
  { path: '/reward', element: <InfoCardsPage /> },
  { path: '/end', element: <EndPage /> },
  { path: '/death', element: <DeathPage/> },
  { path: '/info', element: <InfoCardsPage /> },
]);
