const express = require('express')
const PORT = process.env.PORT || 3001
const fileUpload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(fileUpload({createParentPath: true}))
app.use('/local-files', express.static('/'))

const routes = require('./settings/routes')
routes(app)

app.listen(PORT, () => {
    console.log('Server starting on port: ', PORT)
})

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credintals: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));