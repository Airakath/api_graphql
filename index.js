const { ApolloServer } = require('apollo-server');
const courses = require('./includes/courses');
const instructors = require('./includes/instructors');

const typeDefs = ` 

    enum Categories {
        WEB
        GAME
        OTHER
    }

    type Course {
        id: ID
        name: String
        description: String
        image: String
        price: Int
        category: Categories!
    }

    type Instructor {
        id: ID
        firsName: String
        lastName: String
        website: String
        image: String
        title: String        
    }

    type Query {
        hello: String!
        totalCourses: Int!
        allCourses: [Course]!
        allInstructors: [Instructor]!
    }

    type Mutation {
        postCourse(name: String! description: String! price: Int!): Boolean!
    }

`;

var _id = 5;

const resolvers = {
	Query: {
		hello: () => "Hello l'API fonctionne !",
		totalCourses: () => courses.cours.length,
		allCourses: () => courses.cours,
		allInstructors: () => instructors.instructors
    },
    Mutation: {
        postCourse(_, args) {
            var newCourse = {
                id: _id++,
                ...args
            }
            courses.cours.push(newCourse);
            return true
        }
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
