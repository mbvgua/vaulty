import express,{json} from 'express'
import dotenv from 'dotenv'

import authRouter from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT

// middleware. add body to all requests
app.use(json())
app.use('/auth',authRouter)


app.listen(port,()=>{
    console.log(`[server] app is running at http://localhost:${port}...`)
})
