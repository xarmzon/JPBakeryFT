const app = require("./src/app");
const { connectDB } = require("./src/config/db.config");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
