export const isUser = (req, res, next) => {
  if (req.user?.role !== "user") {
    throw new ApiError(403, "Only users can create reviews");
  }
  next();
};
