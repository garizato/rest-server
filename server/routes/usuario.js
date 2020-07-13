const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const mongoose = require('mongoose');
const usuario = require('../models/usuario');
mongoose.set('useFindAndModify', false);

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    //quantity: conteo
                });
            });

        });

    //res.json(usuarios);
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioBD) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioBD.password = null;

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    //res.json('delete Usuario');
    let id = req.params.id;
    let nuevoEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, nuevoEstado, { new: true, context: 'query' }, (err, usuarioBorrado) => {
        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado == null) {
            return res.status(400).json({
                ok: false,
                err: 'usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});

module.exports = app;