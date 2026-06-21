export const getHealth = (_req, res) => {   //_req is a placeholder for the request object, which is not used in this function. The function sends a JSON response with a success status and a message indicating that the server is healthy.
  res.status(200).json({
    success: true,
    status: "ok",
  });
};
