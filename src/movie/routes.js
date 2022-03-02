const { Router } = require("express");
const { addMovie, getAllMovies, deleteMovie, updateMovie } = require("./controller");
const movieRouter = Router();

movieRouter.post("/movies", addMovie);
movieRouter.get("/movies", getAllMovies);
movieRouter.delete("/movies/:id", deleteMovie);
movieRouter.patch("/movies/:id", updateMovie);

module.exports = movieRouter;