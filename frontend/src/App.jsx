import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
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
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const user = { id: 1, name: "Soufiane", role: "Administrateur" };
  const token = localStorage.getItem("token");

  return (
    <Router>
      {/* ✅ إذا ما كاينش token → عرض فقط Login/Register */}
      {!token ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        // ✅ إذا كاين token → عرض Sidebar + Header + باقي الصفحات
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header user={user} />
            <main className="flex-1 p-6 bg-gray-50">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    <PrivateRoute>
                      <TicketsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ticket/:id"
                  element={
                    <PrivateRoute>
                      <TicketPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-ticket"
                  element={
                    <PrivateRoute>
                      <CreateTicketPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-ticket/:id"
                  element={
                    <PrivateRoute>
                      <EditTicket />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PrivateRoute>
                      <ReportsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <UsersPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-user"
                  element={
                    <PrivateRoute>
                      <CreateUser />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-user/:id"
                  element={
                    <PrivateRoute>
                      <EditUser />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
