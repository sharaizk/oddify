const Filters = require("../models/filters.model");

exports.getFilters = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res
        .status(403)
        .json({ error: "You are unauthorized to complete this request" });
    }

    const myFilters = await Filters.find({ userId: id })
      .sort("-created_at")
      .populate({
        path: "competitions",
        select: "title",
      });

    return res.status(200).json({
      filters: myFilters,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.saveFilter = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res
        .status(403)
        .json({ error: "You are unauthorized to complete this request" });
    }

    const myFilters = await Filters.find({ userId: id });
    if (myFilters.length >= 5) {
      return res.status(423).json({
        error: "You can't add more than 5 filters",
      });
    }

    const { leagueSettings, betSettings } = req.body;
    const newFilter = new Filters({
      userId: id,
      leagueSettings: {
        ...leagueSettings,
      },
      betSettings: {
        ...betSettings,
      },
    });

    const savedFilter = await newFilter.save();
    if (savedFilter) {
      return res.status(200).json({ message: "Filter saved successfully" });
    }
    return res.status(404).json({
      error: "Couldn't save the filter, try again or contact support",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
