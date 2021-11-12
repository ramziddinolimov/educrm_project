const express = require("express");
const morgan = require("morgan");
const customErrorMiddleware = require("./middlewares/customErrorMiddleware");
const databseMiddleware = require("./middlewares/databseMiddleware");
const postgres = require("./modules/pg/postgres");
const route = require("./routes/route");

const app = express()

async function server(port, mode){
    try {
        app.listen(port || 3536, () => { console.log("Server is ready")})

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        const db = await postgres();

        await databseMiddleware(db, app)
        app.use(customErrorMiddleware)

        if(mode == "dev"){
            app.use(morgan("dev"));
        }
        
    } catch (error) {
        console.log("SERVER_ERROR: ", error);
    }finally{
        route(app);
    }
}

module.exports = server;