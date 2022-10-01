const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const MongoConnection = require("./src/database/connect");

dotenv.config();

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const charactersRoutes = require("./src/routes/characters.routes");

const app = express();
app.use(cors());
app.use(express.json());

MongoConnection.connect();

const swagger = require("swagger-ui-express");
const swaggerDocs = require("./src/docs/swagger.json");

app.use("/docs", swagger.serve, swagger.setup(swaggerDocs));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/characters", charactersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("http://localhost:" + port));
