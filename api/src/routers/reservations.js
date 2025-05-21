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

export default reservationsRouter;
