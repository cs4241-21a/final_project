export default function GenreCard(props) {
    return (
        <div className="genre-card" style={{ backgroundImage: `url(/images/genres/${props.genre}.png` }}>
            <div className="genre-card__color" style={{ backgroundColor: props.color }} />
            <div className="genre-card__text">{ props.label.toUpperCase() }</div>
        </div>
    );
}
