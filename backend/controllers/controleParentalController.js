const fs = require("fs");
const path = require("path");

const TEMPS_PATH = path.join(__dirname, "../data/temps_utilisation.json");

// Crée le fichier s’il n’existe pas
if (!fs.existsSync(TEMPS_PATH)) {
  fs.writeFileSync(TEMPS_PATH, JSON.stringify({}));
}

const chargerTemps = () => {
  const data = fs.readFileSync(TEMPS_PATH, "utf-8");
  return JSON.parse(data);
};

const sauvegarderTemps = (data) => {
  fs.writeFileSync(TEMPS_PATH, JSON.stringify(data));
};

// 🔐 GET /api/controle/temps?id=123
exports.getTempsRestant = (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "ID requis" });

  const temps = chargerTemps();
  const aujourdHui = new Date().toISOString().slice(0, 10);
  const tempsUtilise = temps[id]?.[aujourdHui] || 0;
  const TEMPS_LIMITE = 30; // minutes

  const restant = TEMPS_LIMITE - tempsUtilise;
  res.json({ restant: restant > 0 ? restant : 0 });
};

// 🔐 POST /api/controle/ajouter { id: "123", minutes: 5 }
exports.ajouterTemps = (req, res) => {
  const { id, minutes } = req.body;
  if (!id || !minutes)
    return res.status(400).json({ message: "ID et minutes requis" });

  const temps = chargerTemps();
  const aujourdHui = new Date().toISOString().slice(0, 10);

  if (!temps[id]) temps[id] = {};
  if (!temps[id][aujourdHui]) temps[id][aujourdHui] = 0;

  temps[id][aujourdHui] += minutes;
  sauvegarderTemps(temps);

  res.json({ message: "Temps ajouté", total: temps[id][aujourdHui] });
};
