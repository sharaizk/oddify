const User = require("../models/user.model");
const Notifications = require("../models/notifications.model");
const MarketBooks = require("../models/marketbooks.model");
const Filters = require("../models/filters.model");
const Competitions = require("../models/competitions.model");
const Events = require("../models/events.model");

exports.getTelegramCode = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user.id });
  console.log(currentUser);

  return res.status(200).json({
    email: currentUser.email,
    telegram_code: currentUser.telegram_code,
    telegram_status: currentUser.telegram_status,
  });
};

exports.telegramBot = async (req, res) => {
  const key = req.body.key;
  const chatId = req.body.chat_id;
  const username = req.body.username;

  const botToken = `${process.env.TELEGRAM_BOT_TOKEN}`;

  if (key === "email") {
    //find user by email
    let userByChatId = await User.findOne({ telegram_chat_id: chatId }).select(
      "email name username telegram_code telegram_status telegram_username telegram_chat_id"
    );

    if (userByChatId === null || userByChatId.telegram_status === 0) {
      let user = await User.findOne({ email: req.body.text });

      if (user !== null && user.telegram_status === null) {
        const updateUser = await User.findOneAndUpdate(
          {
            email: user.email,
          },
          {
            telegram_status: 0,
            telegram_username: username,
            telegram_chat_id: chatId,
          }
        );

        console.log(updateUser);

        const responceUrl =
          "https://api.telegram.org/bot" +
          botToken +
          "/sendMessage?chat_id=" +
          chatId +
          "&text=Success, please provide your secret code now";
        const XMLHttpRequest = require("xhr2");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", responceUrl, true);
        xhr.send(null);
      } else if (containsOnlyNumbers(req.body.text)) {
        // console.log(req.body.text);
        // return '1';
        let verifiedUser = await User.findOne({
          telegram_code: parseInt(req.body.text),
        }).select(
          "email name username telegram_code telegram_status telegram_username telegram_chat_id"
        );

        if (verifiedUser !== null && verifiedUser.telegram_status === 0) {
          const updateVerifiedUser = await User.findOneAndUpdate(
            {
              email: verifiedUser.email,
            },
            {
              telegram_status: 1,
            }
          );
          const responceUrl =
            "https://api.telegram.org/bot" +
            botToken +
            "/sendMessage?chat_id=" +
            chatId +
            "&text=Success, yout account is verified now";
          const XMLHttpRequest = require("xhr2");
          const xhr = new XMLHttpRequest();
          xhr.open("GET", responceUrl, true);
          xhr.send(null);
        } else {
          const responceUrl =
            "https://api.telegram.org/bot" +
            botToken +
            "/sendMessage?chat_id=" +
            chatId +
            "&text=Code is not found, try again please";
          const XMLHttpRequest = require("xhr2");
          const xhr = new XMLHttpRequest();
          xhr.open("GET", responceUrl, true);
          xhr.send(null);
        }
      } else {
        const responceUrl =
          "https://api.telegram.org/bot" +
          botToken +
          "/sendMessage?chat_id=" +
          chatId +
          "&text=Please, provide correct code";
        const XMLHttpRequest = require("xhr2");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", responceUrl, true);
        xhr.send(null);
      }
    } else if (userByChatId.telegram_status === 1) {
      const responceUrl =
        "https://api.telegram.org/bot" +
        botToken +
        "/sendMessage?chat_id=" +
        chatId +
        "&text=You are alredy verified";
      const XMLHttpRequest = require("xhr2");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", responceUrl, true);
      xhr.send(null);
    } else {
      const responceUrl =
        "https://api.telegram.org/bot" +
        botToken +
        "/sendMessage?chat_id=" +
        chatId +
        "&text=Not found";
      const XMLHttpRequest = require("xhr2");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", responceUrl, true);
      xhr.send(null);
    }
  }

  console.log(req.body);

  function containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
};

exports.addTelegramNotification = async (req, res) => {
  console.log(req.body);
  let userId = req.user.id;
  let market = req.body.market;
  let user = await User.findOne({ _id: req.user.id });

  const newNotification = new Notifications({
    user_id: userId,
    market: market,
    chat_id: user.telegram_chat_id,
  });

  const createNotification = await newNotification.save();

  return res.status(200).json({
    success: true,
  });
};

exports.getMarketrunnersUpdates = async (req, res) => {
  let changedDocument = req.body.changeEvent.fullDocument;

  let id = changedDocument._id.$oid;
  let marketId = changedDocument.marketId.$numberDouble;
  let eventId = changedDocument.eventId.$numberInt;
  let selectionId = changedDocument.selectionId.$numberInt;
  let type = changedDocument.type;
  let marketStatus = changedDocument.marketStatus;
  let marketStartTime = changedDocument.marketStartTime;
  let totalMatched = changedDocument.totalMatched.$numberInt;
  let previousTotalMatched = changedDocument.previousTotalMatched.$numberInt;
  let score = changedDocument.score;
  let odds = changedDocument.odds;
  let totalAvailable = changedDocument.totalAvailable;
  let runnerName = changedDocument.runnerName;

  let gap = totalMatched - previousTotalMatched;
  gap = (gap / previousTotalMatched) * 100;

  const marketBook = await MarketBooks.findOne({
    bookId: marketId,
  });

  // competitions ID's are wrong in db
  const competition = await Competitions.findOne({
    competitionId: marketBook.competitionId,
  });

  const usersFilters = await Filters.find({
    $and: [
      {
        // LEAGUE SETTINGS:
        $or: [
          {
            bothTeamsToScore: { $in: [runnerName] },
          },
          {
            halfTimeMatchOdds: { $in: [runnerName] },
          },
          {
            overUnder: { $in: ["^" + runnerName] },
          },
          {
            selectedCompetion: { $in: [competition.title] },
          },
          {
            selectedCompetion: [],
          },
        ],
      },
      // BET SETTINGS
      {
        $or: [
          {
            selectedMarkets: { $in: [runnerName] },
          },
          {
            selectedMarkets: [],
          },
          {
            gameStatus: "All",
          },
          {
            gameStatus: type,
          },
          {
            moneyRaise: { $lt: totalMatched },
          },
          {
            raisePercent: { $lt: gap },
          },
          {
            marketMoney: { $lt: gap },
          },
          {
            minimumOdds: { $gt: odds },
          },
          {
            maximumOdds: { $lt: odds },
          },
          // {
          //   startOdds: odds,
          // },
          // {
          //   firstOddsChangePercent: { $lt: odds },
          // },
        ],
      },
    ],
  }).populate("userId");

  const users = await User.find({
    telegram_username: "Lex_Alexey",
  });

  const botToken = `${process.env.TELEGRAM_BOT_TOKEN}`;

  users.forEach(async (user) => {
    let text =
      "\n<b>Status: </b>" +
      marketStatus +
      "\n<b> Type: </b>" +
      type +
      "\n<b> Market: </b>" +
      marketBook.marketName +
      "\n<b> Competition: </b>" +
      "Swiss Challenge League" +
      "\n<b> Region: </b>" +
      "EU" +
      "\n<b> Start Time: </b>" +
      marketStartTime +
      "\n<b> Total: </b>" +
      totalMatched;
    let responceUrl =
      "https://api.telegram.org/bot" +
      botToken +
      "/sendMessage?chat_id=" +
      user.telegram_chat_id +
      "&parse_mode=HTML&text=" +
      text;
    let XMLHttpRequest = require("xhr2");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", responceUrl, true);
    xhr.send(null);
  });

  console.log(users);

  return res.status(200).json({
    success: true,
  });
};
