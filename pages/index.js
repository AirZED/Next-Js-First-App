import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetUpList from "../components/meetups/MeetupList";

const StartingPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Your React Meetups</title>
        <meta name="description" content="Browse a huge active React Meetups" />
      </Head>
      <MeetUpList meetups={props.meetups} />;
    </Fragment>
  );
};

export async function getStaticProps() {
  //fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://mfoniso:1234567890@cluster0.1ntpfmx.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups-collection");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //this regenerates and rebuilds the page every 1second on the server
    revalidate: 1,
  };
}

// export const getServerSideProps = async (context) => {
//   const request = context.req;
//   const response = context.res;

//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default StartingPage;
