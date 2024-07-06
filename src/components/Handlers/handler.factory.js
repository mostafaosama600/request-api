const slugify = require("slugify");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const ApiFeatures = require("../../utils/ApiFeatures");

exports.getAll = (Model) => {
  return catchAsyncError(async (req, res) => {
    if (req.params.categoryId) filter = { category: req.params.categoryId };
    let apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate()
      .fields()
      .sort()
      .search()
      .filter();
    let document = await apiFeatures.mongooseQuery;
    res.status(200).json({ page: apiFeatures.page, result: document });
  });
};

exports.getById = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await Model.findById(id);
    !document && next(new AppError("document not found", 400));
    document && res.status(200).json({ result: document });
  });
};

exports.update = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let imgs = [];
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    req.body.image = req.file?.filename;
    req.body.imageCover = req.files?.imageCover[0]?.filename;
    req.files?.images?.forEach((elm) => {
      imgs.push(elm?.filename);
    });
    req.body.images = imgs;
    let document = await Model.findByIdAndUpdate(id, req.body, { new: true });
    !document && next(new AppError("document not found", 400));
    document && res.status(200).json({ result: document });
  });
};

exports.delete = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndDelete(id);
    !document && next(new AppError("document not found", 400));
    document && res.status(200).json({ result: document });
  });
};
