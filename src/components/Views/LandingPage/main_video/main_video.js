import React,{useState} from "react";

const Main = () => {
  const [hover, setHover] = useState(0);
  const _onMouseEnter = () => {
    setHover(1);
  };
  console.log(hover)
  return (
    <div
      className="youtube-container"
      onMouseEnter={_onMouseEnter}
    >
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/aR-KAldshAE?autoplay=${hover}&mute=1`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
};

export default Main;
