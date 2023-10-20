import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Plant = (props) => {
  const { img, name, age, growth } = props;
  return (
    <div id="plant">
      <div className="img flex">
        <img src={`assets/img/${img}.png`} alt={name} />
        <div className="text flex">
          <h4>{name}</h4>
          <h5>{age} Weeks Old</h5>
        </div>
        <CircularProgressbar
          className="size"
          value={growth}
          text={`${growth}%`}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: "#21bf73",
            textColor: "white",
            trailColor: "#c1c1c1",
            circleRatio: 0.5,
          })}
        />
      </div>
    </div>
  );
};

export default Plant;
