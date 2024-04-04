const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const Saml2js = require('saml2js');

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/saml/callback/?', function (req, res, next) {
    functions.logger.info("Starting Processing...");
    var parser = new Saml2js(req.body.SAMLResponse);
    functions.logger.info("Hello logs!", parser.toObject());
    res.json(parser.toObject());
});

//const Saml2js = require('saml2js');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.widgets = functions.https.onRequest(app);

exports.samlcallback = functions.https.onRequest((request, response) => {
    //Saml2js = require('saml2js'),

    functions.logger.info("Hello logs!", request);
    response.send("Hello from Firebase!");
});
