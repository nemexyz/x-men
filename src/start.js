const chalk = require("chalk");
const ip = require("./utils/ip");

const app = require("./server");

const PORT = process.env.PORT || 2000;

// Listening

app.listen(PORT, () => {
  console.info(
    `🚀 🚀 🚀 X-MEN-API-PUBLIC ${chalk.green(
      process.env.NODE_ENV.toUpperCase()
    )} in ${chalk.blue(`http://localhost:${PORT}`)} and ${chalk.blue(
      `http://${ip.interfaces[0].address}:${PORT}`
    )}`
  );
});
