module.exports = function (app){

    let authors = [{
        "name" : "James Heatfield",
        "group": "Metallica",
        "role": "cantante"
    },{
        "name" : "Eric Griso",
        "group": "Arnau Griso",
        "role": "guitarrista"
    }, {
        "name" : "Steven Tyler",
        "group": "Aerosmith",
        "role": "cantante"
    }];

    app.get("/authors", function (req, res) {

        let response = {
            seller: 'Tienda de canciones',
            authors: authors
        };

        res.render('authors/authors.twig', response);
    });

    app.get("/authors/add", function (req, res) {
        let roles= ['cantante','batería','guitarrista','bajista','teclista']

        res.render("authors/add.twig", {roles: roles});
    });

    app.post('/authors/add', function(req, res) {
        let response = "Autor agregado: " + req.body.name + "<br>"
            + "Grupo: " + req.body.group + "<br>"
            + "Rol: " + req.body.role + "<br>" ;

        if (typeof req.body.name === 'undefined' || req.body.name === null || req.body.name.toString().trim().length==0) {
            response += "<br>" + '-Nombre no enviado en la petición.'
        }
        if(typeof req.body.group === 'undefined' || req.body.group === null || req.body.group.toString().trim().length==0){
            response+= "<br>" + '-Grupo no enviado en la petición.'
        }
        if(typeof req.body.role === 'undefined' || req.body.role === null || req.body.role.toString().trim().length==0){
            response+= "<br>" + '-Rol no enviado en la petición.'
        }
        res.send(response);
    });

    app.get('/authors/:id', function(req, res) {
        let response = 'Author id: ' + req.params.id;
        res.send(response);
    });


    app.get('/authors/filter/:role', function (req, res){
        // if (typeof req.params.role==='undefined' || req.params.role === null || req.params.role.toString().trim().length==0)
        let filteredAuthors = authors.filter(x => x.role.toLowerCase()===req.params.role.toLowerCase());

        let response = {
            seller: 'Tienda de canciones',
            authors: filteredAuthors
        };

        res.render("authors/authors.twig", response);
    });

    app.get('/authors*', function (req, res) {
        res.redirect('/authors');
    });
}