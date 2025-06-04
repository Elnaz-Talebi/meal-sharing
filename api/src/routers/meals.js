import express from "express";
import knex from "../database_client.js";
import StatusCodes from "http-status-codes";
const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    let query = knex("meal").select("*");

    if (queryParams.maxPrice) {
      const maxPrice = Number(queryParams.maxPrice);
      if (isNaN(maxPrice)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "maxPrice must be a number" });
      }
      query = query.where("price", "<=", maxPrice);
    }

    if (queryParams.availableReservations !== undefined) {
      const available = queryParams.availableReservations === "true";

      query = query
        .leftJoin(
          knex("reservation")
            .select("meal_id")
            .sum("number_of_guests as total_reservations")
            .groupBy("meal_id")
            .as("res"),
          "meal.id",
          "res.meal_id"
        )
        .whereColumn(
          "res.total_reservations",
          available ? "<" : ">=",
          "meal.max_reservations"
        );
    }

    if (queryParams.title !== undefined) {
      const title = queryParams.title;
      query = query.where("title", "like", `%${title}%`);
    }

    if (queryParams.dateAfter !== undefined) {
      const dateAfter = queryParams.dateAfter;

      if (isNaN(Date.parse(dateAfter))) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "dateAfter is not a date." });
      }
      query = query.where("when", ">", dateAfter);
    }

    if (queryParams.dateBefore !== undefined) {
      const dateBefore = queryParams.dateBefore;

      if (isNaN(Date.parse(dateBefore))) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "dateBefore is not a date." });
      }
      query = query.where("when", "<", dateBefore);
    }

    if (queryParams.limit) {
      const limit = Number(queryParams.limit);
      if (isNaN(limit) || limit <= 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "limit must be a positive number" });
      }
      query = query.limit(limit);
    }

    const sortKey = queryParams.sortKey;
    const sortDir = queryParams.sortDir;

    if (sortKey) {
      if (["when", "max_reservations", "price"].includes(sortKey)) {
        if (sortDir) {
          if (["asc", "desc"].includes(sortDir)) {
            query = query.orderBy(sortKey, sortDir);
          } else {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: "sortDir must be either 'asc' or 'desc'." });
          }
        } else {
          query = query.orderBy(sortKey, "asc");
        }
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error:
            "sortKey must be one of 'when', 'max_reservations', or 'price'.",
        });
      }
    } else if (sortDir) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "sortDir cannot be used without sortKey." });
    }

    const meals = await query;
    res.status(StatusCodes.OK).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
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

mealsRouter.get("/:meal_id/reviews", async (req, res) => {
  try {
    const meal_id = parseInt(req.params.meal_id);
    if (isNaN(meal_id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "meal_id must be number." });
    }

    const [reviews] = await knex("review").select().where("meal_id", meal_id);

    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

export default mealsRouter;
