import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Component/Table";
const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState();
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);

  const [nameUpdate, setNameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [idUpdate, setIdUpdate] = useState(null);
  let changeTable = 0;
  const baseURL = "http://127.0.0.1:8000/api/users";

  const createUser = async () => {
    await axios
      .post(baseURL, {
        name,
        email,
        password,
      })
      .then((responce) => {
        console.log(responce);
        setUsers((users) => [
          ...users,
          { id: responce.data.data.id, name: name, email: email },
        ]);
        changeTable++;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getUsers = async () => {
    await axios
      .get(baseURL)
      .then((responce) => {
        setUsers(responce.data);
        changeTable++;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getUserId = async (id) => {
    await axios
      .get(`${baseURL}/${id}`)
      .then((responce) => {
        const user = responce.data;
        setSearchedUser((currentUser) => {
          return user;
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const updateUserById = async (id) => {
    await axios
      .put(`${baseURL}/${id}`, { name: nameUpdate, email: emailUpdate })
      .then((responce) => {
        console.log(responce);
        changeTable++;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getUsers();
  }, [changeTable]);
  const config = [
    {
      title: "Id",
      render: (user) => {
        return user.id;
      },
    },
    {
      title: "Name",
      render: (user) => {
        return user.name;
      },
    },
    {
      title: "E-mail",
      render: (user) => {
        return user.email;
      },
    },
  ];
  const getKey = (user) => {
    return user.id;
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handleCreateClick = (event) => {
    event.preventDefault();
    createUser();
    setName("");
    setEmail("");
    setPassword("");
  };
  const handleSearchClick = (event) => {
    event.preventDefault();
    getUserId(id);
    setId(null);
  };

  const handleNameUpdateChange = (event) => {
    setNameUpdate(event.target.value);
  };
  const handleEmailUpdateChange = (event) => {
    setEmailUpdate(event.target.value);
  };
  const handleIdUpdateChange = (event) => {
    setIdUpdate(event.target.value);
  };
  const handleUpdateClick = (event) => {
    event.preventDefault();
    updateUserById(idUpdate);
    setNameUpdate("");
    setEmailUpdate("");
    setIdUpdate(null);
  };

  let renderUser = searchedUser ? (
    <div>
      Name:{" "}
      <p>
        <b>{searchedUser.name}</b>
      </p>
      E-mail: <p>{searchedUser.email}</p>
    </div>
  ) : null;

  return (
    <div>
      <h1>Users</h1>
      <hr />
      <Table data={users} config={config} getKey={getKey} />
      <h1>Create a user</h1>
      <hr />
      <form>
        <label>Name : </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <label>E-mail : </label>
        <br />
        <input
          type="email"
          placeholder="E-mail"
          onChange={handleEmailChange}
          value={email}
        />
        <br />
        <label>Password : </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        <br />
        <button type="submit" onClick={handleCreateClick}>
          Create
        </button>
      </form>
      <h1>Search by Id.</h1>
      <hr />
      <form>
        <label>Name : </label>
        <br />
        <input
          type="number"
          placeholder="Id."
          onChange={handleIdChange}
          value={id}
        />
        <br />
        <button type="submit" onClick={handleSearchClick}>
          Search
        </button>
      </form>
      {renderUser}
      <h1>Update user</h1>
      <hr />
      <form>
        <label>Name : </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          onChange={handleNameUpdateChange}
          value={nameUpdate}
        />
        <br />
        <label>E-mail : </label>
        <br />
        <input
          type="email"
          placeholder="E-mail"
          onChange={handleEmailUpdateChange}
          value={emailUpdate}
        />
        <br />
        <label>Id. : </label>
        <br />
        <input
          type="number"
          placeholder="Id."
          onChange={handleIdUpdateChange}
          value={idUpdate}
        />
        <br />
        <button type="submit" onClick={handleUpdateClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default App;
