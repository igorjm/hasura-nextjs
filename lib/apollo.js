import { useMemo } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://talented-weasel-61.hasura.app/v1/graphql",
      headers: { "Content-Type": "application/json" },
    }),
    cache: new InMemoryCache(),
  });
};

let apolloClient;

export default function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ? apolloClient : createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    // restore cache
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // if the mode is ssr
  if (typeof window === "undefined") return _apolloClient;

  // create client once on the frontend
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(inititalState) {
  const store = useMemo(() => initializeApollo(inititalState), [inititalState]);
  return store;
}
