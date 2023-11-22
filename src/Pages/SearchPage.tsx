import axios from "axios"
import "./SearchPage.css"
import { useEffect, useState } from "react"
import { Select } from "antd"
import Dog from "../Types/Dog"

interface SearchPageProps {
    handleLogout: () => void
}

const SearchPage = ({ handleLogout }: SearchPageProps) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);

    const getDogBreeds = async () => {
        const breeds = await axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );

        const breedOptions = breeds.data.map((breed: string) => {
            return {
                label: breed,
                value: breed
            }
        });

        breedOptions.unshift({
            label: "All",
            value: "All"
        });

        setDogBreeds(breedOptions);
    }

    const getDogs = async () => {
        const searchResult = await axios.get<SearchResult>("https://frontend-take-home-service.fetch.com/dogs/search",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );


        const dogIds = searchResult.data.resultIds

        const dogs = await axios.post("https://frontend-take-home-service.fetch.com/dogs",
            dogIds,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );

        
        console.log(dogs);
        setDogs(dogs.data);
    }


    useEffect(() => {
        getDogBreeds()
        // console.log(getAllDogIDs());
        getDogs();
    }, [])


    return (
        <div>
            <nav id="navbar">
                <div id="logo">Woof!</div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            {/* Search bar and stuff */}
            <h1>Search Page</h1>
            <Select 
                style={{ width: 240 }}
                defaultValue={"All"}
                options={dogBreeds}
            />
            <Select
                style={{ width: 120 }}
                defaultValue={"A-Z"}
                options={[
                    {
                        label: "A-Z",
                        value: "asc"
                    },
                    {
                        label: "Z-A",
                        value: "desc"
                    }
                ]}
            />
            <button>Submit</button>

            <div id="dogsContainer">
                {dogs.map((dog: Dog) => {
                    return (
                        <div className="dogComponent" key={dog.id} style={{ backgroundImage: `url(${dog.img})` }}>
                            <div className="doginfo">
                                <h2>{dog.name}<span className="age">, {dog.age}</span></h2>
                                <p>{dog.breed}</p>
                                <p>{dog.zip_code}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SearchPage