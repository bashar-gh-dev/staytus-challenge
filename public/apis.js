export async function getReptilePlanets() {
  let species = [];
  let speciesNextPage = `https://swapi.dev/api/species`;
  // Fetch species, I used a loop here because I noticed that some times the results are paginated, therefore I need to make sure I am getting all pages
  while (true) {
    const speciesResponse = await axios.get(speciesNextPage);
    species = [...species, ...speciesResponse.data.results];
    if (!speciesResponse.data?.next) break;
    speciesNextPage = speciesResponse.data.next;
  }
  const reptileFilmsUrls = species
    // Only reptile species
    .filter(
      (speciesObj) => speciesObj.classification.toLowerCase() === "reptile"
    )
    // Get reptile films urls
    .reduce((filmsUrls, speciesObj) => {
      const filmsUrlsSet = new Set(filmsUrls);
      speciesObj.films.forEach((filmUrl) => {
        filmsUrlsSet.add(filmUrl);
      });
      return [...filmsUrlsSet];
    }, []);
  // Fetch reptile films
  const reptileFilms = await Promise.all(
    reptileFilmsUrls.map((filmUrl) =>
      axios.get(filmUrl).then((filmResponse) => filmResponse.data)
    )
  );
  // Group films by planet url
  const reptilePlanetsUrlsFilmsMap = reptileFilms.reduce((acc, film) => {
    const planetsDataAcc = { ...acc }; // I don't like mutating function arguments
    film.planets.forEach((planetUrl) => {
      if (!planetsDataAcc[planetUrl]) planetsDataAcc[planetUrl] = [];
      // there is no way to use sets here, because we are dealing with objects (not primitive)
      if (
        !planetsDataAcc[planetUrl].find(
          (planetFilm) => film.url === planetFilm.url
        )
      )
        planetsDataAcc[planetUrl].push(film);
    });
    return planetsDataAcc;
  }, {});
  // Fetch reptile planets
  const reptilePlanets = await Promise.all(
    Object.keys(reptilePlanetsUrlsFilmsMap).map((planetUrl) =>
      axios.get(planetUrl).then((filmResponse) => filmResponse.data)
    )
  );
  return (
    reptilePlanets
      // replace films urls with films objects
      .map((planet) => ({
        ...planet,
        films: reptilePlanetsUrlsFilmsMap[planet.url],
      }))
  );
}
