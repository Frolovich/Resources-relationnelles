import React from 'react';

function ModeratorDashboard({ user }) {
  return (
    <div>
      <h1>Tableau de bord du modérateur</h1>
      <p>Bonjour, {user.email}</p>
    </div>
  );
}

export default ModeratorDashboard;