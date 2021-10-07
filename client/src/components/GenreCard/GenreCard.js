export default function GenreCard(props) {
    return (
        <div className="genre-card">
            <span className="genre-card">{ props.label.toUpperCase() }</span>
        </div>
    );
}
