import React, { Fragment, useEffect, useState } from 'react'

import { codeStringToHTML, stringifyArray } from '../utility/utility';

const codeString = `
EASIER SOLUTION (Time complexity O(N2)):

const findLongestLengthIndex = (array, lengths, sequences) => {
  let longestLengthIndex = 0

  for (let i = 1; i < array.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (array[j] < array[i] && lengths[j] + 1 > lengths[i]) {
        lengths[i] = lengths[j] + 1
        sequences[i] = j

        if (lengths[longestLengthIndex] < lengths[i])
          longestLengthIndex = i
      }
    }
  }

  return longestLengthIndex
}

const longestIncreasingSubsequence = array => {
  const lengths = [...Array(array.length)].map(element => 1)
  const sequences = [...Array(array.length)].map(element => null)
  const longestIncreasingSubsequenceArray = []

  let longestLengthIndex = findLongestLengthIndex(array, lengths, sequences)

  while (true) {
    longestIncreasingSubsequenceArray.unshift(array[longestLengthIndex])

    if (sequences[longestLengthIndex] === null) {
      return longestIncreasingSubsequenceArray
    } else {
      longestLengthIndex = sequences[longestLengthIndex]
    }
  }
}

HARDER SOLUTION (Time complexity O(NlogN) because of the binary search): 

const findIndicesIndex = (array, indices, startIndex, endIndex, i) => {
  if (endIndex < startIndex) {
    return endIndex + 1
  } else if (startIndex > endIndex) {
    return startIndex
  }

  const middleValue = Math.floor((startIndex + endIndex) / 2)

  if (array[indices[middleValue]] < array[i]) {
    return findIndicesIndex(array, indices, middleValue + 1, endIndex, i)
  } else if (array[indices[middleValue]] > array[i]) {
    return findIndicesIndex(array, indices, startIndex, middleValue - 1, i)
  }

  return middleValue
}

const findLongestLengthIndex = (array, indices, sequences) => {
  for (let i = 1; i < array.length; i += 1) {
    const indexToOverwrite = findIndicesIndex(array, indices, 0, indices.length - 1, i)

    if (indexToOverwrite === indices.length) {
      indices.push(i)
      sequences[i] = indices[indexToOverwrite - 1]
    } else {
      indices[indexToOverwrite] = i
      sequences[i] = indexToOverwrite === 0 ? null : indices[indexToOverwrite - 1]
    }
  }

  return indices[indices.length - 1]
}

const longestIncreasingSubsequence = array => {
  const indices = [0]
  const sequences = [...Array(array.length)].map(element => null)
  const longestIncreasingSubsequenceArray = []

  let longestLengthIndex = findLongestLengthIndex(array, indices, sequences)
  
  while (true) {
    longestIncreasingSubsequenceArray.unshift(array[longestLengthIndex])

    if (sequences[longestLengthIndex] === null) {
      return longestIncreasingSubsequenceArray
    } else {
      longestLengthIndex = sequences[longestLengthIndex]
    }
  }
}
`

const functionNames = ['findLongestLengthIndex', 'longestIncreasingSubsequence', 'map', 'floor', 'unshift', 'push', 'findIndicesIndex']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'while', 'for', 'return']

const LongestIncreasingSubsequence = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [inputArray, setInputArray] = useState('')
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const findIndicesIndex = (array, indices, startIndex, endIndex, i) => {
    if (endIndex < startIndex) {
      return endIndex + 1
    } else if (startIndex > endIndex) {
      return startIndex
    }

    const middleValue = Math.floor((startIndex + endIndex) / 2)

    if (array[indices[middleValue]] < array[i]) {
      return findIndicesIndex(array, indices, middleValue + 1, endIndex, i)
    } else if (array[indices[middleValue]] > array[i]) {
      return findIndicesIndex(array, indices, startIndex, middleValue - 1, i)
    }

    return middleValue
  }

  const findLongestLength = (array, indices, sequences) => {
    for (let i = 1; i < array.length; i += 1) {
      const indexToOverwrite = findIndicesIndex(array, indices, 0, indices.length - 1, i)

      if (indexToOverwrite === indices.length) {
        indices.push(i)
        sequences[i] = indices[indexToOverwrite - 1]
      } else {
        indices[indexToOverwrite] = i
        sequences[i] = indexToOverwrite === 0 ? null : indices[indexToOverwrite - 1]
      }
    }

    return indices[indices.length - 1]
  }
  
  const longestIncreasingSubsequence = array => {
    const indices = [0]
    const sequences = [...Array(array.length)].map(element => null)
    const longestIncreasingSubsequence = []

    let longestLengthIndex = findLongestLength(array, indices, sequences)
    
    while (true) {
      longestIncreasingSubsequence.unshift(array[longestLengthIndex])

      if (sequences[longestLengthIndex] === null) {
        return longestIncreasingSubsequence
      } else {
        longestLengthIndex = sequences[longestLengthIndex]
      }
    }
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
    setOutput(stringifyArray(longestIncreasingSubsequence(integerArray)))
  }
  
  const closeInputForm = () => {
    setInputArray('')
    setOutput('')
    setError('')
    setFormOpen(false)
  }

  return (
    <Fragment>
      <div className="code-block" dangerouslySetInnerHTML={{ __html: codeStringToHTML(codeString, functionNames, variableNames, blockNames) }} />
      <button className="open-button" onClick={() => setFormOpen(true)}>Input Form</button>
      { formOpen && <div className="form-wrapper">
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <span className="form-frame"></span>
        <form onSubmit={handleSubmit} className="input-form">
          <div onClick={closeInputForm} className="close-button"><span></span><span></span></div>

          <div className="error">{error}</div>

          <label htmlFor="array">Insert an array: 2, 43, -1...</label>
          <input onChange={event => setInputArray(event.target.value)} value={inputArray} placeholder="Array" type="text" name="array"/>

          <div className="output">{output}</div>

          <input className="open-button submit-form" type="submit" value="Submit"/>
        </form>
      </div>}
    </Fragment>
  )
}

export default LongestIncreasingSubsequence
