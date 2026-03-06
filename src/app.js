const express= require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("Identity Reconciliation API");
});
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
