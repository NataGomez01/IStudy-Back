const express = require("express"); 
const v1UserRouter = require("./v1/routes/userRoutes");
const v1AwsRouter = require("./v1/routes/awsRoutes")

const app = express(); 

const PORT = process.env.PORT || 3000; 

app.use(express.json())
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/image", v1AwsRouter);

app.listen(PORT, () => {
    console.log(`🚀 Api iniciada com sucesso, na porta: ${PORT}`); 
});