import { createRoot } from "react-dom/client";
import "./reset.css";
import AppRouter from "./router";

createRoot(document.getElementById("root")!).render(<AppRouter />);
