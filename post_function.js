const ex = require("express")

const app = ex()

app.use(ex.json())
app.use(ex.urlencoded())

app.listen(8088, '127.0.0.1')

app.post("/echoPost/:cliente/:factura", (request, response) => {
    response.send({
        body:request.body,
        query: request.query,
        params: request.params
    })
})


