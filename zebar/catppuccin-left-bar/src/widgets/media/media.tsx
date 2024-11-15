import "./media.css";
import { MediaOutput } from "zebar";
import { StatusItem } from "../../components/status-item/status-item";

export interface MediaProps {
  media: MediaOutput;
}

export function Media(props: MediaProps) {
  const isPlaying = () => !!props.media.session?.isPlaying;
  const playingIconClass = () => (isPlaying() ? "nf-fa-play" : "nf-fa-pause");

  return (
    props.media.session && (
      <div class="media" classList={{ "is-playing": isPlaying() }}>
        <StatusItem iconClass={playingIconClass()}>
          <>
            <marquee
              scrollamount="2"
              id="media-title"
              title={props.media.session.title}
            >
              {props.media.session.title}
            </marquee>
            <div id="media-artist" title={props.media.session.artist ?? ""}>
              {props.media.session.artist}
            </div>
          </>
        </StatusItem>
      </div>
    )
  );
}
