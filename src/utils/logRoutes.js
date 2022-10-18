import boxen from 'boxen'
import {
  dodgerblue,
  gray,
  lime,
  orange,
  peachpuff,
  plum,
  red,
  yellow,
} from '../config/colors.js'

const { max } = Math

const colorMethodMapping = new Map([
  ['DELETE', red],
  ['GET', dodgerblue],
  // ['HEAD', ...],
  ['PATCH', orange],
  ['POST', plum],
  ['PUT', dodgerblue],
])

// logs based on:
// https://github.com/serverless/serverless/blob/master/lib/classes/CLI.js

function logRoute(method, server, path, maxLength, dimPath = false) {
  const methodColor = colorMethodMapping.get(method) ?? peachpuff
  const methodFormatted = method.padEnd(maxLength, ' ')

  return `${methodColor(methodFormatted)} ${yellow.dim('|')} ${gray.dim(
    server,
  )}${dimPath ? gray.dim(path) : lime(path)}`
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
