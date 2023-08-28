const { betfairInstance } = require("./betfairInstance");
const eventsData = async (competitionEvent) => {
  try {
    const event = await betfairInstance.post("/listMarketCatalogue/", {
      filter: {
        eventTypeIds: ["1"],
        eventIds: [`${competitionEvent}`],
      },
      maxResults: "1000",
      marketProjection: ["COMPETITION", "EVENT"],
    });
    console.log(event.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  eventsData,
};
