const Movie = require("./model");

exports.addMovie = async (req, res) => {
  try {
    const {
      name,
      genre,
      director,
      duration,
      year
    } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({
      name,
      genre,
      director,
      duration,
      year,
      owner,
    })
    res.status(200).send({movie: newMovie})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({})
    res.status(200).send({movies: allMovies})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.deleteMovie = async (req, res) => {
  try {
    const deteledMovie = await Movie.findByIdAndRemove(req.params.id);
    if (deteledMovie) {
      res.status(200).send({ message: "Movie was deleted" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.updateMovie = async (req, res) => {
  try {
    const { 
      name,
      genre,
      director,
      duration,
      year } = req.body;
    const movieToUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });
    if (movieToUpdate) {
      res.status(200).send({movie: movieToUpdate})
    } else {
      res.status(500).send({message: "Movie not found"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}