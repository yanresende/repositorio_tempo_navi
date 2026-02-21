import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// Página temporária de Pacientes
const Pacientes = () => (
  <h1 className="text-2xl font-bold">Gerenciamento de Pacientes</h1>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Todas as rotas abaixo terão a Sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/agenda" element={<div>Agenda (Em breve)</div>} />
          <Route path="/config" element={<div>Configurações</div>} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
