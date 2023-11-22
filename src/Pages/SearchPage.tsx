import axios from "axios"
import "./SearchPage.css"
import { useEffect, useState } from "react"
import { Select, Pagination } from "antd"
import Dog from "../Types/Dog"

interface SearchPageProps {
    handleLogout: () => void
}

const SearchPage = ({ handleLogout }: SearchPageProps) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [selectedSort, setSelectedSort] = useState("asc");
    const [index, setIndex] = useState(1);
    const [numResults, setNumResults] = useState(1);

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

        setDogBreeds(breedOptions);
    }

    const getDogs = async () => {

        console.log(index);

        const searchResult = await axios.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search`,
            {
                params: {
                    breeds: selectedBreeds,
                    sort: `breed:${selectedSort}`,
                    from: (index - 1) * 25,
                },
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );

        console.log(searchResult);
        setNumResults(searchResult.data.total);

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

    const handlePageChange = async (page: number) => {
        setIndex(page);
    }

    const handleSearch = () => {
        setIndex(1);
        
    }

    useEffect(() => {
        getDogBreeds()
        getDogs();
    }, [])

    useEffect(() => {
        getDogs();
    }, [index]);

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
                options={dogBreeds}
                onChange={(value) => setSelectedBreeds(value)}
                mode="multiple"
                allowClear={true}
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
                onChange={(value) => setSelectedSort(value)}
            />
            <button onClick={handleSearch}>Submit</button>

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

            <Pagination defaultCurrent={1} current={index} pageSize={25} total={numResults} onChange={handlePageChange} showSizeChanger={false}/>
        </div>
    )
}

export default SearchPage