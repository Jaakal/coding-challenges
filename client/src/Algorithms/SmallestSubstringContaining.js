import React, { Fragment, useState } from 'react'

import { createWhiteSpace } from '../utility/utility';

const codeString = `<div class="code-line"><span class="variable">const</span> <span class="function">createCharacterHash</span> = string => {</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> characterHash = { uniqueCharacterCount: 0 }</div><br/><div class="code-line">${createWhiteSpace(2)}<span class="block-name">for</span> (let i = 0; i < string.length; i += 1) {</div><div class="code-line">${createWhiteSpace(4)}<span class="block-name">if</span> (characterHash[string[i]]) {</div><div class="code-line">${createWhiteSpace(6)}characterHash[string[i]] += 1</div><div class="code-line">${createWhiteSpace(4)}} <span class="block-name">else</span> {</div><div class="code-line">${createWhiteSpace(6)}characterHash[string[i]] = 1</div><div class="code-line">${createWhiteSpace(6)}characterHash.uniqueCharacterCount += 1</div><div class="code-line">${createWhiteSpace(4)}}</div><div class="code-line">${createWhiteSpace(2)}}</div><br/><div class="code-line">${createWhiteSpace(2)}<span class="block-name">return</span> characterHash</div><div class="code-line">}</div><br/><div class="code-line"><span class="variable">const</span> <span class="function">smallestSubstringContaining</span> = (bigString, smallString) => {</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> smallStringHash = <span class="function">createCharacterHash</span>(smallString)</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> bigStringHash = { uniqueCharacterCount: 0 }</div><div class="code-line">${createWhiteSpace(2)}<span class="variable">const</span> smallestSubstring = [-Infinity, Infinity]</div><br/><div class="code-line">${createWhiteSpace(2)}<span class="variable">let</span> pointer1 = 0,</div><div class="code-line">${createWhiteSpace(6)}pointer2 = 0</div><br/><div class="code-line">${createWhiteSpace(2)}<span class="block-name">while</span> (pointer2 !== bigString.length) {</div><div class="code-line">${createWhiteSpace(4)}<span class="block-name">if</span> (smallStringHash[bigString[pointer2]]) {</div><div class="code-line">${createWhiteSpace(6)}<span class="block-name">if</span> (bigStringHash[bigString[pointer2]]) {</div><div class="code-line">${createWhiteSpace(8)}bigStringHash[bigString[pointer2]] += 1</div><div class="code-line">${createWhiteSpace(6)}} <span class="block-name">else</span> {</div><div class="code-line">${createWhiteSpace(8)}bigStringHash[bigString[pointer2]] = 1</div><div class="code-line">${createWhiteSpace(6)}}</div><br/><div class="code-line">${createWhiteSpace(6)}<span class="block-name">if</span> (bigStringHash[bigString[pointer2]] === smallStringHash[bigString[pointer2]]) {</div><div class="code-line">${createWhiteSpace(8)}bigStringHash.uniqueCharacterCount += 1</div><br/><div class="code-line">${createWhiteSpace(8)}<span class="block-name">if</span> (bigStringHash.uniqueCharacterCount === smallStringHash.uniqueCharacterCount) {</div><div class="code-line">${createWhiteSpace(10)}<span class="block-name">while</span> (true) {</div><div class="code-line">${createWhiteSpace(12)}<span class="block-name">if</span> (bigStringHash[bigString[pointer1]]) {</div><div class="code-line">${createWhiteSpace(14)}bigStringHash[bigString[pointer1]] -= 1</div><br/><div class="code-line">${createWhiteSpace(14)}<span class="block-name">if</span> (bigStringHash[bigString[pointer1]] < smallStringHash[bigString[pointer1]]) {</div><div class="code-line">${createWhiteSpace(16)}<span class="block-name">if</span> (smallestSubstring[1] - smallestSubstring[0] > pointer2 - pointer1 + 1) {</div><div class="code-line">${createWhiteSpace(18)}smallestSubstring[0] = pointer1</div><div class="code-line">${createWhiteSpace(18)}smallestSubstring[1] = pointer2</div><div class="code-line">${createWhiteSpace(16)}}</div><br/><div class="code-line">${createWhiteSpace(16)}bigStringHash.uniqueCharacterCount -= 1</div><div class="code-line">${createWhiteSpace(16)}pointer1 += 1</div><div class="code-line">${createWhiteSpace(16)}break</div><div class="code-line">${createWhiteSpace(14)}}</div><div class="code-line">${createWhiteSpace(12)}}</div><br/><div class="code-line">${createWhiteSpace(14)}pointer1 += 1</div><div class="code-line">${createWhiteSpace(12)}}</div><div class="code-line">${createWhiteSpace(10)}}</div><div class="code-line">${createWhiteSpace(8)}}</div><div class="code-line">${createWhiteSpace(6)}}</div><br/><div class="code-line">${createWhiteSpace(4)}pointer2 += 1</div><div class="code-line">${createWhiteSpace(2)}}</div><br/><div class="code-line">${createWhiteSpace(2)}<span class="block-name">return</span> smallestSubstring[0] === -Infinity ? '' : bigString.substring(smallestSubstring[0], smallestSubstring[1])</div><div class="code-line">}</div>`

const SmallestSubstringContaining = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [bigString, setBigString] = useState('');
  const [smallString, setSmallString] = useState('');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const createCharacterHash = string => {
    const characterHash = { uniqueCharacterCount: 0 }

    for (let i = 0; i < string.length; i += 1) {
      if (characterHash[string[i]]) {
        characterHash[string[i]] += 1
      } else {
        characterHash[string[i]] = 1
        characterHash.uniqueCharacterCount += 1
      }
    }

    return characterHash
  }

  const smallestSubstringContaining = (bigString, smallString) => {
    const smallStringHash = createCharacterHash(smallString)
    const bigStringHash = { uniqueCharacterCount: 0 }
    const smallestSubstring = [-Infinity, Infinity]

    let pointer1 = 0,
        pointer2 = 0
    
    while (pointer2 !== bigString.length) {
      if (smallStringHash[bigString[pointer2]]) {
        if (bigStringHash[bigString[pointer2]]) {
          bigStringHash[bigString[pointer2]] += 1
        } else {
          bigStringHash[bigString[pointer2]] = 1
        }

        if (bigStringHash[bigString[pointer2]] === smallStringHash[bigString[pointer2]]) {
          bigStringHash.uniqueCharacterCount += 1
          
          if (bigStringHash.uniqueCharacterCount === smallStringHash.uniqueCharacterCount) {
            while (true) {
              if (bigStringHash[bigString[pointer1]]) {
                bigStringHash[bigString[pointer1]] -= 1

                if (bigStringHash[bigString[pointer1]] < smallStringHash[bigString[pointer1]]) {
                  if (smallestSubstring[1] - smallestSubstring[0] > pointer2 - pointer1 + 1) {
                    smallestSubstring[0] = pointer1
                    smallestSubstring[1] = pointer2 + 1
                  }

                  bigStringHash.uniqueCharacterCount -= 1
                  pointer1 += 1
                  break
                }
              }

              pointer1 += 1
            }
          }
        }
      }

      pointer2 += 1
    }

    return smallestSubstring[0] === -Infinity ? '' : bigString.substring(smallestSubstring[0], smallestSubstring[1])
  };

  const closeInputForm = () => {
    setBigString('');
    setSmallString('');
    setOutput('');
    setError('');
    setFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bigString.length === 0 || smallString.length === 0) {
      setError(`Strings can't be length of zero!`);
      return;
    } else if (bigString.length < smallString.length) {
      setError('Small string has to be smaller than the bigger string!')
      return
    }

    setError('');
    setOutput(smallestSubstringContaining(bigString, smallString));
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

            <label htmlFor='nodes'>Big String:</label>
            <input
              onChange={(event) => setBigString(event.target.value)}
              value={bigString}
              placeholder='Enter String'
              type='text'
              name='bigString'
            />
            
            <label htmlFor='nodes'>Small String:</label>
            <input
              onChange={(event) => setSmallString(event.target.value)}
              value={smallString}
              placeholder='Enter String'
              type='text'
              name='smallString'
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
}


export default SmallestSubstringContaining
