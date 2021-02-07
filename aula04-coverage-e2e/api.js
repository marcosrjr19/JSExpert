const http = require('http')

const DEFAULT_USER = {
    username : "MarcosRibeiro",
    password : 123
};

const routes = {

    '/contact:get' : (request,response) => {
        response.write('contact!');
        return response.end();
    },

    '/login:post' : async (request,response) => {

        // response é um iterator !

        for await (const data of request){
            const user = JSON.parse(data);

            if(
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ){
                response.writeHead(401);
                response.write("Logging failed !");
                return response.end();
            }

            response.write('Login has succeeded!');
            return response.end();

        }
        
    },
    defaults : (request,response) => {
        response.write('Hello World');
        return response.end();
    },
}

const handler = function (req,res ){

    const { url, method} = req;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const chosen = routes[routeKey] || routes.defaults

    res.writeHead(200, {
        'Content-Type' : 'text/html'
    });

    return chosen(req,res);

}

const app = http.createServer(handler).listen(3000, () => {

    console.log('app running at', 3000);
})

module.exports = app;