const ex = require("express")

const app = ex()

app.use(ex.static("public", {
    index: "p1.html"
}))
app.use(ex.json())
app.use(ex.urlencoded())

app.listen(8088, '127.0.0.1')


app.get("/")

app.post("/echoPost/:cliente/:factura", (request, response) => {
    response.send({
        body:request.body,
        query: request.query,
        params: request.params
    })
})

app.post("/echopost/:cliente/:factura", (request, response) => {
    response.send({
        body:request.body,
        query: request.query,
        params: request.params
    })
})

