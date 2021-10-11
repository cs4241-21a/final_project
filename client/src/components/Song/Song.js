import FlameIcon from "../icons/FlameIcon";
import RemoveIcon from "../icons/RemoveIcon";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";

export default function Song(props) {
  return (
    <div className={ 'song' + (props.loading ? ' loading' : '') }>
      <div className="song__left">
        <div className="song__index">
          { !props.loading ? <div>{ props.index + 1 }</div> : <div className="skeleton">{ props.index + 1 }<div>/</div></div> }
          <button
            className="song__button"
            aria-label="Play song"
            onClick={ () => props.playSongHandler(props.song.uri) }
          >
            { props.playing ? <PauseIcon /> : <PlayIcon /> }
          </button>
        </div>
        { !props.loading ?
          <img src={props.song.album_image_url} alt="Album cover"/> :
          <div className="song__image skeleton"><div/></div> }
        { !props.loading ?
          <div className="song__details">
            <div className="song__title">{ props.song.name }</div>
            <div className="song__author">{ props.song.artists.join(', ') }</div>
          </div> :
          <div className="song__details">
            <div className="song__title skeleton">{ props.song.name }<div/></div>
            <div className="song__author skeleton">{ props.song.artists.join(', ') }<div/></div>
          </div> }
      </div>

      { !props.loading ?
        <div className="song__middle">{ getDuration(props.song.duration_ms) }</div> :
        <div className="song__middle skeleton">{ getDuration(props.song.duration_ms) }<div/></div> }

      <div className="song__right">
        <div className="song__popularity">
          { props.song.popularity > 80 && <div>
              <FlameIcon /> Boppin'
          </div> }
        </div>
        <button
          className="song__button"
          aria-label="Remove song"
          onClick={ () => props.deleteSongHandler(props.song.uri) }>
          <RemoveIcon /></button>
      </div>
    </div>
);
}

const getDuration = (ms) => {
  const seconds = ms / 1000;
  const minutes = seconds / 60;
  const secondsPortion = Math.round(seconds % 60);
  return `${ Math.floor(minutes) }:${ secondsPortion < 10 ? 0 : '' }${ secondsPortion }`
}
