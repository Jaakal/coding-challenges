import React, { Fragment, useState } from 'react'

import { createWhiteSpace } from '../utility/utility'
 
const codeString = `<div class="code-line"><span class="variable">const</span> <span class="function">mergeSortRecursive</span> = (array, auxiliaryArray, startIndex, endIndex) => {</div><div class="code-line">${createWhiteSpace(2)}<span class="block-name">if</span> (endIndex - startIndex === 0)</div><div class="code-line">${createWhiteSpace(4)}<span class="block-name">return</span> [startIndex, endIndex]</div></br><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> cutPoint = startIndex + Math.<span class="function">floor</span>((endIndex - startIndex) / 2)</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> leftSide = <span class="function">mergeSortRecursive</span>(array, auxiliaryArray, startIndex, cutPoint)</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> rightSide = <span class="function">mergeSortRecursive</span>(array, auxiliaryArray, cutPoint + 1, endIndex)</div></br><div class="code-line">${createWhiteSpace(2)}<span class="variable">let</span> leftPointer = leftSide[0]</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">let</span> rightPointer = rightSide[0]</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">let</span> wholePointer = leftSide[0]</div></br><div class="code-line">${createWhiteSpace(2)}<span class="block-name">while</span> (wholePointer <= rightSide[1]) {</div><div class="code-line">${createWhiteSpace(4)}<span class="block-name">if</span> (rightPointer === undefined || leftPointer !== undefined</div><div class="code-line">${createWhiteSpace(6)}&& auxiliaryArray[leftPointer] < auxiliaryArray[rightPointer]) {</div><div class="code-line">${createWhiteSpace(6)}array[wholePointer] = auxiliaryArray[leftPointer]</div><div class="code-line">${createWhiteSpace(6)}leftPointer += 1</div></br><div class="code-line">${createWhiteSpace(6)}<span class="block-name">if</span> (leftPointer > leftSide[1])</div><div class="code-line">${createWhiteSpace(8)}leftPointer = undefined</div><div class="code-line">${createWhiteSpace(4)}} <span class="block-name">else</span> {</div><div class="code-line">${createWhiteSpace(6)}array[wholePointer] = auxiliaryArray[rightPointer]</div><div class="code-line">${createWhiteSpace(6)}rightPointer += 1</div></br><div class="code-line">${createWhiteSpace(6)}<span class="block-name">if</span> (rightPointer > rightSide[1])</div><div class="code-line">${createWhiteSpace(8)}rightPointer = undefined</div><div class="code-line">${createWhiteSpace(4)}}</div></br><div class="code-line">${createWhiteSpace(4)}wholePointer += 1</div><div class="code-line">${createWhiteSpace(2)}}</div></br><div class="code-line">${createWhiteSpace(2)}<span class="block-name">for</span> (let i = leftSide[0]; i <= rightSide[1]; i += 1)</div><div class="code-line">${createWhiteSpace(4)}auxiliaryArray[i] = array[i]</div></br><div class="code-line">${createWhiteSpace(2)}<span class="block-name">return</span> [leftSide[0], rightSide[1]]</div><div class="code-line">}</div></br><div class="code-line"><span class="variable">const</span> <span class="function">mergeSort</span> = array => {</div><div class="code-line">${createWhiteSpace(2)}<span class="function">mergeSortRecursive</span>(array, [...array], 0, array.length - 1)</div><div class="code-line">${createWhiteSpace(2)}<span class="block-name">return</span> array</div><div class="code-line">}</div>`

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
