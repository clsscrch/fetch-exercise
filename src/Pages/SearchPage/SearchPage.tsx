import axios from "axios"
import "./SearchPage.css"
import { useEffect, useState } from "react"
import { Select, Pagination } from "antd"
import Dog from "../../Types/Dog"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"

interface SearchPageProps {
    handleLogout: () => void
}

interface DogComponentProps {
    dog: Dog,
    likedDogs?: string[],
    toggleLike?: (dogId: string) => void,
}

type Screen = "Search" | "Matched" | "Loading";

const DogComponent = ({ dog, likedDogs, toggleLike }: DogComponentProps) => {
    return (
        <div className="dogComponent" key={dog.id} style={{ backgroundImage: `url(${dog.img})` }}>
            <div className="doginfo">
                <h2>{dog.name}<span className="age">, {dog.age}</span></h2>
                <p>{dog.breed}</p>
                <p>{dog.zip_code}</p>
            </div>
            {toggleLike && likedDogs && <button className="likeButton">
                {likedDogs.includes(dog.id) ?
                    <HeartFilled style={{ fontSize: '28px', color: '#f54272' }} onClick={() => {
                        toggleLike(dog.id);
                    }} />
                    :
                    <HeartOutlined style={{ fontSize: '28px' }} onClick={() => {
                        toggleLike(dog.id);
                    }} />

                }
            </button>
            }
        </div>
    )
}

const SearchPage = ({ handleLogout }: SearchPageProps) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState("asc");
    const [index, setIndex] = useState(1);
    const [numResults, setNumResults] = useState(1);
    const [likedDogs, setLikedDogs] = useState<string[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | undefined>();
    const [screen, setScreen] = useState<Screen>("Search");

    useEffect(() => {
        getDogBreeds()
        getDogs();
    }, [])

    useEffect(() => {
        getDogs();
    }, [index]);

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

        setScreen("Loading");
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

        setDogs(dogs.data);
        setScreen("Search");

    }

    const handlePageChange = async (page: number) => {
        setIndex(page);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };


    const handleSearch = () => {
        setIndex(1);
        getDogs();
    }

    const toggleLike = (dogId: string) => {

        if (likedDogs.includes(dogId)) {
            const newLikedDogs = likedDogs.filter((id) => id !== dogId);
            setLikedDogs(newLikedDogs);
            return;
        }

        setLikedDogs([...likedDogs, dogId]);
    }


    const handleMatch = async () => {
        const matchDogId = await axios.post("https://frontend-take-home-service.fetch.com/dogs/match",
            likedDogs,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );

        const matchDog = await axios.post(`https://frontend-take-home-service.fetch.com/dogs/`,
            [matchDogId.data.match],
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true
            }
        );

        setMatchedDog(matchDog.data[0]);
        setScreen("Matched");
    }

    const Searcher = () => {
        return (
            <div className="searcherContainer">
                <div className="selectors">
                    <Select
                        style={{ width: 480 }}
                        options={dogBreeds}
                        onChange={(value) => {setSelectedBreeds(value)}}
                        value={selectedBreeds}
                        mode="multiple"
                        allowClear={true}
                    />
                    <Select
                        style={{ width: 120 }}
                        defaultValue={"A-Z"}
                        value={selectedSort}
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
                </div>
                <div className="searcherButtons">
                    <button className="primaryButton" onClick={handleSearch}>Search</button>
                </div>
                <Pagination defaultCurrent={1} current={index} pageSize={25} total={numResults} onChange={handlePageChange} showSizeChanger={false} />
    
            </div>
        )
    
    }

    const SearchScreen = () => {
        return (
            <main id="searchMain">
                <h1>🔎 Woof Search</h1>
                <Searcher/>
                <div>
                    <button onClick={handleMatch} className="primaryButton">Find My Furever Friend 🐶</button>
                </div>
                <div id="dogsContainer">
                    {dogs.map((dog: Dog) => {
                        return (
                            <DogComponent dog={dog} likedDogs={likedDogs} toggleLike={toggleLike} key={dog.id} />
                        )
                    })}
                </div>

                <div>
                    <button onClick={handleMatch} className="primaryButton">Find My Furever Friend 🐶</button>
                </div>
                <Searcher/>
            </main>
        )
    }

    const MatchedScreen = () => {
        return (
            matchedDog ?
                <div className="matchedDogContainer">
                    <h1>🎉 You've got a match! 🎉</h1>
                    <DogComponent dog={matchedDog} likedDogs={likedDogs} />
                    <button
                        className="primaryButton"
                        onClick={() => {
                            setMatchedDog(undefined)
                            setScreen("Search");
                        }}>
                        Close
                    </button>
                </div>
                :

                <div className="matchedDogContainer">
                    <h1>🎉 You've got a match! 🎉</h1>
                    <p>Sorry, no matches found. Try again!</p>
                    <button
                        className="primaryButton"
                        onClick={() => {
                            setMatchedDog(undefined)
                            setScreen("Search");
                        }}>
                        Close
                    </button>
                </div>
        )
    }

    const LoadingScreen = () => {
        return (
            <div className="loading">Loading...</div>
        )
    }

    const SearchScreens: Record<Screen, React.FC> = {
        Search: SearchScreen,
        Matched: MatchedScreen,
        Loading: LoadingScreen
    }

    const Screen = ({ screen }: { screen: Screen }) => {
        const Component = SearchScreens[screen];
        return <Component />;
    }

    return (
        <div>
            <nav id="navbar">
                <div id="logo">Woof Finder 🐶</div>
                <div>
                    <button className="primaryButton" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <Screen screen={screen} />
        </div>
    )
}

export default SearchPage