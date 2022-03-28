/*
!Graphql bu API ko`tarish uchun ishlatiladigan query language
server ko`tarish uchun expressni emas uning o`rniga apollo degan serverni ishlatamiz.
Graphqlda API build qilish uchun uni sxemasi bo`lishi kerak ya`ni api qanaqa strukturadaligini(Arraydami, Objectdami) ko`rsatib ketishimiz kerak va bu Databazadan keladigan ma`lumot biz tuzgan sxemaga mos kelishi kerak degani(dasturchi sifatida 1-bo`lib databasa tuziladi va o`sha bo`yicha Api sxemalashtiriladi)
databasadagi ma`lumot qachon bizni sxemamiz resolve bo`sa keyin keladi
! gql -> apollo-serverda gql degan syntax orqali biz query yozamiz

! type Query{} -> degan built-in type bor va vazifasi RestApidagi GET methodi
! "!" -> not null qiymat kelishi shart degani
Resolver -> sxemaga ma`lumotni tushirib beruvchi
!Mutation -> built-in type bo`lib bu restApi dagi "POST", "PUT", "DELETE" methodlarini o`rnini bosadi 
*/
const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    name: "Muslim",
    age: 21,
  },
  {
    id: 2,
    name: "Abdumalik",
    age: 20,
  },
];

const posts = [
  {
    id: 1,
    title: "kecha Qor yog`di",
    body: "Laylak qor yog`di",
    author: 1,
  },
  {
    id: 2,
    title: "Bugun Yomg`ir yog`di",
    body: "juda ko`p yog`di",
    author: 1,
  },
  {
    id: 3,
    title: "ertaga do`l yog`adi",
    body: "Moshinalaringizni panaga qo`ying",
    author: 2,
  },
];

const typeDefs = gql`
  type Users {
    id: ID!
    name: String!
    age: Int!
    posts: [Posts]
  }

  type Posts {
    id: ID!
    title: String!
    body: String
  }

  type Query {
    getUsers: [Users]
  }

  type Mutation {
    newUser(name: String!, age: Int!): String!
    updateUser(name: String!, age: Int!, id: ID!): String!
    deleteUser(id: ID!): String!
  }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getPosts: () => {
      return Posts;
    },
  },
  Mutation: {
    newUser: (_, { name, age }) => {
      users.push({ id: users.length + 1, name, age });
      return "Ok";
    },
    updateUser: (_, { name, age, id }) => {
      foundUser = users.find((e) => e.id == id);
      foundUser.name = name ? name : foundUser.name;
      foundUser.age = age ? age : foundUser.age;
      return "Updated";
    },
    deleteUser: (_, { id }) => {
      foundUser = users.findIndex((e) => e.id == id);
      users.splice(foundUser, 1);
      return "deleted";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 3000 }, console.log("3000/graphql"));
