const express = require('express')
const router = require("./routers/web"); // Import the default export

const app = express();
const port = 3030;

app.use(express.json());
app.use("/", router);
app.listen(port, () => {
  console.log(`Server : http://localhost:${port} `);
});