import {GraphQLSchema} from 'graphql'
import {queryType} from './types'

const schema = new GraphQLSchema({
  query: queryType
})

export default schema
