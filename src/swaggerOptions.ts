export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:'Security Microservice API',
            version: '1.0.0',
            description: 'Release 2.0 - Security Microservice'
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/server/routes/index/*.ts", "./src/server/routes/auth/*.ts"]
}