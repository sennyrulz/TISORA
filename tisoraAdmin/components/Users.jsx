// Dashboard.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';

function User() {
  const [users, setUsers] = useState([]);
  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  useEffect(() => {
    axios.get("/api/user/all", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map(user => (
          <div key={user._id}>{user.fullName}</div>
        ))
      )}
    </div>
  );
}

export default User;
