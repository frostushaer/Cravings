import { app } from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "cravings",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));

app.listen(port, () => console.log(`Backend is listening on http://localhost:${port}`));
