/* initialise ma fonction pour récupérer les données de l'API */
const callApi = async (url) => {

    const api = await fetch(url);
    return api.json()
}


/* Affichage de mes objects */
const displayFilmInHtml = async (filmObject) => {
   
    const characters= await filmObject.charactersObj
    

    document.write(`<h1>Film: ${filmObject.title}</h1><p>Id : ${filmObject.id}</p><p>Director : ${filmObject.director}</p><p>Release_date : ${filmObject.release_date}</p>`)
    document.write("<h2>Characters</h2>")
    characters.forEach(char => {

        document.write(`<h3>Name : ${char.name}</h3><p>Height : ${char.height}</p><p>Mass: ${char.mass}</p><p>Hair color: ${char.hair_color}</p>`)
    })
}

/*récupère tous les films */

const getFilms = async () => {

    const api = await callApi("https://swapi.dev/api/films/")


    const filmsObject = []

    /* boucle sur le nombre de film pour pouvoir afficher le détail de chaque film */

     api.results.forEach( ({ url, characters, director, planets, release_date, species, starships, title, vehicles }) => {


        /*créer un nouvel objet pour chaque film*/
        let film = new Film(url, characters, director, planets, release_date, species, starships, title, vehicles)


        film.getCharacters(film.characters).then(res=>film.charactersObj=res)

        filmsObject.push(film)

    });

    filmsObject.forEach((film) => {displayFilmInHtml(film)})

}



/*héritage de director pour les films */
function Director(director) {
    this.director = director
}

 /* initialisation de mon objet people */
function People(name, height, mass, hair_color) {
    this.name = name
    this.height = height
    this.mass = mass
    this.hair_color = hair_color
}

 /* initialisation de mon objet film */
function Film(id, characters, director, planets, release_date, species, starships, title, vehicles) {


    Director.call(this, director) /* héritage histoire de faire un héritage, pas vraiment pertinent ?? */

    /*récupère tous les personnages(que 10 je sais pas pourquoi, suite page2 ?????) */
    this.getCharacters = async (characters) => {
        const allCharacters =  await callApi("https://swapi.dev/api/people/")
        /*filtre tous les personnages récupérer avant comparé au personnage présent dans le film  grace au filter/includes */
        return allCharacters.results.filter((char) => characters.includes(char.url))
    }

    /* initialisation de mon objet film */
    this.id = id
    this.planets = planets
    this.characters = characters
    this.charactersObj=this.getCharacters(characters)
    this.release_date = release_date
    this.species = species
    this.starships = starships
    this.title = title
    this.vehicles = vehicles
}


getFilms()



