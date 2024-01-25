const express = require("express")
const productsRoutes = require("./routes/product.routes")


const app = express()

const PORT = 8080

const API_PREFIX = "/api"

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(API_PREFIX + "/products",productsRoutes)




app.listen(PORT, () =>{
    console.log("runing")
})
