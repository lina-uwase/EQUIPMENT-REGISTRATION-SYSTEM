import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options={
    definition: {
        openapi:"3.0.0.0",
        info:{
            title:"Employee Management API",
            description:"Employee management for registration and retrieval",
            version: "1.0.0",
        },
    },

    //looks for configuration in specified directions
    apis:[("routes/*.routes.js")]
};
const swaggerSpec = swaggerJsDoc(options);

function swaggerJsDocs(app,part){
    //swagger page
    app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Documentation in JSON format
    app.get("/docs.json",(req,res)=>{
        res.setHeader("content-Type","application/Json");
        res.send(swaggerSpec);
    });
}

export default swaggerJsDocs