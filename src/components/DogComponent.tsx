interface DogComponentProps {
    age: number;
    img: string;
    breed: string;
    name: string;
    zip_code: string;
}

const DogComponent = ({ age, img, breed, name, zip_code }: DogComponentProps) => {
    return (
        <div className="dogComponent">
            <img src={img} alt={name} />
            <p>{name}</p>
            <p>{age}</p>
            <p>{breed}</p>
            <p>{zip_code}</p>
        </div>
    )
}
