import axios from "axios"
import "./SearchPage.css"

interface SearchPageProps {
    handleLogout: () => void
}

const SearchPage = ({handleLogout}: SearchPageProps) => {

    return (
        <div>
            <nav id="navbar">
                <div id="logo">Woof!</div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <h1>Search Page</h1>
        </div>
    )
}

export default SearchPage