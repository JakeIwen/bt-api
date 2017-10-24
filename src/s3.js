import csv from 'csvtojson'
import fs from 'fs'
import path from 'path'



export async function fetchReport(file) {
  return new Promise( (resolve, reject) => {
    let rows = []
    csv()
    .fromFile(`./src/data/${file}.csv`)
    .on('json', (json) => {
      rows.push(json)
    })
    .on('done', (error) => {
      if (error) {reject(error)}
      resolve(rows)
    })
  })
}


export async function getAllReports(){
  try {
    let passwordFail = await fetchReport('passwordFail')
    let topLogins = await fetchReport('topLogins')
    let usernameFail = await fetchReport('usernameFail')
    return [
      ...passwordFail,
      ...topLogins,
      ...usernameFail
    ]
  } catch (e) {
    console.log("getAllReports error", e)
  }
}



export async function compileReports(){
  try {
    let compiled = []
    let allReports = await getAllReports()
    allReports.forEach( (report) => {
      let index
      let found = compiled.find( (row, i) =>{
        index = i
        return report['user_name'] === row['user_name']
      })
      if (found) {
        compiled[i] = {
          ...report,
          ...found
        }
      } else {
        compiled.push(report)
      }
    })
    let final = []
    compiled.forEach( (user) => {
      console.log("user", user)
      let newUser = {
        name: user['user_name'],
        id: user['user_id'],
        email: user.email,
        logins: user.logins,
        urlDashboard: user['url_dashboard'],
        failedLogins: {
          total: 0,
          password: 0,
          username: 0
        }
      }
      if (user['failed_pass']) {
        newUser.failedLogins.password = parseInt(user['failed_pass'])
      }
      if (user['failed_user']) {
        newUser.failedLogins.username = parseInt(user['failed_user'])
      }
      newUser.failedLogins.total = newUser.failedLogins.password + newUser.failedLogins.username
      final.push(newUser)
    })
    return final
  } catch (e) {
    console.log("compileReports error", e)
  }
}

export function fetchSummary() {
  return fs.readFileSync(
    path.join(__dirname,`./data/Summary.txt`),
    'utf8',
    (err, source) => {
      if (err) {throw err}
      return source
    }
  )
}
