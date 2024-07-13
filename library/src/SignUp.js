import { useState } from "react";
function SignUp() {
  const [UserData, setData] = useState({
    //use State hook return index into to index [ value , function used to update value ]
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(UserData));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name : </label>
        <input
          type="text"
          id="firstname"
          value={UserData.firstname}
          onChange={(e) => {
            setData({ ...UserData, firstname: e.target.value });
          }}
        ></input>
        <br />
        <br />
        <br />
        <label htmlFor="lastname">Last Name : </label>
        <input
          type="text"
          id="lastname"
          value={UserData.lastname}
          onChange={(e) => {
            setData({ ...UserData, lastname: e.target.value });
          }}
        ></input>
        <br />
        <br />
        <br />
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          id="email"
          value={UserData.email}
          onChange={(e) => {
            setData({ ...UserData, email: e.target.value });
          }}
        ></input>
        <br />
        <br />
        <br />
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          id="password"
          value={UserData.password}
          onChange={(e) => {
            setData({ ...UserData, password: e.target.value });
          }}
        ></input>
        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default SignUp;
