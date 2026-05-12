import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // ✅ استدعاء Sidebar
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import TicketPage from "./pages/TicketPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import AdminPage from "./pages/AdminPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";
import EditTicket from "./pages/EditTicket";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Header from "./components/Header";


function App() {
  const user = { id: 1, name: "Soufiane", role: "Administrateur" }; // Exemple

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header user={user} /> {/* ✅ Header en haut */}
          <main className="flex-1 p-6 bg-gray-50">
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/ticket/:id" element={<TicketPage />} />
            <Route path="/create-ticket" element={<CreateTicketPage />} />
            <Route path="/edit-ticket/:id" element={<EditTicket />} />   
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="*" element={<LoginPage />} />
            </Routes>
           </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
