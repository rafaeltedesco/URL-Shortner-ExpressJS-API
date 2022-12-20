const app = require("./app");
const connection = require("./database/connection");

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await connection.execute("SELECT 1");
    console.log("Connected");
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(0);
  }
});
