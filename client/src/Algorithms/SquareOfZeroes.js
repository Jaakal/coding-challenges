import React, { Fragment, useState } from 'react'

import { codeStringToHTML, stringifyBoolean } from '../utility/utility';

const codeString = `
const checkIfSquare = (matrix, index1, index2, direction, stepCount, maxSteps) => {
  switch (direction) {
    case 'up':
      for (let i = index1; i >= 0; i -= 1) {
        if (matrix[i][index2] !== 0)
          return false

        if (matrix[i][index2 + 1] === 0)
          if (checkIfSquare(matrix, i, index2 + 1, 'right', 1, stepCount))
            return true

        stepCount += 1
      }

      return false
    case 'right':
      if (matrix[index1].length - index2 <= maxSteps - 1)
        return false

      for (let j = index2; j < index2 + maxSteps; j += 1)
        if (matrix[index1][j] !== 0)
          return false

      if (matrix[index1 + 1][index2 + maxSteps - 1] === 0) 
        return checkIfSquare(matrix, index1 + 1, index2 + maxSteps - 1, 'down', 1, maxSteps)

      return false
    case 'down':
      for (let i = index1; i < index1 + maxSteps; i += 1)
        if (matrix[i][index2] !== 0)
          return false

      if (matrix[index1 + maxSteps - 1][index2 - 1] === 0)
        return checkIfSquare(matrix, index1 + maxSteps - 1, index2 - 1, 'left', 1, maxSteps)

      return false
    case 'left':
      for (let j = index2; j >= index2 - maxSteps + 1; j -= 1)
        if (matrix[index1][j] !== 0)
          return false

      return true
  }
}

const squareOfZeroes = matrix => {
  for (let i = matrix.length - 1; i > 0; i -= 1)
    for (let j = 0; j < matrix[i].length - 1; j += 1)
      if (matrix[i][j] === 0 && matrix[i - 1][j] === 0 && matrix[i][j + 1] === 0)
        if (checkIfSquare(matrix, i - 1, j, 'up', 1, 0))
          return true

  return false
}
`

const functionNames = ['checkIfSquare', 'squareOfZeroes']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'switch', 'case', 'for', 'return']

const SquareOfZeroes = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [inputArray, setInputArray] = useState('')
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const checkIfSquare = (matrix, index1, index2, direction, stepCount, maxSteps) => {
    switch (direction) {
      case 'up':
        for (let i = index1; i >= 0; i -= 1) {
          if (matrix[i][index2] !== 0)
            return false

          if (matrix[i][index2 + 1] === 0)
            if (checkIfSquare(matrix, i, index2 + 1, 'right', 1, stepCount))
              return true

          stepCount += 1
        }

        return false
      case 'right':
        if (matrix[index1].length - index2 <= maxSteps - 1)
          return false

        for (let j = index2; j < index2 + maxSteps; j += 1)
          if (matrix[index1][j] !== 0)
            return false

        if (matrix[index1 + 1][index2 + maxSteps - 1] === 0) 
          return checkIfSquare(matrix, index1 + 1, index2 + maxSteps - 1, 'down', 1, maxSteps)

        return false
      case 'down':
        for (let i = index1; i < index1 + maxSteps; i += 1)
          if (matrix[i][index2] !== 0)
            return false

        if (matrix[index1 + maxSteps - 1][index2 - 1] === 0)
          return checkIfSquare(matrix, index1 + maxSteps - 1, index2 - 1, 'left', 1, maxSteps)

        return false
      case 'left':
        for (let j = index2; j >= index2 - maxSteps + 1; j -= 1)
          if (matrix[index1][j] !== 0)
            return false

        return true
    }
  }
  
  const squareOfZeroes = matrix => {
    for (let i = matrix.length - 1; i > 0; i -= 1)
      for (let j = 0; j < matrix[i].length - 1; j += 1)
        if (matrix[i][j] === 0 && matrix[i - 1][j] === 0 && matrix[i][j + 1] === 0)
          if (checkIfSquare(matrix, i - 1, j, 'up', 1, 0))
            return true

    return false
  }

  const handleSubmit = event => {
    event.preventDefault()

    const matrix = inputArray.replace(/ /g, '').split('],').map(line => line.replace(/[\[\]]/g, ''))

    matrix.map((line, index) => {
      matrix[index] = line.split(',').map(element => parseInt(element, 10))
    })


    if (matrix.length === 0 || matrix.length !== matrix[0].length) {
      setError('Input array is flawed!')
      return
    }

    for (let i = 0; i < matrix.length; i += 1)
      for (let j = 0; j < matrix[i].length; j += 1)
        if (matrix[i][j] !== 0 && matrix[i][j] !== 1) {
          setError('Input array is flawed!')
          return
        }

    setError('')
    setOutput(stringifyBoolean(squareOfZeroes(matrix)))
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

          <label htmlFor="array">Insert a matrix (NxN) like: [[0, 0], [0, 0]]</label>
          <input onChange={event => setInputArray(event.target.value)} value={inputArray} placeholder="Array" type="text" name="array"/>

          <div className="output">{output}</div>

          <input className="open-button submit-form" type="submit" value="Submit"/>
        </form>
      </div>}
    </Fragment>
  )
}

export default SquareOfZeroes
