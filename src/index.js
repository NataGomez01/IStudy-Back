const express = require("express"); 
const v1UserRouter = require("./v1/routes/userRoutes");
const app = express(); 

const PORT = process.env.PORT || 3000; 

app.use(express.json())
app.use("/api/v1/users", v1UserRouter);

app.listen(PORT, () => {
    console.log(`🚀 Api iniciada com sucesso, na porta: ${PORT}`); 
});