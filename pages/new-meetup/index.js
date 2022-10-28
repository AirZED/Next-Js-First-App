import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

const NewMeetUp = (props) => {
  const router = useRouter();

  const onAddMeetUpHandler = async (enteredMeetUpData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  };
  return <NewMeetUpForm onAddMeetUp={onAddMeetUpHandler} />;
};

export default NewMeetUp;
