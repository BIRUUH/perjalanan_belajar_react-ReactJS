import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}