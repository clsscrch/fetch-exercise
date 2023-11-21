import { useEffect, useState } from 'react'
import LoginPage from './Pages/LoginPage'
import axios from 'axios';
import SearchPage from './Pages/SearchPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if auth token exists. If it does, render the search page. If not, render the login page.
  useEffect(() => {
    (async () => {
      try {
        await axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true
        });

        setIsLoggedIn(true);

      } catch (err) {
        // console.log(err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {},
      { withCredentials: true }
    )
    setIsLoggedIn(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
      email: "a@a.com",
      name: "a",
    }, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true
    });

    // await axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
    //   email: email,
    //   name: name,props
    // }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   withCredentials: true
    // })
    setIsLoggedIn(true);
  }


  return (
    <div className="App">
      {isLoggedIn ? <SearchPage handleLogout={handleLogout} /> : <LoginPage handleLogin={handleLogin}/>}
    </div>
  );

}

export default App
