//api = /api/new-meetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  //Hence this is only triggered on post requests alone
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://mfoniso:1234567890@cluster0.1ntpfmx.mongodb.net/meetups?retryWrites=true&w=majority"
      );

      const db = client.db();

      const meetupsCollection = db.collection("meetups-collection");

      const result = await meetupsCollection.insertOne(data);

      client.close();

      //Sets the response status and returns it
      res.status(201).json({ message: "Meetups inserted", status: 201 });
    } catch (error) {
      res
        .status(408)
        .json({ message: "Error connecting to db", error, status: 408 });
    }
  }
};

export default handler;
