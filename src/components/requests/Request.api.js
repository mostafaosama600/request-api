const {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("./Request.service");

const router = require("express").Router();

router.route("/").post(createRequest).get(getRequests);
router.route("/:id").get(getRequest).put(updateRequest).delete(deleteRequest);

module.exports = router;
