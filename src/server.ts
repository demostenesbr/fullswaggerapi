import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";

import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (request, response) => {
  return response.json({
    message: "Termos de Serviço",
  });
});

app.use("/v1", router);
app.listen(9000, function () {
  console.log("Server is running in port 9000");
});
