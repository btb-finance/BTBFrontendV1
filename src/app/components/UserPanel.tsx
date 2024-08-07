// src/app/components/UserPanel.tsx
// Component to display user-specific information and actions, such as wallet details.
import React from 'react';

interface User {
  name: string;
  wallet: string;
  disconnect: () => void;
}

interface UserPanelProps {
  user: User;
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => (
  <div className="user-panel">
    <h3>Welcome, {user.name}</h3>
    <p>Wallet: {user.wallet}</p>
    <button onClick={user.disconnect}>Disconnect</button>
  </div>
);

export default UserPanel;
