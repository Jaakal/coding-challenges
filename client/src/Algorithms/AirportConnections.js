import React, { Fragment, useEffect, useState } from 'react'

import { codeStringToHTML, stringifyBoolean } from '../utility/utility';

const codeString = `
const createRoutesHash = (routes, direction) => {
  const routesHash = {}
  const index1 = (direction === 'incoming') * 1
  const index2 = index1 * (-1) + 1

  for (let i = 0; i < routes.length; i += 1)
    if (routesHash[routes[i][index1]]) {
      routesHash[routes[i][index1]].push(routes[i][index2])
    } else {
      routesHash[routes[i][index1]] = [routes[i][index2]]
    }

  return routesHash
}

const addNoRoutesIncomingAirports = (airports, incomingRoutes, outgoingRoutes, startingAirport, addedRoutes) => {
  for (let i = 0; i < airports.length; i += 1)
    if (!incomingRoutes[airports[i]]) {
      if (outgoingRoutes[startingAirport]) {
        outgoingRoutes[startingAirport].push(airports[i])
      } else {
        outgoingRoutes[startingAirport] = [airports[i]]
      }

      addedRoutes.push([startingAirport, airports[i]])
    }
}

const checkAvailableAirports = (airports, outgoingRoutes, currentAirport, visitedAirports) => {
  if (visitedAirports[currentAirport])
    return
  
  if (airports.indexOf(currentAirport) > -1)
    airports.splice(airports.indexOf(currentAirport), 1)

  if (outgoingRoutes[currentAirport])
    for (let i = 0; i < outgoingRoutes[currentAirport].length; i += 1)
      checkAvailableAirports(airports, outgoingRoutes, outgoingRoutes[currentAirport][i], {...visitedAirports, [currentAirport]: true})
}

const resolveMissingAirports = (airports, outgoingRoutes, startingAirport, addedRoutes) => {
  let busiestTransitAirport

  while (airports.length) {
    busiestTransitAirport = [undefined, 0]

    for (let i = 0; i < airports.length; i += 1)
      if (outgoingRoutes[airports[i]].length > busiestTransitAirport[1]) {
        busiestTransitAirport[0] = airports[i]
        busiestTransitAirport[1] = outgoingRoutes[airports[i]].length
        
        if (outgoingRoutes[startingAirport]) {
          outgoingRoutes[startingAirport].push(airports[i])
        } else {
          outgoingRoutes[startingAirport] = [airports[i]]
        }
      }
    
    addedRoutes.push([startingAirport, busiestTransitAirport[0]])
    checkAvailableAirports(airports, outgoingRoutes, busiestTransitAirport[0], {[startingAirport]: true})
  }
}

const airportConnections = (airports, routes, startingAirport) => {
  const outgoingRoutes = createRoutesHash(routes, 'outgoing')
  const incomingRoutes = createRoutesHash(routes, 'incoming')
  const addedRoutes = []

  airports.splice(airports.indexOf(startingAirport), 1)

  addNoRoutesIncomingAirports(airports, incomingRoutes, outgoingRoutes, startingAirport, addedRoutes)
  checkAvailableAirports(airports, outgoingRoutes, startingAirport, {})
  resolveMissingAirports(airports, outgoingRoutes, startingAirport, addedRoutes)
  
  return addedRoutes.length
}
`

const functionNames = ['createRoutesHash', 'addNoRoutesIncomingAirports', 'checkAvailableAirports', 'resolveMissingAirports', 'airportConnections', 'push', 'indexOf', 'splice', '']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'switch', 'case', 'for', 'return']

const AirportConnections = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [inputArray, setInputArray] = useState('')
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const closeInputForm = () => {
    setInputArray('')
    setOutput('')
    setError('')
    setFormOpen(false)
  }

  const createRoutesHash = (routes, direction) => {
    const routesHash = {}
    const index1 = (direction === 'incoming') * 1
    const index2 = index1 * (-1) + 1

    for (let i = 0; i < routes.length; i += 1)
      if (routesHash[routes[i][index1]]) {
        routesHash[routes[i][index1]].push(routes[i][index2])
      } else {
        routesHash[routes[i][index1]] = [routes[i][index2]]
      }

    return routesHash
  }

  const addNoRoutesIncomingAirports = (airports, incomingRoutes, outgoingRoutes, startingAirport, addedRoutes) => {
    for (let i = 0; i < airports.length; i += 1)
      if (!incomingRoutes[airports[i]]) {
        if (outgoingRoutes[startingAirport]) {
          outgoingRoutes[startingAirport].push(airports[i])
        } else {
          outgoingRoutes[startingAirport] = [airports[i]]
        }

        addedRoutes.push([startingAirport, airports[i]])
      }
  }

  const checkAvailableAirports = (airports, outgoingRoutes, currentAirport, visitedAirports) => {
    if (visitedAirports[currentAirport])
      return
    
    if (airports.indexOf(currentAirport) > -1)
      airports.splice(airports.indexOf(currentAirport), 1)

    if (outgoingRoutes[currentAirport])
      for (let i = 0; i < outgoingRoutes[currentAirport].length; i += 1)
        checkAvailableAirports(airports, outgoingRoutes, outgoingRoutes[currentAirport][i], {...visitedAirports, [currentAirport]: true})
  }

  const resolveMissingAirports = (airports, outgoingRoutes, startingAirport, addedRoutes) => {
    let busiestTransitAirport

    while (airports.length) {
      busiestTransitAirport = [undefined, 0]

      for (let i = 0; i < airports.length; i += 1)
        if (outgoingRoutes[airports[i]].length > busiestTransitAirport[1]) {
          busiestTransitAirport[0] = airports[i]
          busiestTransitAirport[1] = outgoingRoutes[airports[i]].length
          
          if (outgoingRoutes[startingAirport]) {
            outgoingRoutes[startingAirport].push(airports[i])
          } else {
            outgoingRoutes[startingAirport] = [airports[i]]
          }
        }
      
      addedRoutes.push([startingAirport, busiestTransitAirport[0]])
      checkAvailableAirports(airports, outgoingRoutes, busiestTransitAirport[0], {[startingAirport]: true})
    }
  }
 
  const airportConnections = (airports, routes, startingAirport) => {
    const outgoingRoutes = createRoutesHash(routes, 'outgoing')
    const incomingRoutes = createRoutesHash(routes, 'incoming')
    const addedRoutes = []

    airports.splice(airports.indexOf(startingAirport), 1)

    addNoRoutesIncomingAirports(airports, incomingRoutes, outgoingRoutes, startingAirport, addedRoutes)
    checkAvailableAirports(airports, outgoingRoutes, startingAirport, {})
    resolveMissingAirports(airports, outgoingRoutes, startingAirport, addedRoutes)
    
    return addedRoutes.length
  }

  const handleSubmit = event => {
    event.preventDefault()
    let integerArray = inputArray.split(/[, ]/g).filter(element => element.length > 0)

    if (integerArray.length === 0) {
      setError('Input array is flawed!')
      return
    }

    for (let i = 0; i < integerArray.length; i += 1) {
      const element = parseInt(integerArray[i], 10)

      if (Number.isNaN(element)) {
        setError('Input array is flawed!')
        return
      }

      integerArray[i] = element
    }
    
    setError('')
    setOutput(airportConnections(integerArray))
  }

  return (
    <Fragment>
      <div className="code-block" dangerouslySetInnerHTML={{ __html: codeStringToHTML(codeString, functionNames, variableNames, blockNames) }} />
      <button className="open-button" onClick={() => setFormOpen(true)}>Input Form</button>
      {/* { formOpen && <div className="form-wrapper">
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <form onSubmit={handleSubmit} className="input-form">
          <div onClick={closeInputForm} className="close-button"><span></span><span></span></div>

          <div className="error">{error}</div>

          <label htmlFor="array">Insert a matrix (NxN) like: [[0, 0], [0, 0]]</label>
          <input onChange={event => setInputArray(event.target.value)} value={inputArray} placeholder="Matrix" type="text" name="array"/>

          <div className="output">{output}</div>

          <input className="open-button submit-form" type="submit" value="Submit"/>
        </form>
      </div>} */}
    </Fragment>
  )
}

export default AirportConnections
