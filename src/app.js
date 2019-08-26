import { argvToArray, populateDateTime, argsToObject, validateInput, populateFromTo } from './parser'
import { printHelp, printRoutes, printLocations } from './printer'
import jkl from './jkl'

export const main = async (argv) => {
  const args = argvToArray(argv)
    |> #.filter(obj => !!obj)
    |> argsToObject
    |> populateDateTime
    |> populateFromTo
    |> await #

  if (!validateInput(args, argv)) {
    return printHelp()
  }

  printLocations(args)

  const routes = jkl.getQueryFromArgs(args)
    |> jkl.getRoutesByQuery
    |> await #

  printRoutes(routes)

  return routes
}
