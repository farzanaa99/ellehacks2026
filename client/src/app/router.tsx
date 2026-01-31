import { createBrowserRouter } from "react-router-dom";
import IntroPage from  "../pages/IntroPage";
import HomeBasePage from "../pages/HomeBasePage";
import InfoCardsPage from "../pages/InfoCardsPage";
import BattlePage from "../pages/BattlePage";
import RewardPage from "../pages/RewardPage";
import DeathPage from "../pages/DeathPage";
import EndPage from "../pages/EndPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IntroPage />
    },
    {
        path: "/home",
        element: <HomeBasePage />
    },
    {
        path: "/info",
        element: <InfoCardsPage />
    },
    {
        path: "/battle",
        element: <BattlePage />
    },
    {
        path: "/reward",
        element: <RewardPage />
    },
    {
        path: "/death",
        element: <DeathPage />
    },
    {
        path: "/end",
        element: <EndPage />
    }
]);