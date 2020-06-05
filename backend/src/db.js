// This file connects to the remote prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: "https://eu1.prisma.sh/mhamadaa1997/mohammeda/dev"
//   process.env.PRISMA_ENDPOINT,
,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db;
