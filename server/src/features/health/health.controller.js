export const getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
};
