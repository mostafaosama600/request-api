exports.allRequires = (app) => {
  app.use("/api/v1/request", require("../components/requests/Request.api"));
};
