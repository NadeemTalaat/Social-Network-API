const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({ path: "reactions" });

      if (!thoughts) {
        res.status(404).json({ message: "No thoughts found!" });
      }

      res.json(thoughts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate({
        path: "reactions",
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      }

      res.json({ message: "Thought deleted successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No user found with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
