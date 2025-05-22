import express from "express";
import knex from "../database_client.js";
import StatusCodes from "http-status-codes";
const reservationsRouter = express.Router();

reservationsRouter.get("/", async (req, res) => {
  const reservations = await knex("reservation").select("*");
  res.json(reservations);
});

reservationsRouter.post("/", async (req, res) => {
  const data = req.body;
  const result = await knex("reservation").insert(data);
  res.status(StatusCodes.CREATED).json(result);
});

reservationsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [reservation] = await knex("reservation").select().where("id", id);
  if (!reservation) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Reservation is not exist." });
  } else {
    res.json(reservation);
  }
});

reservationsRouter.put("/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const [reservation] = await knex("reservation").select().where("id", id);
  if (!reservation) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Reservation is not exist." });
  } else {
    await knex("reservation").where("id", id).update(data);
    res
      .status(StatusCodes.OK)
      .json({ message: "Reservation update successfully." });
  }
});

reservationsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const [reservation] = await knex("reservation").select().where("id", id);
  if (!reservation) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Reservation is not exist." });
  } else {
    await knex("reservation").where("id", id).delete();
    res
      .status(StatusCodes.OK)
      .json({ message: "Reservation deleted successfully." });
  }
});

export default reservationsRouter;
