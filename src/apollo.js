// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//     uri: "http://localhost:4000/",
//     resolvers : {
//         Movie:{
//             isLiked: () => false
//         },
//     Mutation:{ //client에서도 mutation을 통해 local state 변경 가능
//         likeMovie: (_, { id }, { cache }) => {
//                 cache.writeData({
//                     id:`Movie:${id}`, 
//                     data:{
//                     isLiked : true
//                 }});
//             }
//         }
//     }
// });

// export default client;

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
        resolvers: {
            Movie: {
            isLiked: () => false,
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                console.log(isLiked);
                const myMovie = {
                    __typename: 'Movie',
                    id: `${id}`,
                    isLiked: `${isLiked}`,
                };
                cache.modify({
                    id: cache.identify(myMovie),
                    fields: {
                    isLiked(cachedName) {
                    return !isLiked;
                    },
                    },
            });
          },
        },
    },
});

export default client;