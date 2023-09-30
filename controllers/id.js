// Create the Profile Route- get request

const handleId = (req, res, db) => {
  // Get the id from the request parameters
  const { id } = req.params;

  db.select("*")
    .where({
      id: id,
    })
    .from("users")
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User Not found");
      }
    });
};
export default handleId;
