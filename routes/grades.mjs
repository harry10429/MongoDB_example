import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();
//Full card functionality
//C - Create - POST
//R - Read - Get
//U - Update -Put/Patch
//D - Delete - Delete

router.get("/", async (req, res) => {
  let collection = await db.collection("grades");
  let results = await collection.find({}).limit(50).toArray();
  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  // in this query we are going to search for a specific id

  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) res.send("not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    res.send("not an id").status(400);
  }
  // let query = { _id: new ObjectId(req.params.id) };
  // let result = await collection.findOne(query);

  // if (!result) res.send("not found").status(404);
  // else res.send(result).status(200);
});

export default router;
