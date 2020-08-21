import React from "react";
import "./style.css";

const Users = ({ users, yourUser }) => {
  return (
    <div className="users_comp">
      <p className="title">Users:</p>
      {users.map((user, index) => (
        <React.Fragment key={`user-${index}`}>
          <p>{index + 1} - {user} {(yourUser === user) ? " (você)" : ""}</p>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Users;
