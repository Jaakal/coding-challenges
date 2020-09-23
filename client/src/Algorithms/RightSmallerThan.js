import React, { Fragment, useEffect, useState } from 'react'

import { codeStringToHTML, stringifyArray } from '../utility/utility';

const codeString = `
const createNode = value => {
  return {
    value,
    nodeWeight: 1,
    smallerNodesCounter: 0,
    left: null,
    right: null
  }
}

const insertNodeAndFindStrictlySmallerElements = (rootNode, value) => {
  if (rootNode.value === null) {
    rootNode.value = value
    return 0
  } else {
    let nodeIterator = rootNode,
        smallerNodesCounter = 0

    while (true) {
      if (nodeIterator.value < value) {
        smallerNodesCounter += nodeIterator.smallerNodesCounter + nodeIterator.nodeWeight
        
        if (!nodeIterator.right) {
          nodeIterator.right = createNode(value)
          return smallerNodesCounter
        }

        nodeIterator = nodeIterator.right
      } else if (nodeIterator.value > value) {
        nodeIterator.smallerNodesCounter += 1

        if (!nodeIterator.left) {
          nodeIterator.left = createNode(value)
          return smallerNodesCounter
        }

        nodeIterator = nodeIterator.left
      } else {
        nodeIterator.nodeWeight += 1
        return smallerNodesCounter + nodeIterator.smallerNodesCounter
      }
    }
  }
}

const rightSmallerThan = array => {
  const outputArray = [],
        rootNode = {
          value: null,
          nodeWeight: 1,
          smallerNodesCounter: 0,
          left: null,
          right: null
        }

  for (let i = array.length - 1; i >= 0; i -= 1)
    outputArray.unshift(insertNodeAndFindStrictlySmallerElements(rootNode, array[i]))

  return outputArray
}
`

const functionNames = ['createNode', 'unshift', 'insertNodeAndFindStrictlySmallerElements']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'while', 'for', 'return']

const RightSmallerThan = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [inputArray, setInputArray] = useState('')
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const createNode = value => {
    return { value, nodeWeight: 1, smallerNodesCounter: 0, left: null, right: null }
  }

  const insertNodeAndFindStrictlySmallerElements = (rootNode, value) => {
    if (rootNode.value === null) {
      rootNode.value = value
      return 0
    } else {
      let nodeIterator = rootNode
      let smallerNodesCounter = 0

      while (true) {
        if (nodeIterator.value < value) {
          smallerNodesCounter += nodeIterator.smallerNodesCounter + nodeIterator.nodeWeight
          
          if (!nodeIterator.right) {
            nodeIterator.right = createNode(value)
            return smallerNodesCounter
          }

          nodeIterator = nodeIterator.right
        } else if (nodeIterator.value > value) {
          nodeIterator.smallerNodesCounter += 1

          if (!nodeIterator.left) {
            nodeIterator.left = createNode(value)
            return smallerNodesCounter
          }

          nodeIterator = nodeIterator.left
        } else {
          nodeIterator.nodeWeight += 1
          return smallerNodesCounter + nodeIterator.smallerNodesCounter
        }
      }
    }
  }

  const rightSmallerThan = array => {
    const outputArray = [],
          rootNode = { value: null, nodeWeight: 1, smallerNodesCounter: 0, left: null, right: null }

    for (let i = array.length - 1; i >= 0; i -= 1)
      outputArray.unshift(insertNodeAndFindStrictlySmallerElements(rootNode, array[i]))

    return outputArray
  }

  useEffect(() => {
    codeStringToHTML(codeString)
  }, [])

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
    setOutput(rightSmallerThan(integerArray))
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

export default RightSmallerThan

