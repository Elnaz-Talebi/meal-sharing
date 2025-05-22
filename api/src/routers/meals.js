import express from "express";
import knex from "../database_client.js";
import StatusCodes from "http-status-codes";
const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  const meals = await knex("meal").select("*");
  res.json(meals);
});

mealsRouter.post("/", async (req, res) => {
  const data = req.body;
  const result = await knex("meal").insert(data);
  res.status(StatusCodes.CREATED).json(result);
});

mealsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [meal] = await knex("meal").select().where("id", id);
  if (!meal) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Meal is not exist." });
  } else {
    res.json(meal);
  }
});

mealsRouter.put("/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const [meal] = await knex("meal").select().where("id", id);
  if (!meal) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Meal is not exist." });
  } else {
    await knex("meal").where("id", id).update(data);
    res.status(StatusCodes.OK).json({ message: "Meal update successfully." });
  }
});

mealsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const [meal] = await knex("meal").select().where("id", id);
  if (!meal) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Meal is not exist." });
  } else {
    await knex("meal").where("id", id).delete();
    res.status(StatusCodes.OK).json({ message: "Meal deleted successfully." });
  }
});

export default mealsRouter;
