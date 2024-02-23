const express = require("express");
const app = express();
const mysql = require("mysql");
const XMLHttpRequest = require("xhr2");
const ping = require("ping");

let isDetect = false;
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
  console.log(req.query.id);
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
          console.log("L'appareil est joignable.");
          isDetect = true;
          if (isDetect) {
            const pingInterval = setInterval(() => {
              if (isDetect) {
                checkDevice(ip, pingInterval);
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

const checkDevice = (ip, intervale) => {
  ping.sys.probe(ip, (isAlive) => {
    if (!isAlive) {
      console.log("L'appareil n'est plus là.");
      isDetect = false;
      clearInterval(intervale); // Arrête l'intervalle une fois que l'appareil n'est plus détecté
    }
  });
};
