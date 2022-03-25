/*
!Graphql bu API ko`tarish uchun ishlatiladigan query language
server ko`tarish uchun expressni emas uning o`rniga apollo degan serverni ishlatamiz.
Graphqlda API build qilish uchun uni sxemasi bo`lishi kerak ya`ni api qanaqa strukturadaligini(Arraydami, Objectdami) ko`rsatib ketishimiz kerak va bu Databazadan keladigan ma`lumot biz tuzgan sxemaga mos kelishi kerak degani(dasturchi sifatida 1-bo`lib databasa tuziladi va o`sha bo`yicha Api sxemalashtiriladi)
databasadagi ma`lumot qachon bizni sxemamiz resolve bo`sa keyin keladi
! gql -> apollo-serverda gql degan syntax orqali biz query yozamiz

! type Query{} -> degan built-in type bor va vazifasi RestApidagi GET methodi
*/
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Users {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    getUsers: [Users]
  }
`;

const resolvers = {
  Query: {
    getUsers: () => [],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 3000 }, console.log("3000/graphql"));
