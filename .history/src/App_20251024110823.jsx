// ============================================
// FINAL TEST FRONTEND
// App.jsx - Complete HTTPOnly Cookie Flow
// ============================================

import axios from "axios";
import { auth, signInWithCustomToken } from "./lib/firebase";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API_URL = "http://localhost:3001/api";

// Configure axios to send cookies
axios.defaults.withCredentials = true;

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);

  // WebSocket state
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Step 1: Login → Backend sets HTTPOnly cookie
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { 
        email, 
        password 
      });

      setUser(res.data.user);
      
      // Exchange custom token for Firebase ID token
      if (res.data.customToken) {
        const userCredential = await signInWithCustomToken(auth, res.data.customToken);
        setFirebaseUser(userCredential.user);
        
        setResponse({ 
          message: "✓ Login successful", 
          details: "Cookie set, Firebase authenticated",
          user: res.data.user 
        });
      }
    } catch (err) {
      console.error(err);
      setResponse({ error: err.response?.data?.message || "Login failed" });
    }
  };

  // Get current user from cookie
  const handleGetMe = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      setUser(res.data.user);
      setResponse({ 
        message: "✓ Authenticated via cookie", 
        user: res.data.user 
      });
    } catch (err) {
      setUser(null);
      setResponse({ 
        error: err.response?.data?.message || "Not authenticated",
        hint: "Please login first"
      });
    }
  };

  // Verify authentication
  const handleVerify = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/verify`);
      setResponse({ 
        message: "✓ Token verified", 
        user: res.data.user 
      });
    } catch (err) {
      setResponse({ error: err.response?.data?.message || "Verify failed" });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setUser(null);
      setFirebaseUser(null);
      setResponse({ message: "✓ Logged out - Cookie cleared" });
      
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      
      if (auth.currentUser) {
        await auth.signOut();
      }
    } catch (err) {
      setResponse({ error: err.response?.data?.message || "Logout failed" });
    }
  };

  // WebSocket connection
  const handleConnectWebSocket = async () => {
    try {
      if (!auth.currentUser) {
        setResponse({ error: "Please login first to connect WebSocket" });
        return;
      }

      const idToken = await auth.currentUser.getIdToken();
      
      const s = io("http://localhost:3001", {
        auth: { token: idToken },
        transports: ["websocket"],
        withCredentials: true,
      });

      s.on("connect", () => {
        console.log("Connected to WebSocket:", s.id);
        setResponse({ message: "✓ WebSocket connected" });
      });

      s.on("notification", (data) => {
        console.log("Notification received:", data);
        setNotifications((prev) => [
          { ...data, receivedAt: new Date().toISOString() }, 
          ...prev
        ]);
      });

      s.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
      });

      s.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
        setResponse({ error: "WebSocket connection failed: " + error.message });
      });

      setSocket(s);
    } catch (err) {
      console.error("Error connecting WebSocket:", err);
      setResponse({ error: "Failed to get Firebase token: " + err.message });
    }
  };

  const handleSubscribe = () => {
    if (socket && user) {
      socket.emit("subscribe", user.id);
      setResponse({ message: `✓ Subscribed to notifications for ${user.fullName}` });
    }
  };

  const handleDisconnectWebSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setResponse({ message: "✓ WebSocket disconnected" });
    }
  };

  // Test notification
  const handleTestNotification = async () => {
    if (!user) {
      setResponse({ error: "Please login first" });
      return;
    }

    try {
      await axios.post(`${API_URL}/notifications/test`, {
        userId: user.id,
        message: "Test notification at " + new Date().toLocaleTimeString(),
      });
      setResponse({ message: "✓ Test notification sent" });
    } catch (err) {
      setResponse({ error: "Failed to send test notification" });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // Check auth status on mount
  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>🎓 Academic Procedures - Auth Test</h1>
      <p style={{ color: "#666", marginBottom: 30 }}>
        Using HTTPOnly Cookies + Firebase Authentication
      </p>

      {/* Authentication Section */}
      <div style={{ marginBottom: 20, padding: 20, backgroundColor: "#f8f9fa", borderRadius: 8, border: "1px solid #dee2e6" }}>
        <h2>🔐 Authentication</h2>

        {user ? (
          <div style={{ padding: 15, backgroundColor: "#d4edda", borderRadius: 4, marginBottom: 15, border: "1px solid #c3e6cb" }}>
            <strong>✓ Logged in as:</strong><br />
            <div style={{ marginTop: 8 }}>
              <strong>Name:</strong> {user.fullName}<br />
              <strong>Email:</strong> {firebaseUser?.email || "N/A"}<br />
              <strong>Role:</strong> {user.role}<br />
              <strong>University:</strong> {user.university}
            </div>
          </div>
        ) : (
          <div style={{ padding: 15, backgroundColor: "#fff3cd", borderRadius: 4, marginBottom: 15, border: "1px solid #ffeaa7" }}>
            <strong>⚠ Not authenticated</strong> - Please login
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 10, border: "1px solid #ced4da", borderRadius: 4 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 15, padding: 10, border: "1px solid #ced4da", borderRadius: 4 }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={handleLogin} style={buttonStyle("#007bff")}>
            Login
          </button>
          <button onClick={handleVerify} disabled={!user} style={buttonStyle("#17a2b8")}>
            Verify
          </button>
          <button onClick={handleGetMe} style={buttonStyle("#6c757d")}>
            Get Me
          </button>
          <button onClick={handleLogout} disabled={!user} style={buttonStyle("#dc3545")}>
            Logout
          </button>
        </div>
      </div>

      {/* WebSocket Section */}
      <div style={{ marginBottom: 20, padding: 20, backgroundColor: "#f8f9fa", borderRadius: 8, border: "1px solid #dee2e6" }}>
        <h2>📡 Real-time Notifications</h2>

        {socket ? (
          <div style={{ padding: 15, backgroundColor: "#d1ecf1", borderRadius: 4, marginBottom: 15, border: "1px solid #bee5eb" }}>
            <strong>✓ WebSocket Connected</strong> - Listening for notifications
          </div>
        ) : (
          <div style={{ padding: 15, backgroundColor: "#f8d7da", borderRadius: 4, marginBottom: 15, border: "1px solid #f5c6cb" }}>
            <strong>✗ WebSocket Disconnected</strong>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 15 }}>
          <button 
            onClick={handleConnectWebSocket} 
            disabled={!user || socket}
            style={buttonStyle("#28a745")}
          >
            Connect WebSocket
          </button>
          <button 
            onClick={handleSubscribe} 
            disabled={!socket}
            style={buttonStyle("#17a2b8")}
          >
            Subscribe
          </button>
          <button 
            onClick={handleDisconnectWebSocket} 
            disabled={!socket}
            style={buttonStyle("#dc3545")}
          >
            Disconnect
          </button>
          <button 
            onClick={handleTestNotification} 
            disabled={!user}
            style={buttonStyle("#ffc107")}
          >
            Send Test
          </button>
        </div>

        <h3>📨 Notifications ({notifications.length}):</h3>
        <div style={{ 
          maxHeight: 400, 
          overflowY: "auto", 
          backgroundColor: "#fff", 
          border: "1px solid #dee2e6", 
          borderRadius: 4,
          padding: 10
        }}>
          {notifications.length === 0 ? (
            <p style={{ color: "#6c757d", textAlign: "center", padding: 20 }}>
              No notifications yet. Click "Send Test" to try it out!
            </p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} style={{ 
                marginBottom: 10, 
                padding: 12, 
                backgroundColor: "#e7f3ff", 
                borderRadius: 4,
                borderLeft: "4px solid #007bff"
              }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>
                  {n.receivedAt}
                </div>
                <pre style={{ margin: 0, fontSize: 13, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(n, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Response Section */}
      <div style={{ padding: 20, backgroundColor: "#f8f9fa", borderRadius: 8, border: "1px solid #dee2e6" }}>
        <h2>📋 API Response:</h2>
        <pre style={{ 
          backgroundColor: "#fff", 
          padding: 15, 
          borderRadius: 4, 
          overflow: "auto",
          maxHeight: 400,
          border: "1px solid #dee2e6",
          fontSize: 13
        }}>
          {response ? JSON.stringify(response, null, 2) : "No response yet"}
        </pre>
      </div>

      {/* Instructions */}
      <div style={{ marginTop: 20, padding: 20, backgroundColor: "#fff3cd", borderRadius: 8, border: "1px solid #ffeaa7" }}>
        <h3>💡 Quick Guide:</h3>
        <ol style={{ lineHeight: 2, marginBottom: 0 }}>
          <li>Enter credentials and click <strong>Login</strong></li>
          <li>Server sets HTTPOnly cookie automatically</li>
          <li>Click <strong>Connect WebSocket</strong> for real-time updates</li>
          <li>Click <strong>Subscribe</strong> to receive notifications</li>
          <li>Click <strong>Send Test</strong> to try a test notification</li>
          <li>All authenticated requests use the cookie automatically</li>
        </ol>
      </div>
    </div>
  );
}

// Helper function for button styles
function buttonStyle(color) {
  return {
    padding: "10px 20px",
    border: "none",
    borderRadius: 4,
    backgroundColor: color,
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "opacity 0.2s",
  };
}