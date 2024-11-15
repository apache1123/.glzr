import "./media.css";
import { MediaOutput } from "zebar";
import { StatusItem } from "../../components/status-item/status-item";
import classNames from "classnames";
import Marquee from "react-fast-marquee";

export interface MediaProps {
  media: MediaOutput;
}

export function Media({ media: { session } }: MediaProps) {
  const isPlaying = () => !!session?.isPlaying;
  const playingIconClass = () => (isPlaying() ? "nf-fa-play" : "nf-fa-pause");

  return (
    session && (
      <div className={classNames({ "is-playing": isPlaying(), media: true })}>
        <StatusItem iconClass={playingIconClass()}>
          <>
            <Marquee speed={10} play={isPlaying()} autoFill>
              <div id="media-title" title={session.title}>
                {session.title}
              </div>
            </Marquee>
            <div id="media-artist" title={session.artist ?? ""}>
              {session.artist}
            </div>
          </>
        </StatusItem>
      </div>
    )
  );
}
