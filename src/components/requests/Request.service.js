const RequestModel = require("./Request.model");
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require("../../utils/catchAsync");
const { default: slugify } = require("slugify");

exports.createRequest = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.doctorName);
  let Request = new RequestModel(req.body);
  await Request.save();
  res.status(200).json(Request);
});

exports.getRequests = factory.getAll(RequestModel);
exports.getRequest = factory.getById(RequestModel);
exports.updateRequest = factory.update(RequestModel);
exports.deleteRequest = factory.delete(RequestModel);
