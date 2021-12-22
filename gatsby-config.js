require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Simple Flashcard App",
    siteUrl: `https://simpleflashcard.gatsbyjs.io/`,
    description: `Flashcard app allows users to create their own flashcards and start memorizing them.`,
    lang: 'en-ca',
  },
  plugins: [],
};
