import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const [load, setLoad] = useState(false); /// სანამ სერვერიდან ინფორმაცია ეკრანზე გამოვა
  const [data, setData] = useState([]); ///სერვერიდან დაბრუნებული ინფორმაცია
  const [error, setError] = useState(null); ///სერვერის ეროროის დროს რასაც გამოიტანს
  const [fieldValue, setFielValue] = useState(""); ///წერისას ვალიდაციის შემოწმებისთვის
  const [outError, setOutError] = useState({}); ///ვალიდაციის ერორების სტეიტი
  const errorUser = {}; // ვალიდაციის ერორების obj
  const [isupdate, setIsupdate] = useState(false); ///დამატების ფუნცქიონალისტვის რომ მიხვდედ როდის დაამატოს და როდი განაახლოს
  const [inputChecked, setInputChecked] = useState(""); //გენდერის სტეიტი
  const [inputValue, setInputValue] = useState({
    ///add user value name
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
  });
  const [user, setuser] = useState({}); // user obj

  // const instance = axios.create({
  //   baseURL: "http://localhost:3001",
  // });

  const handleBlur = (e) => {
    ///წერისდროს შემოწმებისთვის ვალიდაცია
    setFielValue(e.target.name);
  };

  const oNinputChange = (e) => {
    //inputvalue objeqt values
    ///ვალიდაცია ჩაწერის დროს რომ გამოგიტანოს შეცდომა
    if (fieldValue === "name") {
      if (e.target.value.length < 4) {
        errorUser.name = "The minimum number of characters is less than four";
      }
    }
    if (fieldValue === "lastname") {
      if (e.target.value.length < 4) {
        errorUser.lastname =
          "The minimum number of characters is less than four";
      }
    }
    if (fieldValue === "email") {
      if (e.target.value.match("@gmail.com")) {
      } else {
        errorUser.email = "goEnter a valid emailga";
      }
    }
    if (fieldValue === "age") {
      if (e.target.value < 18) {
        errorUser.age = "Minimum age is 18 years";
      }
    }

    setTimeout(() => {
      setOutError(errorUser);
    }, 1500);

    const newInputName = { ...inputValue };
    const newUser = { ...user };
    /////ინპუთის value ველის ობიექტი
    newInputName.firstName = nameRef.current.value;
    newInputName.lastName = lastnameRef.current.value;
    newInputName.email = emailRef.current.value;
    newInputName.age = ageRef.current.value;
    ////იუსერების ობიექტი
    newUser.firstName = nameRef.current.value;
    newUser.lastName = lastnameRef.current.value;
    newUser.email = emailRef.current.value;
    newUser.age = ageRef.current.value;
    setuser(newUser);
    setInputValue(newInputName);
  };
  //checkbox clic
  const onCheckbox = (e) => {
    const newUser = { ...user };
    newUser.sex = e.target.value; ///სქესის დამატება იუზერების ობიექტში

    setuser(newUser);
    setInputChecked(e.target.value);
  };

  const addUser = (event) => {
    /// user დამატების ფუნქციონალი
    event.preventDefault();
    //ვალიდაცია დამატების დაკლიკებისას
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
      errorUser.sex = "gMarking is mandatoryoga";
    }

    if (Object.keys(errorUser).length === 0) {
      //როდესაც ერორების ობიექტი ცარიელია მაშინ შემოვა რაუნდა მოხდეს
      if (!isupdate) {
        axios.post("http://localhost:3001/users", user); ///იუსერების გაგზავნა სერვერზე
      } else {
        ///user update add
        console.log("upload", user);
        axios.put(`http://localhost:3001/users/${inputValue._id}`, user);
        console.log("id", inputValue._id);
      }
      /// ინპუთების ველიუების გასუფთავება
      const newInputName = { ...inputValue };

      newInputName.firstName = "";
      newInputName.lastName = "";
      newInputName.email = "";
      newInputName.age = "";

      setInputValue(newInputName);
      setInputChecked("");
      setIsupdate(false);
    }
    setOutError(errorUser);
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`);
  };

  const updateUser = (id) => {
    /// ინპუთებში გადააქვს განახლებაზე დაჭერისას
    setIsupdate(true);
    let newInputName = { ...inputValue };

    data.map((people) => {
      if (people._id === id) {
        newInputName = people;
      }
    });

    setInputValue(newInputName);
  };

  useEffect(() => {
    const userData = async () => {
      setLoad("loading");
      try {
        const { data } = await axios.get("http://localhost:3001/users");
        setData(data.data);
      } catch (error) {
        setError("ERROR");
      } finally {
        setLoad(false);
      }
    };
    userData();
  }, [outError]);

  return (
    <div>
      <form className="form">
        <input
          value={inputValue.firstName}
          name="name"
          ref={nameRef}
          onChange={oNinputChange}
          onFocus={handleBlur}
          placeholder="name"
        />
        <p>{outError.name}</p>
        <input
          value={inputValue.lastName}
          name="lastname"
          ref={lastnameRef}
          onChange={oNinputChange}
          onFocus={handleBlur}
          placeholder="lastname"
        />
        <p>{outError.lastname}</p>
        <input
          value={inputValue.email}
          name="email"
          ref={emailRef}
          onChange={oNinputChange}
          onFocus={handleBlur}
          placeholder="email"
        />
        <p>{outError.email}</p>
        <input
          type="number"
          name="age"
          value={inputValue.age}
          ref={ageRef}
          onChange={oNinputChange}
          onFocus={handleBlur}
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
        <p>{outError.sex}</p>
        <button onClick={addUser}> {isupdate ? "update" : "add"} </button>
      </form>

      <div className="users">
        <h2>{load}</h2>
        {data.map((people) => {
          return (
            <ul key={people._id}>
              <li> name: {people.firstName}</li>
              <li> lastname: {people.lastName}</li>
              <li> email: {people.email}</li>
              <li> age: {people.age}</li>
              <li> gender: {people.sex}</li>
              <button onClick={() => deleteUser(people._id)}>delete</button>
              <button onClick={() => updateUser(people._id)}>update</button>
            </ul>
          );
        })}
      </div>
      <p>{error}</p>
    </div>
  );
}

export default App;
