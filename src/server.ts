import dotenv from "dotenv";

import app from "./app";

dotenv.config();
const OptionalPort=3000;
app.listen(process.env.PORT || OptionalPort, () => {
  console.log(`Server is up and running.`);
});