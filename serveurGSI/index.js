const express = require("express");
const app = express();
const mysql = require("mysql");
const XMLHttpRequest = require("xhr2");
const ping = require("ping");
const cors = require("cors");

let ip;
const pingIntervals = {};

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
    img: "/img/user1.png",
  },
  {
    nom: "Anjoanina",
    id: 2,
    statue: false,
    ip: "",
    img: "/img/user2.png",
  },
];

app.use(cors());

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
          startPingInterval(user);
        } else {
          console.log("L'appareil n'est pas joignable.");
        }
      });
    }
  });
  next();
});

app.get("/gsi/users/", (req, res) => {
  res.json(userActif);
});

app.get("/gsi/check/", (req, res) => {
  // console.log(req.query);
  res.send("Paramètres reçus");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening in port 5000 ...");
});

// Fonction pour démarrer un nouvel intervalle
function startPingInterval(user) {
  // Vérifier si un intervalle existe déjà pour cet utilisateur
  if (pingIntervals[user.id]) {
    clearInterval(pingIntervals[user.id]);
  }

  // Créer un nouvel intervalle
  pingIntervals[user.id] = setInterval(() => {
    if (user.statue) {
      checkDevice(user.ip, pingIntervals[user.id], user);
    }
  }, 500);
}

const checkDevice = (ip, intervale, user) => {
  ping.sys.probe(ip, (isAlive) => {
    if (!isAlive && user.statue) {
      console.log(user.nom + " deconnecte .");
      user.statue = false;
      clearInterval(intervale); // Arrête l'intervalle une fois que l'appareil n'est plus détecté
    }
  });
};
