import boxen from 'boxen'
import chalk from 'chalk'

const { max } = Math

const blue = chalk.keyword('dodgerblue')
const grey = chalk.keyword('grey')
const lime = chalk.keyword('lime')
const orange = chalk.keyword('orange')
const peachpuff = chalk.keyword('peachpuff')
const plum = chalk.keyword('plum')
const red = chalk.keyword('red')
const yellow = chalk.keyword('yellow')

const colorMethodMapping = new Map([
  ['DELETE', red],
  ['GET', blue],
  // ['HEAD', ...],
  ['PATCH', orange],
  ['POST', plum],
  ['PUT', blue],
])

let log

export default function serverlessLog(msg) {
  if (log) {
    log(msg, 'offline')
  }
}

export function logLayers(msg) {
  console.log(`offline: ${blue(msg)}`)
}

export function setLog(serverlessLogRef) {
  log = serverlessLogRef
}

// logs based on:
// https://github.com/serverless/serverless/blob/master/lib/classes/CLI.js

function logRoute(method, server, path, maxLength, dimPath = false) {
  const methodColor = colorMethodMapping.get(method) ?? peachpuff
  const methodFormatted = method.padEnd(maxLength, ' ')

  return `${methodColor(methodFormatted)} ${yellow.dim('|')} ${grey.dim(
    server,
  )}${dimPath ? grey.dim(path) : lime(path)}`
}

function getMaxHttpMethodNameLength(routeInfo) {
  return max(...routeInfo.map(({ method }) => method.length))
}

export function logRoutes(routeInfo) {
  const maxLength = getMaxHttpMethodNameLength(routeInfo)
  routeInfo.forEach((route) => {
    console.log(logRoute(route.method, route.server, route.path, maxLength))
  })
}

export function logWarning(msg) {
  console.log(`offline: ${red(msg)}`)
}
