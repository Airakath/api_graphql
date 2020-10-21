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
        category: Categories
        postedBy: Instructor
    }

    type Instructor {
        id: ID
        firstName: String
        lastName: String
        website: String
        image: String
        title: String       
        postedCourses: [Course] 
    }

    input CourseInput {
        id: ID
        name: String! 
        description: String 
        price: Int
        category: Categories=OTHER
    }

    type Query {
        hello: String!
        totalCourses: Int!
        allCourses: [Course]!
        allInstructors: [Instructor]!
    }

    type Mutation {
        postCourse(input: CourseInput!): Course!
        updateCourseName(input: CourseInput): Course
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
                ...args.input
            }
            courses.cours.push(newCourse);
            return newCourse;
        },
        updateCourseName(_, args) {
            var theId = args.input["id"];
            console.log(theId);
            var foundCourse
            courses.cours.forEach(c => {
                if (c.id == theId) {
					c.name = args.input["name"];
					foundCourse = c;
				}
            })
            return foundCourse;
        }
    },
    Course: {
        postedBy: _ => {
            return instructors.instructors.find(i => i.firsName === _.instructor)
        }
    },
    Instructor: {
        postedCourses: _ => {
            var coursesList = [];
            courses.cours.forEach(c => {
                if(c.instructor === _.firstName) {
                    coursesList.push(c);
                }
            })
            return coursesList;
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
