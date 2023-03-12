const {
  readInput,
  inquirerMenu,
  stop,
  listPlaces,
} = require("./helpers/inquirer");

const Searches = require("./models/searches");

const main = async () => {
  console.clear();
  const searches = new Searches();
  let option = 0;
  do {
    option = await inquirerMenu();

    if (option !== 0) await stop();

    switch (option) {
      case 1:
        //Search
        const searchText = await readInput("Type any City!:");
        const places = await searches.searchCity(searchText);

        //Select a place
        const id = await listPlaces(places);

        //In case user select cancel
        if (id === "0") continue;

        const { name, lat, lng } = places.find((place) => place.id == id);

        //Weather
        const { desc, min, max, temp } = await searches.placeWeather(lat, lng);

        //Add record
        searches.addRecord(name);

        //Show results
        console.clear();
        console.log("\nCity details \n".green);
        console.log("City:", name.green);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperature:", temp);
        console.log("Min:", min);
        console.log("Max:", max);
        console.log("How is the weather?:", desc);

        break;
      case 2:
        //Recors
        searches.getCapitalRecords.forEach((record, index) =>
          console.log(`${`${index + 1}.`.green} ${record}`)
        );
        break;
    }
  } while (option !== 0);
};

main();
