const { ApolloServer } = require('apollo-server');
const db = require('./includes/courses');

const typeDefs = ` 
    type Query {
        hello: String!
        totalCourses: Int!
    }
`;

const resolvers = {
	Query: {
		hello: () => "Hello l'API fonctionne !",
		totalCourses: () => db.cours.length
	},
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
