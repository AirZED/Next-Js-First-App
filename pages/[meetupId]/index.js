import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import MeetUpDetail from "../../components/meetups/MeetUpDetail";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://pbs.twimg.com/media/Fdr3cyyXEBY2eyt?format=jpg&name=4096x4096",
    address: "Some Meetup at 17 Crescent, Uyo",
    description: "This is the First Meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://pbs.twimg.com/media/Fdr3WdVX0AAAKxC.jpg",
    address: "Devfest Boss Speaker, Uyo",
    description: "This is theSecond Meetup",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image: "https://pbs.twimg.com/media/Fb4cuu1WYAI0Wq5?format=jpg&name=large",
    address: "Some Meetup at 17 Crescent, Uyo",
    description: "This is theSecond Meetup",
  },
];

function MeetUpDetailPage(props) {
  const router = useRouter();

  const pageId = router.query.meetupId;

  // const [meetUp] = DUMMY_MEETUPS.filter((each) => each.id === pageId);

  return <MeetUpDetail meetUp={props.meetupData} />;
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mfoniso:1234567890@cluster0.1ntpfmx.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups-collection");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  const paths = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));
  return {
    fallback: false,
    paths,
  };
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mfoniso:1234567890@cluster0.1ntpfmx.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups-collection");

  // const meetups = await meetupsCollection.find().toArray();
  // const [meetup] = meetups.filter((each) => each._id.toString() === meetupId);

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  // const meetup = await meetupsCollection.findOne({ id: meetupId });

  //fetch data for single meetup
  return {
    props: {
      meetupData: {
        title: meetup.title,
        id: meetup._id.toString(),
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
    revalidate: 1,
  };
};

export default MeetUpDetailPage;
