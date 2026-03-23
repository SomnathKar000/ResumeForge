import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Health is ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
