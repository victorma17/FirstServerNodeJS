const ex = require("express")
const fileUpload = require("express-fileupload")
const morgan = require("morgan")
const fs = require("fs")
const accessLogStream = fs.createWriteStream('uploads/access.log', { flags: "a" })

const app = ex()

app.use(ex.static("public", {
    index: "p1.html"
}))
app.use(ex.json())
app.use(ex.urlencoded())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
// app.use(morgan('tiny'))
app.use(morgan('combined', {
    skip: (req, res) =>  !(res.statusCode < 400),
    stream: accessLogStream    
}))


app.listen(8088, '127.0.0.1')


app.get("/")

app.post("/uploadFichero", async (req, res) => {
    const file1 = req.files.file1;
    try {
        if (file1) {
            await file1.mv(`uploads/${file1.name}`)
        }
        const file2 = req.files.file2;
        if (file2) {
            await file2.mv(`uploads/${file2.name}`)
        }
        const file3 = req.files.file3;
        if (file3) {
            await file3.mv(`uploads/${file3.name}`)
        }
    } catch (error) {
        res.status(500).send("error al subir algún fichero")
    }
    res.send("ficheros subidos")
})

app.post("/echoPost/:cliente/:factura", (request, response) => {
    response.send({
        body: request.body,
        query: request.query,
        params: request.params
    })
})

app.post("/echopost/:cliente/:factura", (request, response) => {
    response.send({
        body: request.body,
        query: request.query,
        params: request.params
    })
})

app.get("/echopost", (request, response) => {
    response.send("ficheros subidos")
})


/*
get http://localhost:8088

###

post http://localhost:8088/echopost
Content-Type: application/x-www-form-urlencoded

campo1=v1&fecha=11-11-2011

###

post http://localhost:8088/echopost/123/1234?c=45
Content-Type: application/x-www-form-urlencoded

campo1=v1&fecha=11-11-2011
*/