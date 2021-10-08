import FlameIcon from "../icons/FlameIcon";

export default function Song(props) {
    return (
        <div className="song">
            <div className="song__left">
                <div className="song__index">{ props.index }</div>
                <div className="song__image" />
                <div className="song__details">
                    <div className="song__title">{ props.song.title }</div>
                    <div className="song__author">{ props.song.author }</div>
                </div>
            </div>
            <div className="song__duration">{ getDuration(props.song.duration_ms) }</div>
            <div className="song__popularity">
                { props.song.popularity > 50 && <div>
                    <FlameIcon />
                    Popular
                </div> }
            </div>
        </div>
    );
}

const getDuration = (ms) => {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    return `${ Math.floor(minutes) }:${ Math.round(seconds % 60) }`
}
