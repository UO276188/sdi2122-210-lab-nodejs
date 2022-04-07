const {ObjectId} = require("mongodb");
module.exports = function(app, commentsRepository) {
    app.post('/comments/:song_id', function (req, res){
        if (req.session.user == null){
            res.send("Es necesario iniciar sesión para poder comentar");
        } else {

            let comment = {
                author : req.session.user,
                text : req.body.texto,
                song_id : ObjectId(req.params.song_id)
            }

            commentsRepository.addComment(comment, function(id) {
                if (id == null) {
                    res.send("Error al añadir comentario");
                } else {
                    res.send("Comentario añadido");
                }
            });
        }
    });

}