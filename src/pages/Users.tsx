import React, { useState } from 'react';
import 'styles/users.css';
import { User } from 'interfaces/User';


const usersData: User[] = [
  { id: 1, name: 'User 1', email: 'email1@example.com', company: { name: 'Company 1' } },
  { id: 2, name: 'User 2', email: 'email2@example.com', company: { name: 'Company 2' } },
  { id: 3, name: 'User 3', email: 'email3@example.com', company: { name: 'Company 3' } },
  { id: 4, name: 'User 4', email: 'email4@example.com', company: { name: 'Company 4' } },
  { id: 5, name: 'User 5', email: 'email5@example.com', company: { name: 'Company 5' } },
  { id: 6, name: 'User 6', email: 'email6@example.com', company: { name: 'Company 6' } },

];

const Users = () => {
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value.toLowerCase());

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    (user.company.name.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="users">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>

      <div className="users-container">
        {filteredUsers.map(user => (
          <div className="user-card" key={user.id}>
            <img src={'https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg'} alt={`User ${user.id}`} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {<p>{user.company.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
