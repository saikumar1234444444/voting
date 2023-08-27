const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "user.db");

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ users: ["sai", "ram"] });
});


let database = null;
const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(5000, () =>
      console.log("Server Running at http://localhost:5000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/submit/", async (request, response) => {
  const {  input,name } = request.body;
  // console.log("company type: ", typeof company);
  const postTodoQuery = `
  INSERT INTO
    user (input,name)
  VALUES
    ('${input}','${name}');`;

  await database.run(postTodoQuery);
  response.json({ status: "user Added Successfully" });
});