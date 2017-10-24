import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql'
import {compileReports, fetchSummary} from './s3'
import {generateDummyRange, generateDummyHour} from './dummy'

const orderByType = new GraphQLEnumType({
  name: 'orderBy',
  values: {
    failedLoginsTotal_ASC: {
      value: 'failedLoginsTotal_ASC'
    },
    failedLoginsTotal_DESC: {
      value: 'failedLoginsTotal_DESC'
    },
  }
})

const rangeType =  new GraphQLInputObjectType({
  name: 'Range',
  fields: {
    start: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    end: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  }
})

const failedLoginsType = new GraphQLObjectType({
  name: 'FailedLogins',
  fields: {
    total: {
      type: GraphQLInt
    },
    password: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLInt
    },
  }
})

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    failedLogins: {
      type: failedLoginsType
    },
    logins: {
      type: GraphQLInt
    },
    urlDashboard: {
      type: GraphQLString
    }
  },
})


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // user: {
    //   type: userType,
    //   args: {
    //     name: {
    //       type: GraphQLString
    //     }
    //   },
    //   resolve: async (src, {name}) => {
    //     try {
    //       let users = await compileReports()
    //       let user = users.find( (user) => {
    //         return user.name === name
    //       })
    //       if (!user) {throw new Error("User doesn't exist!")}
    //       return user
    //     } catch (e) {
    //       console.log("user query error", e)
    //       return `Error: ${e}`
    //     }
    //
    //   }
    // },
    allUsers: {
      type: new GraphQLList(userType),
      args: {
        orderBy: {
          type: orderByType
        },
        number: {
          type: GraphQLInt
        },
        range: {
          type: rangeType
        }
      },
      resolve: async (src, {orderBy, number, range}) => {
        try {
          let users
          if (range) {
            users = await generateDummyRange(range.start, range.end)
          } else {
            users = await generateDummyHour()
          }
          users.sort( (a, b) => {
            if (orderBy === 'failedLoginsTotal_DESC') {
              return a.failedLogins.total - b.failedLogins.total
            } else {
              return b.failedLogins.total - a.failedLogins.total
            }
          })
          if (number) {
            users = users.slice(0, number)
          }

          return users
        } catch (e) {
          console.log("allUser query error", e)
        }
      }
    },
    mostRecentSummary: {
      type: GraphQLString,
      resolve: async (src, args) => {
        try {
          let summary = await fetchSummary()
          return summary
        } catch (e) {
          console.log("summary query error", e)
        }
      }
    }
  }
})


export {queryType}
