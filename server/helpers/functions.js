const RandomOTPGenerator = () => {
  return Math.floor(Math.random() * 9000 + 1000);
};

const countryCodeToName = (code) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return regionNames.of(code);
};

module.exports = {
  RandomOTPGenerator,
  countryCodeToName,
};
