const url = require('url');
const fs = require('fs');
const http = require('http');
const {insertar,consultar,eliminar,editar, transferencias,consultar2} = require('./consultas')

http
.createServer(async(req,res)=>{

    if(req.url == '/' && req.method == 'GET'){
        res.setHeader("Content-Type","text/html");
        const html = fs.readFileSync("index.html", "utf8");
        res.end(html)
    }
    if(req.url == '/usuario' && req.method == 'POST'){
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertar(datos);
            res.statusCode = 201;
            res.end(JSON.stringify(respuesta));
        })
    }
    if(req.url == "/usuarios" && req.method == "GET"){
        const respuesta = await consultar();
        res.statusCode = 200;
        res.end(JSON.stringify(respuesta));
    }
    if(req.url.startsWith("/usuario?") && req.method == "PUT"){
        let body = "";
      req.on("data", (chunk) => {
        body += chunk;
       
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
       
        const respuesta = await editar(datos);
        res.end(JSON.stringify(respuesta));
      });
    }
    
    if(req.url.startsWith("/usuario?") && req.method == "DELETE"){
        const { id } = url.parse(req.url, true).query;
        console.log(id);
        const respuesta = await eliminar(id);
        res.end(JSON.stringify(respuesta));

    }
    if(req.url =='/transferencia' && req.method == "PUT"){
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
        console.log(datos)
            const respuesta = await transferencias(datos);
            res.end(JSON.stringify(respuesta));
            console.log(respuesta)
        });

    }


})
.listen(3000, () => console.log("Servidor Disponible ===> http://localhost:3000/ <==="));
