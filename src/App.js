import { useState, useReducer } from "react";

const logInReducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case"logIn": {
      return {
        ...state,
        error: "",
      }
    }
      case "success": {
        return {
          ...state,
          loggedIn: true,
          password: "",
        }
      }
      case "error": {
        return {
          ...state,
          error: "Incorrect username or password",
          loggedIn: false,
          username: "",
          password: "",
        }
      }
      case "logOut": {
        return {
          ...state,
          loggedIn: false,
        }
      }
      default: return state;
  }
};

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatcher] = useReducer(logInReducer, {
    username: "",
    password: "",
    loggedIn: false,
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (username === "Jerry" && password === "Tom") {
        setLoggedIn(true);
      } else {
        throw Error;
      }
      setPassword("");
    } catch (err) {
      setError("Incorrect username or password");
      setUserName("");
      setPassword("");
    }
  };
  return (
    <>
      <h1
        className="text-center text-3xl font-semibold mt-2
    py-4"
      >
        useReducer
      </h1>
      <div>
        {loggedIn ? (
          <>
            <div className="flex flex-vol items-center gap-4">
              <h2
                className="text-center text-3xl mt-4
              py-2"
              >
                Welcome {username}!
              </h2>
              <button
                className="bg-blue-600 text-white text-lg
        font-medium rounded-lg py-1 px-3"
                onClick={() => setLoggedIn(false)}
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center
    gap-4 mt-4 py-2"
          >
            <input
              className="border rounded-lg px-2 py-1"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="border rounded-lg px-2 py-1"
              type="password"
              autoComplete="current-password"
              placeholder="Username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white text-lg
        font-medium rounded-lg py-1 px-3"
              type="submit"
            >
              Log In
            </button>
            <p className="text-red-500 text-center">{error}</p>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
