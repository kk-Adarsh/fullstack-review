import "./App.css";
import ReviewForm from "./components/ReviewForm";
import ReviewTable from "./components/ReviewTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReviewTable />,
  },
  {
    path: "/new",
    element: <ReviewForm />,
  },
  {
    path: "/:id",
    element: <ReviewForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
