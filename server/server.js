// import libraries

const express = require('express');



const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
  

app.use(cors(
  {
    origin: "*",
  methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed methods
  credentials: true 
  }
));
app.use(express.json());

const uri = "mongodb+srv://tejaswini_devisetty:TejaSowmya123@cluster0.wm5szph.mongodb.net/?";
const client = new MongoClient(uri);
const dbName = "resumeBuilderdb";
let db;

// Connect to MongoDB once
client.connect()
  .then(() => {
    db = client.db(dbName);
    console.log(" Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));





//  POST Route to save user
// POST Route to save user
app.post("/userDetails", async (req, res) => {
  try {
    const user = req.body;
    const result = await db.collection("userDetails").insertOne(user);
    res.status(201).send({ message: "User registered", id: result.insertedId });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  GET Route to confirm
app.get("/userDetails", async (req, res) => {
  try {
    const users = await db.collection("userDetails").find({}).toArray();
    res.send({users});
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/userDetails/:id", async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId format first
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  try {
    const objectId = new ObjectId(id);
    const user = await db.collection("userDetails").findOne({ _id: objectId });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Patch

// PATCH Route to update user details
app.patch("/userDetails/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const result = await db.collection("userDetails").updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ message: "User updated successfully", result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
