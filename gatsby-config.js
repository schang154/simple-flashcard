require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "My First Gatsby Site",
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [],
};
