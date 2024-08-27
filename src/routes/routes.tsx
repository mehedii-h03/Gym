import App from "@/App";
import ProtectedRoute from "@/components/ProtectedRoute";
import CardsPage from "@/pages/Cards/CardsPage";
import ComingSoon from "@/pages/ComingSoon/ComingSoon";
import History from "@/pages/History/History";
import Login from "@/pages/Login/Login";
import Slot from "@/pages/Slot/Slot";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/cards" replace />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cards",
            element: <CardsPage />,
          },
          {
            path: "/:slotPath",
            element: <Slot />,
          },
          {
            path: "/history",
            element: <History />,
          },
          {
            path: "/night-slip",
            element: <ComingSoon />,
          },
          {
            path: "/choice-slip",
            element: <ComingSoon />,
          },
          {
            path: "/super-admin",
            element: <ComingSoon />,
          },
          {
            path: "/users",
            element: <ComingSoon />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
