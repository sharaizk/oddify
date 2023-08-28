const { betfairInstance } = require("../helpers/betfairInstance");
const Competitions = require("../models/competitions.model");
const Events = require("../models/events.model");
const MarketBooks = require("../models/marketbooks.model");
const MarketRunners = require("../models/runners.model");
const { countryCodeToName } = require("../helpers/functions");
const Country = require("../models/country.model");

exports.listEvents = async (req, res) => {
  try {
    const { Inplay = false } = req.body;
    const events = await Events.aggregate([
      {
        $match: {
          inPlay: Inplay,
        },
      },
      {
        $lookup: {
          from: "marketrunners",
          localField: "eventId",
          foreignField: "eventId",
          as: "runners",
          pipeline: [
            {
              $project: {
                eventId: 1,
                totalMatched: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          calculatedTotalMatched: { $sum: { $sum: "$runners.totalMatched" } },
        },
      },
      {
        $project: {
          eventId: 1,
          calculatedTotalMatched: 1,
          eventTitle: 1,
          league: 1,
          countryCode: 1,
          openDate: 1,
        },
      },
    ]);
    return res.status(200).json({
      data: events,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.listMarketBook = async (req, res) => {
  try {
    const { marketId } = req.params;
    const marketRunners = await MarketRunners.find({ marketId: marketId }).sort(
      { runnerName: 1 }
    );

    return res.status(200).json({
      marketRunners: marketRunners,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.listMarketCatalogue = async (req, res) => {
  try {
    const { eventId } = req.params;
    const marketCatalogue = await MarketBooks.find({
      eventId: eventId,
    }).populate({
      path: "event",
      select: "eventTitle league countryCode",
    });
    return res.status(200).json({
      marketCatalogue: marketCatalogue,
      competition: marketCatalogue[0].event.league || "",
      event: marketCatalogue[0].event.eventTitle || "",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCompetition = async (req, res) => {
  try {
    const competitions = await Competitions.find({}).select(
      "-_id title competitionId"
    );
    return res.status(200).json({
      competitions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.listCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).select(
      "-_id countryCode countryName"
    );

    return res.status(200).json({
      countries,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.fillEvents = async () => {
  try {
    // await Events.deleteMany({});
    let inPlayEvents = await betfairInstance.post("/listEvents/", {
      filter: {
        eventTypeIds: ["1"],
        inPlayOnly: true,
      },
    });

    inPlayEvents = inPlayEvents.data.map((event) => event.event.id);
    let preMatchEvents = await betfairInstance.post("/listEvents/", {
      filter: {
        eventTypeIds: ["1"],
        inPlayOnly: false,
      },
    });

    preMatchEvents = preMatchEvents.data.map((event) => event.event.id);

    return {
      inPlay: inPlayEvents,
      preMatchEvents: preMatchEvents,
    };
  } catch (error) {
    console.log(error);
  }
};

exports.getEventDetails = async (eventId, inPlay) => {
  try {
    const events = await betfairInstance.post("/listMarketCatalogue/", {
      filter: {
        eventTypeIds: [1],
        eventIds: [eventId],
      },
      maxResults: "1000",
      marketProjection: ["COMPETITION", "EVENT", "MARKET_START_TIME"],
    });
    let totalMatched = 0;
    events.data.forEach((dataEvent) => {
      totalMatched += dataEvent.totalMatched;
    });
    let parsedEvent = {
      eventId: events.data[0].event.id,
      eventTitle: events.data[0].event.name,
      countryCode: events.data[0].event.countryCode,
      openDate: events.data[0].event.openDate,
      totalMatched: parseFloat(totalMatched).toFixed(2),
      currentTotalMatched: parseFloat(totalMatched).toFixed(2),
      league: events.data[0].competition.name,
      inPlay: inPlay || false,
    };
    return { parsedEvent };
  } catch (error) {
    console.log(error);
  }
};

exports.getEventMarketBooks = async (eventId) => {
  try {
    const eventMarketBook = await betfairInstance.post(
      "/listMarketCatalogue/",
      {
        filter: {
          eventTypeIds: [1],
          eventIds: [eventId],
        },
        maxResults: "1000",
        marketProjection: ["COMPETITION", "EVENT", "MARKET_START_TIME"],
      }
    );

    let marketBooks = eventMarketBook.data.map((marketBook) => {
      return {
        bookId: marketBook.marketId,
        marketName: marketBook.marketName,
        eventId: eventId,
        totalMatched: marketBook.totalMatched,
        competitionId: marketBook.competition.id,
        marketStartTime: marketBook.marketStartTime,
      };
    });

    await MarketBooks.insertMany(marketBooks);
    return "succes";
  } catch (error) {
    console.log(error);
  }
};

exports.getMarketRunners = async (eventId, i) => {
  try {
    // const { eventId, i } = req.body;
    const eventMarkets = await MarketBooks.find({
      eventId: `${eventId}`,
    }).select("bookId");
    let marketIds = eventMarkets.map((market) => `${market.bookId}`);
    const marketRunnersCatalogue = await betfairInstance.post(
      "/listMarketCatalogue/",
      {
        filter: {
          eventTypeIds: [1],
          eventIds: [eventId],
        },
        maxResults: "1000",
        marketProjection: ["RUNNER_METADATA"],
      }
    );

    // return;
    const marketBooksRunners = await betfairInstance.post("/listMarketBook/", {
      marketIds: [...marketIds],
      currencyCode: "EUR",
      priceProjection: {
        priceData: ["SP_AVAILABLE", "SP_TRADED"],
      },
    });
    let marketBookRunnerData = marketBooksRunners.data;
    let marketRunnerDetails = [];


    const marketBookRunnersLength = marketBookRunnerData.length;

    for (let i = 0; i < marketBookRunnersLength; i++) {
      const catalogue = marketRunnersCatalogue.data.find(
        (runnerCatalogue) =>
          marketBookRunnerData[i].marketId == runnerCatalogue.marketId
      );

      const t = marketBookRunnerData[i].runners.map((runner) => {
        const marketBookDetail = marketBookRunnerData[i];

        // // console.log();
        const runnerDetail = catalogue.runners.find(
          (run) => run.selectionId === runner.selectionId
        );

        return {
          eventId: eventId,
          marketId: marketBookRunnerData[i].marketId,
          runnerName: runnerDetail.runnerName,
          selectionId: runner?.selectionId || "",
          type: marketBookDetail.inplay ? "Live" : "Prematch",
          marketStatus: marketBookDetail.status,
          marketStartTime: eventMarkets[i].marketStartTime || null,
          totalMatched: runner?.totalMatched || 0,
          previousTotalMatched: 0,
          lastMatchTime: marketBookDetail.lastMatchTime || null,
          score: marketBookDetail?.score || null,
          odds: runner?.lastPriceTraded || null,
          totalAvailable: marketBookDetail.totalMatched,
        };
      });
      marketRunnerDetails.push(...t);
    }

    const savedRunners = await MarketRunners.insertMany(marketRunnerDetails);
    return savedRunners;
  } catch (error) {
    console.log(error);
  }
};

exports.updateMarketRunners = async (eventId, i) => {
  try {
    console.log(eventId, i);

    const eventMarkets = await MarketBooks.find({ eventId: `${eventId}` });
    let marketIds = eventMarkets.map((market) => `${market.bookId}`);
    const marketBooksRunners = await betfairInstance.post("/listMarketBook/", {
      marketIds: [...marketIds],
      currencyCode: "EUR",
      priceProjection: {
        priceData: ["SP_AVAILABLE", "SP_TRADED"],
      },
    });

    let marketBookRunnerData = marketBooksRunners.data;
    let promises = [];
    for (let i = 0; i < marketBookRunnerData.length; i++) {
      const marketRunnersLength = marketBookRunnerData[i].runners.length;

      for (let j = 0; j < marketRunnersLength; j++) {
        const runner = marketBookRunnerData[i].runners[j];
        const marketBookDetail = marketBookRunnerData[i];

        const oldRunner = await MarketRunners.findOne({
          marketId: marketBookRunnerData[i].marketId,
          selectionId: runner.selectionId,
          $or: [
            {
              totalMatched: { $lt: runner?.totalMatched },
              odds: { $ne: runner?.lastPriceTraded },
            },
          ],
        }).sort({ created_at: -1 });
        if (oldRunner) {
          const newRunner = await MarketRunners.create({
            eventId: eventId,
            marketId: oldRunner.marketId,
            runnerName: oldRunner.runnerName,
            selectionId: runner.selectionId || "",
            type: marketBookDetail.inplay ? "Live" : "Prematch",
            marketStatus: marketBookDetail.status,
            marketStartTime: oldRunner.marketStartTime || null,
            totalMatched: runner?.totalMatched || 0,
            previousTotalMatched: oldRunner.totalMatched,
            lastMatchTime: marketBookDetail.lastMatchTime || null,
            score: marketBookDetail?.score || null,
            odds: runner?.lastPriceTraded || null,
            totalAvailable: marketBookDetail.totalMatched,
          });
        }
      }
    }

    console.log("updated", eventId);

    return "success";
  } catch (error) {
    console.log(error);
  }
};

exports.prematchToLiveEvents = async () => {
  try {
    let inPlayEvents = await betfairInstance.post("/listEvents/", {
      filter: {
        eventTypeIds: ["1"],
        inPlayOnly: true,
      },
    });

    inPlayEvents = inPlayEvents.data.map((event) => `${event.event.id}`);

    const bulkUpdate = await Events.bulkWrite([
      {
        updateMany: {
          filter: {
            eventId: { $in: [...inPlayEvents] },
            inPlay: false,
          },
          update: {
            inPlay: true,
          },
        },
      },
    ]);

    return {
      modifiedCount: bulkUpdate.modifiedCount,
    };
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteEvents = async () => {
  try {
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 8);
    let events = await Events.find({ openDate: { $gt: cutoff } });
    events = events.map((event) => event.eventId);

    await Events.deleteMany({ eventId: { $in: events } });
    await MarketBooks.deleteMany({ eventId: { $in: events } });
    await MarketRunners.deleteMany({ eventId: { $in: events } });

    return "succesfully deleted";
  } catch (error) {
    console.log(error);
  }
};
