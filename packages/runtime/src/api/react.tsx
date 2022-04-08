import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as useApolloQuery,
  useMutation as useApolloMutation,
  DefaultContext,
  ApolloCache,
  MutationHookOptions,
  MutationTuple,
  InMemoryCache,
  TypePolicies,
} from '@apollo/client'
export { gql } from '@apollo/client'
import { ApolloProviderProps } from '@apollo/client/react/context'
import { createContext, useContext } from 'react'

const Context = createContext<ApolloClient<NormalizedCacheObject> | undefined>(undefined)

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const client = useContext(Context)

  return useApolloQuery(query, { client, ...options })
}

export function useMutation<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>,
): MutationTuple<TData, TVariables, TContext, TCache> {
  const client = useContext(Context)

  return useApolloMutation(mutation, { client, ...options })
}

export function ApolloProvider({ client, children }: ApolloProviderProps<NormalizedCacheObject>) {
  return <Context.Provider value={client}>{children}</Context.Provider>
}

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      swatches(existingData, { args, toReference }) {
        return (
          existingData ??
          args?.ids.map((id: string) => toReference({ __typename: 'Swatch', id }, true))
        )
      },
      file(existingData, { args, toReference }) {
        return existingData ?? toReference({ __typename: 'File', id: args?.id }, true)
      },
      files(existingData, { args, toReference }) {
        return (
          existingData ??
          args?.ids.map((id: string) => toReference({ __typename: 'File', id }, true))
        )
      },
      typographies(existingData, { args, toReference }) {
        return (
          existingData ??
          args?.ids.map((id: string) => toReference({ __typename: 'Typography', id }, true))
        )
      },
      pagePathnamesById(existingData, { args, toReference }) {
        return (
          existingData ??
          args?.ids.map((id: string) => toReference({ __typename: 'PagePathnameSlice', id }, true))
        )
      },
      globalElement(existingData, { args, toReference }) {
        return existingData ?? toReference({ __typename: 'GlobalElement', id: args?.id }, true)
      },
      table(existingData, { args, toReference }) {
        return existingData ?? toReference({ __typename: 'Table', id: args?.id }, true)
      },
    },
  },
}

type CreateApolloClientParams = {
  uri?: string
  cacheData?: NormalizedCacheObject
}

export function createApolloClient({ uri, cacheData }: CreateApolloClientParams) {
  const cache = new InMemoryCache({ typePolicies })

  if (cacheData) cache.restore(cacheData)

  return new ApolloClient({ uri, cache })
}
