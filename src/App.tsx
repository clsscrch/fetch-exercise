import { useEffect, useState } from 'react'
import LoginPage from './Pages/LoginPage/LoginPage'
import axios from 'axios';
import SearchPage from './Pages/SearchPage/SearchPage';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if auth token exists. If it does, render the search page. If not, render the login page.
  useEffect(() => {
    (async () => {
      try {
        await axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });

        setIsLoggedIn(true);

      } catch (err) {
        
      }
    })();
  }, []);

  const handleLogout = async () => {
    await axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {},
      { withCredentials: true }
    )
    setIsLoggedIn(false);
  }

  const handleLogin = async (e: React.FormEvent, email:string, name: String) => {
    e.preventDefault();

    try {
      await axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
        email: email,
        name: name,
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      setIsLoggedIn(true);
    }  catch (err) {
      alert("Error logging in. Please try again.")
    }
  }



  return (
    <div className="App">
      {isLoggedIn ? <SearchPage handleLogout={handleLogout} /> : <LoginPage handleLogin={handleLogin} />}
    </div>
  );

}

export default App
