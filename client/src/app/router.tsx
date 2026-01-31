import { createBrowserRouter } from "react-router-dom";
import IntroPage from  "../pages/IntroPage";
import MapPage from "../pages/MapPage";
import PreIntroPage from "../pages/PreIntroPage";
import BasePage from "../pages/BasePage";
import BattlePage from "../pages/BattlePage";
import EndPage from "../pages/EndPage";
import DeathPage from "../pages/DeathPage";
import InfoCardsPage from "../pages/InfoCardsPage";

export const router = createBrowserRouter([
  { path: '/', element: <PreIntroPage /> },
  { path: '/intro', element: <IntroPage /> },
  { path: '/bank', element: <BasePage /> },
  { path: '/info', element: <InfoCardsPage /> },
  { path: '/map', element: <MapPage /> },
  { path: '/battle', element: <BattlePage /> },
  { path: '/end', element: <EndPage /> },
  { path: '/death', element: <DeathPage/> },
]);
