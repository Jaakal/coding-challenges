import React, { Fragment, useState } from 'react';

import { createWhiteSpace } from '../utility/utility';

const codeString = `<div class="code-line"><span class="variable">const</span> <span class="function">numberOfBinaryTreeTopologiesRecursive</span> = (nodeCount, cache) => {</div><div class="code-line">${createWhiteSpace(
  2
)}<span class="block-name">if</span> (cache[nodeCount])</div><div class="code-line">${createWhiteSpace(
  4
)}<span class="block-name">return</span> cache[nodeCount]</div></br><div class="code-line">${createWhiteSpace(
  2
)}<span class="variable">let</span> sum = 0</div></br><div class="code-line">${createWhiteSpace(
  2
)}<span class="block-name">for</span> (let i = 0; i <dd nodeCount; i += 1) {</div><div class="code-line">${createWhiteSpace(
  4
)}<span class="variable">const</span> left = <span class="function">numberOfBinaryTreeTopologiesRecursive</span>(i, cache)</div><div class="code-line">${createWhiteSpace(
  4
)}<span class="variable">const</span> right = <span class="function">numberOfBinaryTreeTopologiesRecursive</span>(nodeCount - i - 1, cache)</div></br><div class="code-line">${createWhiteSpace(
  4
)}sum += left * right</div><div class="code-line">${createWhiteSpace(
  2
)}}</div></br><div class="code-line">${createWhiteSpace(
  2
)}cache[nodeCount] = sum</div></br><div class="code-line">${createWhiteSpace(
  2
)}<span class="block-name">return</span> cache[nodeCount]</div><div class="code-line">}</div></br><div class="code-line"><span class="variable">const</span> <span class="function">numberOfBinaryTreeTopologies</span> = n => {</div><div class="code-line">${createWhiteSpace(
  2
)}<span class="variable">const</span> cache = { 0: 1 }</div></br><div class="code-line">${createWhiteSpace(
  2
)}<span class="block-name">return</span> numberOfBinaryTreeTopologiesRecursive(n, cache)</div><div class="code-line">}</div>`;

const NumberOfBinaryTreeTopologies = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [nodes, setNodes] = useState('');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const numberOfBinaryTreeTopologiesRecursive = (nodeCount, cache) => {
    if (cache[nodeCount]) return cache[nodeCount];

    let sum = 0;

    for (let i = 0; i < nodeCount; i += 1) {
      const left = numberOfBinaryTreeTopologiesRecursive(i, cache);
      const right = numberOfBinaryTreeTopologiesRecursive(
        nodeCount - i - 1,
        cache
      );

      sum += left * right;
    }

    cache[nodeCount] = sum;

    return cache[nodeCount];
  };

  const numberOfBinaryTreeTopologies = (n) => {
    const cache = { 0: 1 };

    return numberOfBinaryTreeTopologiesRecursive(n, cache);
  };

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
        dangerouslySetInnerHTML={{ __html: codeString }}
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
