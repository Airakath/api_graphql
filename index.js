const { ApolloServer } = require('apollo-server');

const typeDefs = ` 
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello l'API fonctionne !"
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen()
    .then(({url}) => {
        console.log(`API is running on ${url}`);
    })
