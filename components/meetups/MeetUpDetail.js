
import classes from "./MeetUpDetail.module.css";

function MeetUpDetail({ meetUp }) {
  return (
    <section className={classes.detail}>
      <img src={meetUp.image} alt={meetUp.title} />
      <h1>{meetUp.title}</h1>
      <address>{meetUp.address}</address>
      <p>{meetUp.description}</p>
    </section>
  );
}

export default MeetUpDetail;
