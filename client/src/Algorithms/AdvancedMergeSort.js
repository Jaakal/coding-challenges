import React, { Fragment, useState } from 'react'

import { codeStringToHTML, stringifyArray } from '../utility/utility'
 
const codeString = `
const mergeSortRecursive = (array, auxiliaryArray, startIndex, endIndex) => {
  if (endIndex - startIndex === 0)
    return [startIndex, endIndex]
  
  const cutPoint = startIndex + Math.floor((endIndex - startIndex) / 2)
  
  const leftSide = mergeSortRecursive(array, auxiliaryArray, startIndex, cutPoint)
  const rightSide = mergeSortRecursive(array, auxiliaryArray, cutPoint + 1, endIndex)
  
  let leftPointer = leftSide[0]
  let rightPointer = rightSide[0]
  let wholePointer = leftSide[0]
  
  while (wholePointer <= rightSide[1]) {
    if (rightPointer === undefined || leftPointer !== undefined 
      && auxiliaryArray[leftPointer] < auxiliaryArray[rightPointer]) {
      array[wholePointer] = auxiliaryArray[leftPointer]
      leftPointer += 1
      
      if (leftPointer > leftSide[1])
        leftPointer = undefined
    } else {
      array[wholePointer] = auxiliaryArray[rightPointer]
      rightPointer += 1

      if (rightPointer > rightSide[1])
        rightPointer = undefined
    }

    wholePointer += 1
  }

  for (let i = leftSide[0]; i <= rightSide[1]; i += 1)
    auxiliaryArray[i] = array[i]

  return [leftSide[0], rightSide[1]]
}

const mergeSort = array => {
  mergeSortRecursive(array, [...array], 0, array.length - 1)
  return array
}
`

const functionNames = ['mergeSortRecursive', 'floor', 'mergeSort']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'while', 'for', 'return']

const AdvancedMergeSort = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [inputArray, setInputArray] = useState('')
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const mergeSortRecursive = (array, auxiliaryArray, startIndex, endIndex) => {
    if (endIndex - startIndex === 0)
      return [startIndex, endIndex]
    
    const cutPoint = startIndex + Math.floor((endIndex - startIndex) / 2)
    
    const leftSide = mergeSortRecursive(array, auxiliaryArray, startIndex, cutPoint)
    const rightSide = mergeSortRecursive(array, auxiliaryArray, cutPoint + 1, endIndex)
    
    let leftPointer = leftSide[0]
    let rightPointer = rightSide[0]
    let wholePointer = leftSide[0]
    
    while (wholePointer <= rightSide[1]) {
      if (rightPointer === undefined || leftPointer !== undefined 
        && auxiliaryArray[leftPointer] < auxiliaryArray[rightPointer]) {
        array[wholePointer] = auxiliaryArray[leftPointer]
        leftPointer += 1
        
        if (leftPointer > leftSide[1])
          leftPointer = undefined
      } else {
        array[wholePointer] = auxiliaryArray[rightPointer]
        rightPointer += 1

        if (rightPointer > rightSide[1])
          rightPointer = undefined
      }

      wholePointer += 1
    }

    for (let i = leftSide[0]; i <= rightSide[1]; i += 1)
      auxiliaryArray[i] = array[i]

    return [leftSide[0], rightSide[1]]
  }

  const mergeSort = array => {
    mergeSortRecursive(array, [...array], 0, array.length - 1)
    return stringifyArray(array)
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
    setOutput(mergeSort(integerArray))
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

export default AdvancedMergeSort
