const express = require("express");
const app = express();
const mysql = require("mysql");
const XMLHttpRequest = require("xhr2");
const ping = require("ping");

let ip;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node",
});

const userActif = [
  {
    nom: "josie",
    id: 1,
    statue: false,
    ip: "",
  },
  {
    nom: "Anjoanina",
    id: 2,
    statue: false,
    ip: "",
  },
];

app.use((req, res, next) => {
  userActif.forEach((user) => {
    if (user.id == req.query.id) {
      ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
      }
      user.ip = ip;
      console.log("-----------------------------------");
      console.log("Utilisateurs : ", user.nom);
      console.log("Appareil connecté avec l'IP: " + ip);
      console.log("-----------------------------------");

      // Utilisation de la fonction ping
      ping.sys.probe(ip, (isAlive) => {
        if (isAlive) {
          console.log(user.nom + " est joignable.");
          user.statue = true;
          if (user.statue) {
            const pingInterval = setInterval(() => {
              if (user.statue) {
                checkDevice(ip, pingInterval, user.nom, user.statue);
              }
            }, 4000);
          }
        } else {
          console.log("L'appareil n'est pas joignable.");
        }
      });
    }
  });
  next();
});

app.get("/gsi/check/", (req, res) => {
  // console.log(req.query);
  res.send("Paramètres reçus");
});

app.listen(5000, () => {
  console.log("Server listening in port 5000 ...");
});

const checkDevice = (ip, intervale, username, detect) => {
  ping.sys.probe(ip, (isAlive) => {
    if (!isAlive) {
      console.log(username + " deconnecte .");
      detect = false;
      clearInterval(intervale); // Arrête l'intervalle une fois que l'appareil n'est plus détecté
    }
  });
};
