module.exports.formulario_inclusao_noticia = function (app, req, res) {
    res.render("admin/form_add_noticia", {validacao: {}, noticia: {}}) //passando a variável validação como JSON vazio
}

module.exports.noticias_salvar = function (app, req, res) {
    const noticia = req.body

    // -- inicio --Validando os campos do form
    req.assert("titulo", "Titulo é obrigatório").notEmpty()
    req.assert("resumo", "Resumo é obrigatório").notEmpty()
    req.assert("resumo", "Resumo deve conter entre 10 e 100 caracteres").len(
        10,
        100
    )
    req.assert("autor", "Autor é obrigatório").notEmpty()
    req.assert("data_noticia", "Data é obrigatória")
        .notEmpty()
        .isDate({format: "YYYY-MM-DD"})
    req.assert("noticia", "Notícia é obrigatória").notEmpty()

    const erros = req.validationErrors()

    if (erros) {
        res.render("admin/form_add_noticia", {
            validacao: erros,
            noticia: noticia
        })
        return
    }

    // -- Fim --Validando os campos do form

    const connection = app.config.dbConnection()
    const noticiasModel = new app.app.models.NoticiasDAO(connection)

    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect("/noticias")
    })
}
