import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.use("/api/reviews", reviewsRouter);

app.get("/future-meals", async (req, res) => {
  const SHOW_TABLES_QUERY = "SELECT * FROM meal WHERE DATE(`when`) > CURDATE()";
  const [meal] = await knex.raw(SHOW_TABLES_QUERY);
  res.json(meal);
});

app.get("/past-meals", async (req, res) => {
  const SHOW_TABLES_QUERY = "SELECT * FROM meal WHERE DATE(`when`) < CURDATE()";
  const [meal] = await knex.raw(SHOW_TABLES_QUERY);
  res.json(meal);
});

app.get("/all-meals", async (req, res) => {
  const SHOW_TABLES_QUERY = "SELECT * FROM meal ORDER BY ID";
  const [meal] = await knex.raw(SHOW_TABLES_QUERY);
  res.json(meal);
});

app.get("/first-meal", async (req, res) => {
  const SHOW_TABLES_QUERY = "SELECT * FROM meal ORDER BY ID LIMIT 1";
  const [meal] = await knex.raw(SHOW_TABLES_QUERY);
  res.json(meal);
});

app.get("/last-meal", async (req, res) => {
  const SHOW_TABLES_QUERY = "SELECT * FROM meal ORDER BY ID DESC LIMIT 1";
  const [meal] = await knex.raw(SHOW_TABLES_QUERY);
  res.json(meal);
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
