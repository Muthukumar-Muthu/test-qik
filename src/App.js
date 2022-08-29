import "./App.css";
import { useState } from "react";
function App() {
  const [row, setRow] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [createFlag, setCreateFlag] = useState(false);
  const [editUser, setEditUser] = useState(null);
  function createUser(user) {
    setRow((p) => [...p, user]);
  }
  updateLocalStorage(row);
  function deleteUser(id) {
    const r = window.confirm("delete user?");
    if (!r) return;
    setRow((p) => p.filter((user) => user.id !== id));
  }
  function updateUser(updatedUser) {
    setRow((p) =>
      p.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }
  return (
    <div className="App">
      <CreateButton setCreateFlag={setCreateFlag} />
      <Table
        row={row}
        createFlag={createFlag}
        setCreateFlag={setCreateFlag}
        createUser={createUser}
        deleteUser={deleteUser}
        setEditUser={setEditUser}
        editUser={editUser}
        updateUser={updateUser}
      />
    </div>
  );
}
function updateLocalStorage(data) {
  localStorage.setItem("users", JSON.stringify(data));
}
function CreateButton({ setCreateFlag }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        setCreateFlag(true);
      }}
    >
      Create
    </button>
  );
}

function Table({
  row,
  createFlag,
  setCreateFlag,
  createUser,
  deleteUser,
  setEditUser,
  editUser,
  updateUser,
}) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
        {row.map((user, index) => {
          return editUser === user.id ? (
            <EditInput
              setEditUser={setEditUser}
              key={user.id}
              defaultData={user}
              updateUser={updateUser}
            />
          ) : (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditUser(user.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete Account
                </button>
              </td>
            </tr>
          );
        })}
        {createFlag && (
          <CreateInput setCreateFlag={setCreateFlag} createUser={createUser} />
        )}
      </tbody>
    </table>
  );
}
function EditInput({ setEditUser, defaultData, updateUser }) {
  const [data, setData] = useState(
    defaultData || { email: "", id: "", name: "", role: "" }
  );

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((p) => {
      return { ...p, [name]: value };
    });
  }

  function submitHandler() {
    const { email, id, name, role } = data;
    if (!email || !id || !name || !role) {
      alert("All details are must");
      return;
    }
    updateUser(data);
    setEditUser(null);
    setData({ email: "", id: "", name: "", role: "" });
  }
  return (
    <tr>
      <td>
        <input
          type="number"
          value={data.id}
          onChange={changeHandler}
          name="id"
          required
          id="id"
        />
      </td>
      <td>
        <input
          type="text"
          value={data.name}
          onChange={changeHandler}
          name="name"
          required
          id="name"
        />
      </td>
      <td>
        <input
          type="text"
          value={data.role}
          onChange={changeHandler}
          name="role"
          required
          id="role"
        />
      </td>
      <td>
        <input
          type="email"
          value={data.email}
          onChange={changeHandler}
          name="email"
          required
          id="email"
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Save
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => setEditUser(null)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

function CreateInput({ setCreateFlag, createUser, defaultData }) {
  const [data, setData] = useState(
    defaultData || { email: "", id: "", name: "", role: "" }
  );

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((p) => {
      return { ...p, [name]: value };
    });
  }

  function submitHandler() {
    const { email, id, name, role } = data;
    if (!email || !id || !name || !role) {
      alert("All details are must");
      return;
    }
    createUser(data);
    setData({ email: "", id: "", name: "", role: "" });
  }
  return (
    <tr>
      <td>
        <input
          type="number"
          value={data.id}
          onChange={changeHandler}
          name="id"
          required
          id="id"
        />
      </td>
      <td>
        <input
          type="text"
          value={data.name}
          onChange={changeHandler}
          name="name"
          required
          id="name"
        />
      </td>
      <td>
        <input
          type="text"
          value={data.role}
          onChange={changeHandler}
          name="role"
          required
          id="role"
        />
      </td>
      <td>
        <input
          type="email"
          value={data.email}
          onChange={changeHandler}
          name="email"
          required
          id="email"
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => setCreateFlag(false)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
export default App;
