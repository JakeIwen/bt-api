import faker from 'faker'
import {v4} from 'uuid'

const users = []

for (let i = 0; i < 200; i++) {
  let name = faker.name.findName()
  let id = v4()
  users.push({
    name,
    email: `${name}@gmail.com`,
    id: `auth|${id}`,
    urlDashboard: `https://manage.auth0.com/#/users/${id}`
  })
}

function rando(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateDummyHour () {
  let data = []
  users.forEach( (user) => {

    let logins = rando(0,15)
    let password = rando(0, 10)
    let username = rando(0,10)
    data.push({
      ...user,
      logins,
      failedLogins: {
        total: password + username,
        password,
        username
      }
    })
  })
  return data
}

export function generateDummyRange(start, end) {
  let hours = new Date(start - end).getHours()
  let raw = []
  for (let i = 0; i < hours; i++) {
    raw.push(...generateDummyHour())
  }
  let unique = []
  raw.forEach( (report) => {
    let index
    let found = unique.find( (user, i) =>{
      index = i
      return report.id === user.id
    })
    if (found) {
      unique[index] = {
        ...report,
        logins: report.logins + found.logins,
        failedLogins: {
          total: report.failedLogins.total + found.failedLogins.total,
          username: report.failedLogins.username + found.failedLogins.username,
          password: report.failedLogins.password + found.failedLogins.password,
        }
      }
    } else {
      unique.push(report)
    }
  })
  return unique
}
