import express,{Request,Response,json} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

// middleware. add body to all requests
app.use(json())

app.get('/hello',(request:Request,response:Response)=>{
    response.status(200).json('How you doing?')
})


app.listen(port,()=>{
    console.log(`[server] app is running at http://localhost:${port}...`)
})
