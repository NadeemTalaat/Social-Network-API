const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate({
        path: ["thoughts", "friends"],
      });
      res.json(users);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: ["thoughts", "friends"],
      });

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.updateOne(
        { _id: req.params.userId },
        req.body
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
