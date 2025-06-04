import express from "express";
import knex from "../database_client.js";
import StatusCodes from "http-status-codes";
const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await knex("review").select("*");
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

reviewsRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const reviews = await knex("review").insert(data);
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

reviewsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [review] = await knex("review").select().where("id", id);
    if (!review) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "review is not exist." });
    } else {
      res.status(StatusCodes.OK).json(review);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

reviewsRouter.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Id must be number." });
    }
    const result = await knex("review").where("id", id).update(data);
    result > 0
      ? res
          .status(StatusCodes.OK)
          .json({ message: "Meal update successfully." })
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Meal is not exist." });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch reviews",
    });
  }
});

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Id must be integer." });
    }
    const result = await knex("review").where("id", id).delete();
    result > 0
      ? res
          .status(StatusCodes.OK)
          .json({ message: "review deleted successfully." })
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "review is not exist." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default reviewsRouter;
