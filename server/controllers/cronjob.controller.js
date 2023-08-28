const Events = require("../models/events.model");
const MarketBooks = require("../models/marketbooks.model");
const MarketRunners = require("../models/runners.model");
const {
  getMarketRunners,
  fillEvents,
  getEventDetails,
  getEventMarketBooks,
  updateMarketRunners,
  prematchToLiveEvents,
  deleteEvents,
} = require("./betfair.controller");

exports.fetchEvents = async () => {
  try {
    const events = await fillEvents();
    let StoredEvents = await Events.find({});
    StoredEvents = StoredEvents.map((StoredEvent) => StoredEvent.eventId);

    const { inPlay, preMatchEvents } = events;
    const inPlayEventsLength = inPlay.length;

    let mappedEvents = [];
    console.log("FETCHING IN PLAY");
    for (let i = 0; i < inPlayEventsLength; i++) {
      if (!StoredEvents.includes(inPlay[i])) {
        const eventResponse = await getEventDetails(inPlay[i], true);
        mappedEvents = [...mappedEvents, eventResponse.parsedEvent];
      }
    }

    console.log("FETCHING PREMATCH");
    const preMatchEventsLength = preMatchEvents.length;
    for (let i = 0; i < preMatchEventsLength; i++) {
      if (!StoredEvents.includes(preMatchEvents[i])) {
        const eventResponse = await getEventDetails(preMatchEvents[i], false);
        mappedEvents = [...mappedEvents, eventResponse.parsedEvent];
      }
    }

    await Events.insertMany(mappedEvents);
    console.log("EVENTS STORED");
  } catch (error) {
    console.log(error);
  }
};

exports.fetchEventMarketBooks = async () => {
  try {
    const storedEvents = await Events.find({});
    const storedEventsLength = storedEvents.length;

    for (let i = 0; i < storedEventsLength; i++) {
      console.log(storedEvents[i].eventId, i);

      const storedMarketBooks = await MarketBooks.find({
        eventId: storedEvents[i].eventId,
      });

      if (storedMarketBooks.length <= 0) {
        const marketBookResponse = await getEventMarketBooks(
          storedEvents[i].eventId
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};


exports.fetchMarketRunners = async () => {
  try {
    // await MarketRunners.deleteMany({});
    const savedEvents = await Events.find();
    const savedEventsLength = savedEvents.length;

    for (let i = 0; i < savedEventsLength; i++) {
      console.log(savedEvents[i].eventId, i);

      const storeMarketRunners = await MarketRunners.find({
        eventId: savedEvents[i].eventId,
      });

      if (storeMarketRunners.length <= 0) {
        const marketRunnerResponse = await getMarketRunners(
          savedEvents[i].eventId,
          i
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.calculateRunnerChange = async () => {
  try {
    const savedEvents = await Events.find();
    const savedEventsLength = savedEvents.length;
    let promises = [];
    for (let i = 0; i < savedEventsLength; i++) {
      const marketUpdateRunnerResponse = await updateMarketRunners(
        savedEvents[i].eventId,
        i
      );
    }
  } catch (error) {
    console.log(error);
  }
};


exports.handlePrematchToLive = async () => {
  try {
    const prematchToLiveResponse = await prematchToLiveEvents();
  } catch (error) {
    console.log(error);
  }
};

exports.handleEventDeletion = async () => {
  try {
    const deletedEventResponse = await deleteEvents();
  } catch (error) {
    console.log(error);
  }
};
