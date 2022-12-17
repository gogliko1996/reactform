import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const [isupdate, setIsupdate] = useState(false);
  //users array
  const [users, setusers] = useState([]);
  //chekbox input
  const [inputChecked, setInputChecked] = useState("");
  //add user value name
  const [inputValue, setInputValue] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
  });
  //inputvalue objeqt values
  const oNinputChange = () => {
    const newInputName = { ...inputValue };

    newInputName.name = nameRef.current.value;
    newInputName.lastname = lastnameRef.current.value;
    newInputName.email = emailRef.current.value;
    newInputName.age = ageRef.current.value;

    setInputValue(newInputName);
  };
  //checkbox clic
  const onCheckbox = (e) => {
    setInputChecked(e.target.value);
  };

  const addUser = (event) => {
    event.preventDefault();
    //new user objeqt
    if (!isupdate) {
      const user = {
        id: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        name: nameRef.current.value,
        lastname: lastnameRef.current.value,
        email: emailRef.current.value,
        age: ageRef.current.value,
        gender: inputChecked,
      };

      const newUser = [...users, user];

      setusers(newUser);
    } else {
      const newUsers = [...users];

      for (let index in newUsers) {
        if (newUsers[index].id === inputValue.id) {
          newUsers[index] = inputValue;
          break;
        }
      }

      setusers(newUsers);
    }
    ///inputvalues objeqt value clear
    const newInputName = { ...inputValue };

    newInputName.name = "";
    newInputName.lastname = "";
    newInputName.email = "";
    newInputName.age = "";

    setInputValue(newInputName);
    setInputChecked("");
    setIsupdate(false);
  };
  console.log(inputValue);

  const deleteUser = (id) => {
    const newUser = [...users];

    const filterUser = newUser.filter((people) => {
      return people.id !== id;
    });

    setusers(filterUser);
  };

  const updateUser = (id) => {
    setIsupdate(true);
    const newUser = [...users];
    let newInputName = { ...inputValue };

    newUser.map((people) => {
      if (people.id === id) {
        newInputName = people;
      }
    });

    setInputValue(newInputName);
  };

  return (
    <div>
      <form>
        <input
          value={inputValue.name}
          ref={nameRef}
          onChange={oNinputChange}
          placeholder="name"
        />
        <input
          value={inputValue.lastname}
          ref={lastnameRef}
          onChange={oNinputChange}
          placeholder="lastname"
        />
        <input
          value={inputValue.email}
          ref={emailRef}
          onChange={oNinputChange}
          placeholder="email"
        />
        <input
          type="number"
          value={inputValue.age}
          ref={ageRef}
          onChange={oNinputChange}
          placeholder="age"
        />
        <input
          type="checkbox"
          value="women"
          onChange={onCheckbox}
          checked={inputChecked === "women"}
        />{" "}
        {"  "} women
        <input
          type="checkbox"
          value="man"
          onChange={onCheckbox}
          checked={inputChecked === "man"}
        />{" "}
        {"  "} man
        <button onClick={addUser}> {isupdate ? "update" : "add"} </button>
      </form>

      <div className="users">
        {users.map((people) => {
          return (
            <ul key={people.id}>
              <li> name: {people.name}</li>
              <li> lastname: {people.lastname}</li>
              <li> email: {people.email}</li>
              <li> age: {people.age}</li>
              <li> gender: {people.gender}</li>
              <button onClick={() => deleteUser(people.id)}>delete</button>
              <button onClick={() => updateUser(people.id)}>update</button>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
