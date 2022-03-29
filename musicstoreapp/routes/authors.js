module.exports = function (app){
    app.get("/authors", function (req, res) {
        let authors = [{
            "name" : "James Heatfield",
            "group": "Metallica",
            "role": "Cantante"
        },{
            "name" : "Eric Griso",
            "group": "Arnau Griso",
            "role": "Guitarrista"
        }, {
            "name" : "Steven Tyler",
            "group": "Aerosmith",
            "role": "Cantante"
        }];

        let response = {
            seller: 'Tienda de canciones',
            authors: authors
        };

        res.render("authors/authors.twig", response);
    });

    app.get("/authors/add", function (req, res) {
        let roles= ['Cantante','Batería','Guitarrista','Bajista','Teclista']

        let response = {
            roles: roles
        };
        res.render("authors/add.twig", response);
    });

    app.post('/authors/add', function(req, res) {
        let response = "Autor agregado: " + req.body.name + "<br>"
            + "grupo: " + req.body.group + "<br>"
            + "rol: " + req.body.role + "<br>" ;

        if (req.body.name === undefined || req.body.name.trim().length===0) {
            response += "<br>" + '-Nombre no enviado en la petición.'
        }
        if(req.body.group === undefined || req.body.group.trim().length===0){
            response+= "<br>" + '-Grupo no enviado en la petición.'
        }
        if(req.body.role === undefined || req.body.role.trim().length===0){
            response+= "<br>" + '-Rol no enviado en la petición.'
        }
        res.send(response);
    });

    app.get('/authors/:id', function(req, res) {
        let response = 'Author id: ' + req.params.id;
        res.send(response);
    });

    app.get('/authors/*', function (req, res) {
        res.redirect('/authors');
    });
}