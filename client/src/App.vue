<template>
  <v-app>
    <div class="navbar">
      <h2>TP IHM Groupe Aissani</h2>
    </div>
    <div class="search">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
      <video
        src="./assets/Road-Tripping.mp4"
        loop
        muted
        autoplay
        class="video"
      ></video>
      <div class="main-content">
        <div class="titler">Devouvrez des trajets au tours de 48 wilayas</div>
        <div class="search-form">
          <v-text-field
            label="Depart"
            outlined
            v-model="d"
            class="input mx-2"
            background-color="white"
          ></v-text-field>
          <v-text-field
            label="Arrive"
            outlined
            v-model="a"
            class="input mx-2"
            background-color="white"
          ></v-text-field>
          <div class="btn__container">
            <v-btn class="primary" @click="cherch">Chercher</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="trajets">
      <div class="title2">Déposer un nouvelle covoiturage</div>
      <div class="main">
        <div class="grid">
          <v-text-field
            v-model="nom"
            label="Nom"
            class="one"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="tel"
            label="N° tel."
            class="zwolf"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="age"
            label="age"
            class="two"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-select
            v-model="depart"
            :items="ville"
            item-value="nom"
            item-text="nom"
            :error-messages="selectErrors"
            label="Depart"
            class="three"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-select
            v-model="arrive"
            :items="ville"
            item-value="nom"
            item-text="nom"
            :error-messages="selectErrors"
            label="Arrive"
            class="four"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-text-field
            v-model="voiture"
            label="Voiture"
            class="five"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-select
            v-model="année"
            :items="Array(...Array(20)).map((_, i) => i + 2000)"
            :error-messages="selectErrors"
            label="Année"
            class="six"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-flex class="time d-flex justify-space-between">
            <v-date-picker v-model="date" landscape="true"></v-date-picker>
            <v-time-picker v-model="time" landscape="true"></v-time-picker>
          </v-flex>
          <v-select
            v-model="nombreDePlace"
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
            :error-messages="selectErrors"
            label="Nombre de place"
            class="seven"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-flex class="d-flex justify-space-between eight">
            <v-checkbox
              v-model="musique"
              
              label="musique"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="fumée"
              
              label="fumée"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>
            <v-checkbox
              v-model="animeaux"
              
              label="animeaux"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>
          </v-flex>
          <v-flex class="twelve">
            <v-text-field
              label="Amount"
              v-model="cout"
              value="500"
              prefix="DZD"
              class="field"
            ></v-text-field>
            <v-btn class="mr-4 primary btn2" @click="submit" large
              >Ajouter</v-btn
            >
          </v-flex>
        </div>
      </div>
    </div>
    <div class="disponible">
      <div class="title2">Les couvoiturage courament disponible</div>
      <div class="content">
        <v-card v-for="(c, i) in couvoiturage" :key="i" class="my-5" :class="{animate : recherchDepart === c.depart && recherchArrive === c.arrive}">
          <v-card-title class="headline success white--text "
            >{{ c.depart }} <v-icon class="mx-3" color="white"> mdi-arrow-right-thick</v-icon> {{ c.arrive }}     <v-btn class="ml-auto">Consulter</v-btn></v-card-title
          >

          <div class="details">
            <div class="chauf">
              <span><span class="att">Nom :</span> {{ c.chauffeur.nom }} </span>
              <span><span class="att">Age :</span>{{ c.chauffeur.age }} </span>
              <span> <span class="att">N° tel :</span>{{ c.chauffeur.tel }} </span>
            </div>
            <div class="voiture">
              <span><span class="att">Voiture :</span> {{ c.voiture.marque }} </span>
              <span><span class="att">Année :</span> {{ c.voiture.année }} </span>
              <span><v-icon class="mx-3" v-if="!c.fumée"> mdi-smoking-off</v-icon><v-icon class="mx-3" v-if="c.musique"> mdi-music</v-icon></span>
            </div>
            <div class="place">
              <span><span class="att">N° places :</span> {{ c.voiture.nombreDePlace }} </span>
              <span><span class="att">Cout :</span> {{ c.cout }} DZD </span>
              <span><span class="att">Depart:</span>  {{ c.date }} </span>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  components: {},

  data: () => ({
    recherchDepart : '',
    recherchArrive : '',
    couvoiturage: [
      {
        depart: "Saida",
        arrive: "Alger",
        date: new Date().toISOString().substr(0, 10),
        chauffeur: {
          nom: "Mohamed",
          age: 25,
          tel: "0780648546"
        },
        voiture: {
          marque: "accent",
          année: 2019,
          nombreDePlace: 4
        },
        animeaux: false,
        fumée: true,
        cout: 500,
        musique : true
      },
    
    ],
    date: new Date().toISOString().substr(0, 10),
    time: "11:15",
    nom: "",
    age: "",
    depart: "",
    arrive: "",
    voiture: "",
    année: "",
    nombreDePlace: "",
    animeaux: false,
    fumée: false,
    tel: "",
    musique: false,
    cout: "500",
    ville: [
      { id: "1", code: "1", nom: "Adrar" },
      { id: "2", code: "2", nom: "Chlef" },
      { id: "3", code: "3", nom: "Laghouat" },
      { id: "4", code: "4", nom: "Oum El Bouaghi" },
      { id: "5", code: "5", nom: "Batna" },
      { id: "6", code: "6", nom: "B\u00e9ja\u00efa" },
      { id: "7", code: "7", nom: "Biskra" },
      { id: "8", code: "8", nom: "B\u00e9char" },
      { id: "9", code: "9", nom: "Blida" },
      { id: "10", code: "10", nom: "Bouira" },
      { id: "11", code: "11", nom: "Tamanrasset" },
      { id: "12", code: "12", nom: "T\u00e9bessa" },
      { id: "13", code: "13", nom: "Tlemcen" },
      { id: "14", code: "14", nom: "Tiaret" },
      { id: "15", code: "15", nom: "Tizi Ouzou" },
      { id: "16", code: "16", nom: "Alger" },
      { id: "17", code: "17", nom: "Djelfa" },
      { id: "18", code: "18", nom: "Jijel" },
      { id: "19", code: "19", nom: "Setif" },
      { id: "20", code: "20", nom: "Saida" },
      { id: "21", code: "21", nom: "Skikda" },
      { id: "22", code: "22", nom: "Sidi Bel Abb\u00e8s" },
      { id: "23", code: "23", nom: "Annaba" },
      { id: "24", code: "24", nom: "Guelma" },
      { id: "25", code: "25", nom: "Constantine" },
      { id: "26", code: "26", nom: "M\u00e9d\u00e9a" },
      { id: "27", code: "27", nom: "Mostaganem" },
      { id: "28", code: "28", nom: "M'Sila" },
      { id: "29", code: "29", nom: "Mascara" },
      { id: "30", code: "30", nom: "Ouargla" },
      { id: "31", code: "31", nom: "Oran" },
      { id: "32", code: "32", nom: "El Bayadh" },
      { id: "33", code: "33", nom: "Illizi" },
      { id: "34", code: "34", nom: "Bordj Bou Arreridj" },
      { id: "35", code: "35", nom: "Boumerd\u00e8s" },
      { id: "36", code: "36", nom: "El Tarf" },
      { id: "37", code: "37", nom: "Tindouf" },
      { id: "38", code: "38", nom: "Tissemsilt" },
      { id: "39", code: "39", nom: "El Oued" },
      { id: "40", code: "40", nom: "Khenchela" },
      { id: "41", code: "41", nom: "Souk Ahras" },
      { id: "42", code: "42", nom: "Tipaza" },
      { id: "43", code: "43", nom: "Mila" },
      { id: "44", code: "44", nom: "A\u00efn Defla" },
      { id: "45", code: "45", nom: "Na\u00e2ma" },
      { id: "46", code: "46", nom: "A\u00efn T\u00e9mouchent" },
      { id: "47", code: "47", nom: "Gharda\u00efa" },
      { id: "48", code: "48", nom: "Relizane" }
    ]
  }),
  methods: {
    async submit() {
      var send = {
        depart: this.depart,
        arrive: this.arrive,
        date: this.date + '  a  '+ this.time,
        chauffeur: {
          nom: this.nom,
          age: this.age,
          tel: this.tel
        },
        voiture: {
          marque: this.voiture,
          année: 2019,
          nombreDePlace: this.nombreDePlace
        },
        animeaux: this.animeaux,
        fumée: this.fumée,
        cout: this.cout
      };
      if(this.depart && this.arrive) {
         await axios("/ajouterArticle", { data: send, method: "post" });
         location.reload()
      }
    },
    cherch () {
      window.scrollTo(0,2000)
      this.recherchDepart = this.d;
      this.recherchArrive = this.a;
    }
  },
  async created() {
    let res = await axios.get("/obtenirLesArticles");
    this.couvoiturage = this.couvoiturage.concat(res.data);
  }
};
</script>

<style scoped>
.search {
  height: 80vh;
  width: 100%;
  position: relative;
}
.title2 {
  font-size: 3rem;
  margin: 4rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, 50px);
  grid-template-rows: repeat(6, auto);
  grid-row-gap: 2.2rem;
  box-shadow: 0rem 0rem 2rem rgba(105, 105, 105, 0.685);
  grid-column-gap: 2rem;
  padding: 2rem;
}
.one {
  grid-column: 1/5;
  grid-row: 1/2;
}
.two {
  grid-column: 5/9;
  grid-row: 1/2;
}
.zwolf {
  grid-column: 9/13;
  grid-row: 1/2;
}
.three,
.four {
  grid-row: 2/3;
}
.three {
  grid-column: 1/7;
}
.four {
  grid-column: 7/13;
}
.five {
  grid-column: 1/5;
}
.six {
  grid-column: 5/9;
}
.seven {
  grid-column: 9/13;
}
.eight {
  grid-row: 4/5;
  grid-column: 1/-1;
}
.twelve {
  grid-row: 6/7;
  grid-column: 1/-1;
  display: flex;
  margin-top: 2rem;
}
.time {
  grid-row: 5/6;
  grid-column: 1/-1;
}
.video {
  object-fit: cover;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.main-content {
  z-index: 2;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  min-width: 60%;
  justify-content: center;
}
.titler {
  text-align: center;
  font-size: 50px;
  margin-bottom: 2rem;
  color: white;
}
.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.input {
  max-width: 400px;
  flex-grow: 1;
}
.btn__container {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
}
.trajets {
  min-width: 700px;
  margin: 0 auto;
  text-align: center;
}
form {
  width: 100%;
}
.field {
  max-width: 200px;
}
.btn2 {
  margin-left: auto;
}
.disponible {
  margin: 0 auto;
}

.details {
  margin: 0 2rem;
   padding: 1rem;
}
.details > * {
  margin: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.details > *  > * {
  flex-basis: 33%;
  padding: 1rem;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
}
.att {
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: 1rem;
  text-decoration: underline;
}
.animate {
  animation: flow .5s linear infinite;
}
@keyframes flow {
  0% {
    transform: scale(1)
  }
   50% {
    transform: scale(1.04)
  }
   100% {
    transform: scale(1)
  }
}
.navbar {
  padding: 1rem 2rem;
  font-family: sans-serif;
  font-size:1rem;
  
}
</style>
