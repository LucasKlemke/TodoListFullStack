const { Client } = require("pg");

const password = "2005";

const dbConfig = {
  user: "postgres",
  password: `${password}`,
  host: "localhost",
  port: "3030",
  database: "todolist",
};

const client = new Client({ dbConfig });

client
  .connect()
  .then(() => {
    console.log("Conectado ao database");

    client.query("select * from tasks", (err, result) => {
      if (err) {
        console.log("erro na query", err);
      } else {
        console.log(result.rows);
      }

      client
        .end()
        .then(() => {
          console.log("Connection to PostgreSQL closed");
        })
        .catch((err) => {
          console.error("Error closing connection", err);
        });
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar a database", err);
  });
