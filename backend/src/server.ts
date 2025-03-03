import express,{Request,Response} from 'express'

const app = express()
const port = 4000

app.get('/',(request:Request,response:Response)=>{
    response.send('Niaje mahn, Keep going!')
})

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})