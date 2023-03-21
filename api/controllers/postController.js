const postSchema = require("../../models/Post.schema");

module.exports = postController = {
  async getAll(req, res) {
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;

    try {
      const postList = await postSchema.find().limit(limit);

      const tolalPage = Math.ceil(postList.length / limit);
      const total = postList.length;

      res.status(200).json({
        data: {
          status: 200,
          message: "success",
          data: {
            postList,
            total,
            tolalPage,
            page,
            limit,
          },
        },
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        data: {
          status: 400,
          message: "fail",
        },
      });
    }
  },

  async get(req, res) {
    const id = req.params.id;

    try {
      const post = await postSchema.findById(id);

      res.status(200).json({
        data: {
          status: 200,
          message: "success",
          data: post,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        data: {
          status: 400,
          message: "fail",
        },
      });
    }
  },

  async create(req, res) {
    try {
      const post = new postSchema({
        name: req.body.name,
        author: req.body.author,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        createdAt: new Date(),
      });

      await post.save();

      res.status(200).json({
        data: {
          status: 200,
          message: "success",
          data: post,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        data: {
          status: 400,
          message: "fail",
        },
      });
    }
  },
  async update(req, res) {
    const id = req.params.id;

    try {
      const post = {
        name: req.body.name,
        author: req.body.author,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        createdAt: new Date(),
      };

      const newPost = await postSchema.updateOne({ _id: id }, post);

      res.status(200).json({
        data: {
          status: 200,
          message: "success",
          data: newPost,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        data: {
          status: 400,
          message: "fail",
        },
      });
    }
  },
  async delete(req, res) {
    const id = req.params.id;

    try {
      await postSchema.deleteOne({ _id: id });

      res.status(200).json({
        data: {
          status: 200,
          message: "deleted " + id,
        },
      });
    } catch (error) {
      res.status(400).json({
        data: {
          status: 400,
          message: "fail",
        },
      });
    }
  },
};
