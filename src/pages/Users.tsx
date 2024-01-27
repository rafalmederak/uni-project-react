import React, { useState } from "react";
import "styles/users.css";
import { User, UsersProps } from "interfaces/User";

const Users = ({ users }: UsersProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value.toLowerCase());

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.company.name.toLowerCase().includes(searchTerm)
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
        {filteredUsers.map((user: User) => (
          <div className="user-card" key={user.id}>
            <img
              src={"https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg"}
              alt={`User ${user.id}`}
            />
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
