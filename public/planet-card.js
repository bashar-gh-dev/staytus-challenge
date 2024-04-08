const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function generatePlanetsCards(planets) {
  return `${planets
    .map((planet) => {
      const planetDate = new Date(planet.created);
      const formattedPlanetDate = `${
        months[planetDate.getMonth()]
      } ${planetDate.getDate()}, ${planetDate.getFullYear()}`;
      return `
      <div
        class="group rounded-2xl p-4 my-4 bg-dark-grey hover:bg-darker-grey lg:bg-darker-grey lg:hover:bg-dark-grey hover:shadow transition-all duration-200"
      >
        <div class="mb-2 text-yellow lg:text-right">
          ${formattedPlanetDate}
        </div>
        <div
          class="lg:hidden float-left flex items-center justify-center rounded-full bg-grey mr-2 h-10 w-10"
        >
          ${planet.name[0].toUpperCase()}
        </div>
        <div
          class="float-right lg:float-left flex items-center justify-center rounded-2xl bg-dark-grey group-hover:bg-darker-grey lg:group-hover:bg-grey transition-all duration-200 text-sm text-yellow mr-3 h-10 w-10"
        >
          Icon
        </div>
        <div class="font-bold">
          ${planet.name[0].toUpperCase()}${planet.name.slice(0)}
        </div>
        <div class="text-light-grey lg:float-right">
          ${planet.climate[0].toUpperCase()}${planet.climate.slice(0)}
        </div>
        <div class="text-lighter-grey">
          ${planet.films
            .map(
              (film) => `${film.title[0].toUpperCase()}${film.title.slice(1)}`
            )
            .join(", ")}
        </div>
      </div>
   `;
    })
    .join("\n")}`;
}
