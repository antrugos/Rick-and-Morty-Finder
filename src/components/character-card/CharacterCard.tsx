import { Link } from 'react-router-dom';
import HeartGrey from '../../assets/Heart-grey.svg';
import HeartGreen from '../../assets/Heart-green.svg';

type CharacterCardProps = {
    id: string;
    name: string;
    image: string;
    species: string;
    isFavorite: boolean;
};

const CharacterCard = ({ id, name, image, species, isFavorite }: CharacterCardProps) => {
    return (
        <li className="card">
            <Link to={`/character/${id}`}>
                <div className="cardImg">
                    <img className="imgCharacter" alt={name} src={image} />
                    <div className="cardContent">
                        <h3 className="cardTitle">{name}</h3>
                        <p className="cardInfo">{species}</p>
                    </div>
                    <div className="heartIcon">
                        <img src={isFavorite ? HeartGreen : HeartGrey} alt="heart-icon" />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default CharacterCard;