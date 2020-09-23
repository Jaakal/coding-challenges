import React, { Fragment, useState } from 'react';

import { codeStringToHTML } from '../utility/utility';

const codeString = `
const numberOfBinaryTreeTopologiesRecursive = (nodeCount, cache) => {
  if (cache[nodeCount]) return cache[nodeCount]

  let sum = 0

  for (let i = 0; i < nodeCount; i += 1) {
    const left = numberOfBinaryTreeTopologiesRecursive(i, cache)
    const right = numberOfBinaryTreeTopologiesRecursive(
      nodeCount - i - 1,
      cache
    );

    sum += left * right
  }

  cache[nodeCount] = sum

  return cache[nodeCount]
}

const numberOfBinaryTreeTopologies = (n) => {
  const cache = { 0: 1 }

  return numberOfBinaryTreeTopologiesRecursive(n, cache)
}
`

const functionNames = ['numberOfBinaryTreeTopologiesRecursive', 'numberOfBinaryTreeTopologies']
const variableNames = ['const', 'let']
const blockNames = ['if', 'for', 'return']

const NumberOfBinaryTreeTopologies = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [nodes, setNodes] = useState('');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const numberOfBinaryTreeTopologiesRecursive = (nodeCount, cache) => {
    if (cache[nodeCount]) return cache[nodeCount]

    let sum = 0

    for (let i = 0; i < nodeCount; i += 1) {
      const left = numberOfBinaryTreeTopologiesRecursive(i, cache)
      const right = numberOfBinaryTreeTopologiesRecursive(
        nodeCount - i - 1,
        cache
      );

      sum += left * right
    }

    cache[nodeCount] = sum

    return cache[nodeCount]
  }

  const numberOfBinaryTreeTopologies = (n) => {
    const cache = { 0: 1 }

    return numberOfBinaryTreeTopologiesRecursive(n, cache)
  }

  const closeInputForm = () => {
    setNodes('');
    setOutput('');
    setError('');
    setFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nodeCount = parseInt(nodes, 10);

    if (Number.isNaN(nodeCount)) {
      setError('Input is flawed!');
      return;
    }

    setError('');
    setOutput(numberOfBinaryTreeTopologies(nodeCount));
  };

  return (
    <Fragment>
      <div
        className='code-block'
        dangerouslySetInnerHTML={{ __html: codeStringToHTML(codeString, functionNames, variableNames, blockNames)}}
      />
      <button className='open-button' onClick={() => setFormOpen(true)}>
        Input Form
      </button>
      {formOpen && (
        <div className='form-wrapper'>
          <span className='form-frame'></span>
          <span className='form-frame'></span>
          <span className='form-frame'></span>
          <span className='form-frame'></span>
          <form onSubmit={handleSubmit} className='input-form'>
            <div onClick={closeInputForm} className='close-button'>
              <span></span>
              <span></span>
            </div>

            <div className='error'>{error}</div>

            <label htmlFor='nodes'>How many nodes:</label>
            <input
              onChange={(event) => setNodes(event.target.value)}
              value={nodes}
              placeholder='Node Count'
              type='text'
              name='nodes'
            />

            <div className='output'>{output}</div>

            <input
              className='open-button submit-form'
              type='submit'
              value='Submit'
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default NumberOfBinaryTreeTopologies;
