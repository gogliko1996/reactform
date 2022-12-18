import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const [outError, setOutError] = useState({});
  const errorUser = {};

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
  const oNinputChange = (e) => {
    if (e.target.value.length < 4) {
      errorUser.name = "The minimum number of characters is less than four";
    }
    if (e.target.value.length < 4) {
      errorUser.lastname = "The minimum number of characters is less than four";
    }
    if (e.target.value.match("@gmail.com")) {
    } else {
      errorUser.email = "goEnter a valid emailga";
    }
    if (e.target.value < 18) {
      errorUser.age = "Minimum age is 18 years";
    }
    if (inputChecked === "") {
      errorUser.gender = "gMarking is mandatoryoga";
    }

    setTimeout(() => {
      setOutError(errorUser);
    }, 5000);

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

    if (nameRef.current.value.length < 4) {
      errorUser.name = "The minimum number of characters is less than four";
    }
    if (lastnameRef.current.value.length < 4) {
      errorUser.lastname = "The minimum number of characters is less than four";
    }
    if (emailRef.current.value.match("@gmail.com")) {
    } else {
      errorUser.email = "Enter a valid email";
    }
    if (ageRef.current.value < 18) {
      errorUser.age = "Minimum age is 18 years";
    }
    if (inputChecked === "") {
      errorUser.gender = "gMarking is mandatoryoga";
    }

    if (Object.keys(errorUser).length === 0) {
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
    }
    setOutError(errorUser);
  };

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
      <form className="form">
        <input
          value={inputValue.name}
          ref={nameRef}
          onChange={oNinputChange}
          placeholder="name"
        />
        <p>{outError.name}</p>
        <input
          value={inputValue.lastname}
          ref={lastnameRef}
          onChange={oNinputChange}
          placeholder="lastname"
        />
        <p>{outError.lastname}</p>
        <input
          value={inputValue.email}
          name="email"
          ref={emailRef}
          onChange={oNinputChange}
          placeholder="email"
        />
        <p>{outError.email}</p>
        <input
          type="number"
          value={inputValue.age}
          ref={ageRef}
          onChange={oNinputChange}
          placeholder="age"
        />
        <p>{outError.age}</p>
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
        <p>{outError.gender}</p>
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
