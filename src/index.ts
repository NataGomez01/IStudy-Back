import express from 'express'; 
import { USERS as v1UserRouter} from './v1/routes/userRoutes';
import { CARDS as v1CardsRouter} from './v1/routes/cardsRoutes';

const app = express(); 

const PORT = process.env.PORT || 3000; 

app.use(express.json())
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/cards", v1CardsRouter)

app.listen(PORT, () => {
    console.log(`🚀 Api iniciada com sucesso, na porta: ${PORT}`); 
});