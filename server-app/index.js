import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const coresOptions = {
  origin: true, // Allow all origins
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
const port = process.env.PORT || 3020;

app.use(cors(coresOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = path.resolve();

async function connectToDB() {
  const connectionString = process.env.MONGO_URI;
  if (!connectionString) {
    throw new Error("MONGO_URI is not defined");
  }
  const client = new MongoClient(connectionString);
  await client.connect();
  return client;
}

// Database Name
const dbName = "videodb";

//API Routes

// Get all ADMIN
app.get("/get-admin", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tbladmin")
        .find({})
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

// Get all VIDEOS
app.get("/get-videos", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblvideos")
        .find({})
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

// Get all USERS
app.get("/get-users", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblusers")
        .find({})
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

// Get all USERS by ID
app.get("/get-users/:userId", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblusers")
        .find({ UserId: req.params.userId })
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

// Get all VIDEOS by ID
app.get("/get-videos/:id", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblvideos")
        .find({ VideoId: parseInt(req.params.id) })
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

// Get all Filtered VIDEOS by Category id
app.get("/filter-videos/:categoryid", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    console.log(typeof req.params.categoryid);
    database
      .collection("tblvideos")
      .find({ CategoryId: parseInt(req.params.categoryid) })
      .toArray()
      .then((result) => {
        res.send(result);
        res.end();
        client.close(); // Close the connection after the operation
      });
  });
});

// Get all Filtered VIDEOS by Category id
app.get("/get-categories/:id", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblcatagories")
        .find({ CatagoryId: parseInt(req.params.id) })
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});
app.get("/get-categories", (req, res) => {
  connectToDB()
    .then((client) => {
      let database = client.db("videoDB");
      database
        .collection("tblcatagories")
        .find({})
        .toArray()
        .then((result) => {
          res.send(result);
          res.end();
          client.close(); // Close the connection after the operation
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error connecting to the database");
    });
});

//Post API
// Add new USER
app.post("/add-user", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    let user = {
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: req.body.Password,
      Mobile: req.body.Mobile,
    };
    database
      .collection("tblusers")
      .insertOne(user)
      .then((result) => {
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

// Add new ADMIN
app.post("/add-admin", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    let admin = {
      UserId: req.body.UserId,
      Password: req.body.Password,
    };
    database
      .collection("tbladmin")
      .insertOne(admin)
      .then((result) => {
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

// Add new VIDEO
app.post("/add-video", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    let video = {
      VideoId: parseInt(req.body.VideoId),
      Title: req.body.Title,
      Url: req.body.Url,
      Description: req.body.Description,
      Likes: parseInt(req.body.Likes),
      Dislikes: parseInt(req.body.Dislikes),
      Views: parseInt(req.body.Views),
      CategoryId: parseInt(req.body.CategoryId),
      Comments: [req.body.Comments],
    };
    database
      .collection("tblvideos")
      .insertOne(video)
      .then((result) => {
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

// Add new catagory
app.post("/add-video", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    let catagory = {
      CategoryId: parseInt(req.body.CategoryId),
      CatagoryName: req.body.CatagoryName,
    };
    database
      .collection("tblcatagories")
      .insertOne(catagory)
      .then((result) => {
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

// Update Video by ID
app.put("/update-video/:id", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    let video = {
      Title: req.body.Title,
      Url: req.body.Url,
      Description: req.body.Description,
      Likes: parseInt(req.body.Likes),
      Dislikes: parseInt(req.body.Dislikes),
      Views: parseInt(req.body.Views),
      CategoryId: parseInt(req.body.CategoryId),
      Comments: [req.body.Comments],
    };
    database
      .collection("tblvideos")
      .updateOne(
        { VideoId: parseInt(req.params.id) },
        {
          $set: video,
        }
      )
      .then((result) => {
        console.log(
          "Updated Video with ID: " + req.params.id + " Successfully"
        );
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

//delete video by ID
app.delete("/delete-video/:id", (req, res) => {
  connectToDB().then((client) => {
    let database = client.db("videoDB");
    database
      .collection("tblvideos")
      .deleteOne({ VideoId: parseInt(req.params.id) })
      .then((result) => {
        console.log(
          "Deleted Video with ID: " + req.params.id + " Successfully"
        );
        res.send(result);
        res.end();
        client.close();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error connecting to the database");
      });
  });
});

app.use(express.static(path.join(__dirname, "/video-library-react/build")));
app.get("*", (_, res) => {
  res.sendFile(
    path.resolve(__dirname, "video-library-react", "build", "index.html")
  );
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

connectToDB().catch(console.error);
