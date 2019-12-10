const mongoose = require('mongoose');


var voiture = new mongoose.Schema({
  nombreDePlace : Number,
  année: Number,
  marque: String
})

var chauffeur = new mongoose.Schema({
  nom : String,
  age : Number,
  tel:String
})

var trajet = new mongoose.Schema({
    depart : String,
    arrive : String,
    cout : Number,
    date : String,
    animeaux : Boolean,
    fumée : Boolean,
    musique : Boolean,
    voiture : { 
      nombreDePlace : Number,
      année: Number,
      marque: String
    },
    chauffeur : {
      nom : String,
      age : Number,
      tel:String
    }
  });


var trajetModel = mongoose.model('trajet', trajet);
var voitureModel = mongoose.model('trajet', chauffeur);
var chauffeurModel = mongoose.model('trajet', voiture);

const connecterAuBDD = async () => {
  const client = await mongoose.connect('mongodb://localhost:27017/couvoiturage', {useNewUrlParser: true});;
  return client.connection
};

const ajouterArticle = async (data) => {
  const db = await connecterAuBDD();
  var trajet = new trajetModel(data);
  await db.collection('trajet').insertOne(trajet)
}

const obtenirArticles = async (data) => {
  const db = await connecterAuBDD();
  const trajets = await db.collection('trajet').find({}).toArray()
  return trajets
}

module.exports = {ajouterArticle , obtenirArticles}
