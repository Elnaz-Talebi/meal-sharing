import express from "express";
import knex from "../database_client.js";
import StatusCodes from "http-status-codes";
const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("*");
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await knex("meal").insert(data);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [meal] = await knex("meal").select().where("id", id);
    if (!meal) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Meal is not exist." });
    } else {
      res.json(meal);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    if (id === NaN) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Id must be integer." });
    }

    const result = await knex("meal").where("id", id).update(data);
    result > 0
      ? res
          .status(StatusCodes.OK)
          .json({ message: "Meal update successfully." })
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Meal is not exist." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id === NaN) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Id must be integer." });
    }
    const result = await knex("meal").where("id", id).delete();
    result > 0
      ? res
          .status(StatusCodes.OK)
          .json({ message: "Meal deleted successfully." })
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Meal is not exist." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default mealsRouter;
