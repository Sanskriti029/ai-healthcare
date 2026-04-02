import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Menu, X,Bell} from "lucide-react";
import { useState,useEffect } from "react";
import api from "/src/api";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
 useEffect(() => {
    if (!token || !userId) return;

    const fetchUnread = async () => {
      try {
        const res = await api.get(`/api/messages/${userId}/unread-count`);
        setUnreadCount(res.data.unread_count);
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, [token, userId]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/login");
  };


  const navItems = [
    { label: "Home", path: "/" },

    ...(token
      ? [
          { label: "Symptom Analyzer", path: "/triage" },
          { label: "Appointment", path: "/appointment" },
          // { label: "Dashboard", path: "/dashboard" },
          { label: "Search", path: "/search" },
          ...(role === "admin" ? [{ label: "Dashboard", path: "/admin" }] : []),
          // { label: "Healthcare Dashboard", path: "/healthcare-dashboard" },

          // { label: "Doctor", path: "/doctors" },
          // { label: "Pharmacy", path: "/pharmacies" },
          // { label: "Hospital", path: "/hospitals" },

          ...(role === "user"
            ? [{ label: "Dashboard", path: "/user-dashboard" }]
            : []),
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-800">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">
            AI Healthcare
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-teal-800 hover:text-white ${
                location.pathname === item.path
                  ? "bg-teal-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {token && (
            <Link
              to="/messages"
              className="relative p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-teal-800 hover:text-gray"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-gray hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 "
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-black border-gray-8000  px-4 py-4 md:hidden space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}

 {token && (
            <Link
              to="/messages"
              onClick={() => setMobileOpen(false)}
              className="text-lg hover:text-blue-400 transition flex items-center gap-2"
            >
              🔔 Messages {unreadCount > 0 && `(${unreadCount})`}
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-primary px-4 py-2 text-sm text-white"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="block w-full rounded-lg bg-primary px-4 py-2 text-sm text-white"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
