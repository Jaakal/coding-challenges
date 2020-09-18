import React, { Fragment, useState } from 'react'

import { createWhiteSpace } from '../utility/utility'
 
const codeString = `
<span class="variable">const</span> <span class="function">mergeSortRecursive</span> = (array, auxiliaryArray, startIndex, endIndex) => {
${createWhiteSpace(2)}<span class="block-name">if</span> (endIndex - startIndex === 0)
${createWhiteSpace(4)}<span class="block-name">return</span> [startIndex, endIndex]

${createWhiteSpace(2)}<span class="variable">const</span> cutPoint = startIndex + Math.<span class="function">floor</span>((endIndex - startIndex) / 2)
${createWhiteSpace(2)}<span class="variable">const</span> leftSide = <span class="function">mergeSortRecursive</span>(array, auxiliaryArray, startIndex, cutPoint)
${createWhiteSpace(2)}<span class="variable">const</span> rightSide = <span class="function">mergeSortRecursive</span>(array, auxiliaryArray, cutPoint + 1, endIndex)

${createWhiteSpace(2)}<span class="variable">let</span> leftPointer = leftSide[0]
${createWhiteSpace(2)}<span class="variable">let</span> rightPointer = rightSide[0]
${createWhiteSpace(2)}<span class="variable">let</span> wholePointer = leftSide[0]

${createWhiteSpace(2)}<span class="block-name">while</span> (wholePointer <= rightSide[1]) {
${createWhiteSpace(4)}<span class="block-name">if</span> (rightPointer === undefined || leftPointer !== undefined
${createWhiteSpace(6)}&& auxiliaryArray[leftPointer] < auxiliaryArray[rightPointer]) {
${createWhiteSpace(6)}array[wholePointer] = auxiliaryArray[leftPointer]
${createWhiteSpace(6)}leftPointer += 1

${createWhiteSpace(6)}<span class="block-name">if</span> (leftPointer > leftSide[1])
${createWhiteSpace(8)}leftPointer = undefined
${createWhiteSpace(4)}} <span class="block-name">else</span> {
${createWhiteSpace(6)}array[wholePointer] = auxiliaryArray[rightPointer]
${createWhiteSpace(6)}rightPointer += 1

${createWhiteSpace(6)}<span class="block-name">if</span> (rightPointer > rightSide[1])
${createWhiteSpace(8)}rightPointer = undefined
${createWhiteSpace(4)}}

${createWhiteSpace(4)}wholePointer += 1
${createWhiteSpace(2)}}

${createWhiteSpace(2)}<span class="block-name">for</span> (let i = leftSide[0]; i <= rightSide[1]; i += 1)
${createWhiteSpace(4)}auxiliaryArray[i] = array[i]

${createWhiteSpace(2)}<span class="block-name">return</span> [leftSide[0], rightSide[1]]
}

<span class="variable">const</span> <span class="function">mergeSort</span> = array => {
${createWhiteSpace(2)}<span class="function">mergeSortRecursive</span>(array, [...array], 0, array.length - 1)
${createWhiteSpace(2)}<span class="block-name">return</span> array
}`

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
  
  const stringifyArray = array => {
    let returnString = `[${array[0]}`
  
    for (let i = 1; i < array.length; i += 1)
      returnString += `, ${array[i]}`
    returnString += ']'

    return returnString
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

    console.log(integerArray)
  }
  
  const closeInputForm = () => {
    setInputArray('')
    setOutput('')
    setError('')
    setFormOpen(false)
  }

  return (
    <Fragment>
      <div className="code-block" dangerouslySetInnerHTML={{ __html: codeString }} />
      <button onClick={() => setFormOpen(true)}>Input Form</button>
      { formOpen && <form onSubmit={handleSubmit} className="input-form">
        <div onClick={closeInputForm} className="close-button"><span></span><span></span></div>

        <div className="error">{error}</div>

        <label htmlFor="array">Insert an array: 2, 43, -1...</label>
        <input onChange={event => setInputArray(event.target.value)} value={inputArray} type="text" name="array"/>

        <div className="output">{output}</div>

        <input type="submit" value="Submit"/>
      </form>}
    </Fragment>
  )
}

export default AdvancedMergeSort
