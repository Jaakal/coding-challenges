import React, { Fragment, useState } from 'react'

import { codeStringToHTML } from '../utility/utility';

const codeString = `
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
}
`

const functionNames = ['createCharacterHash', 'smallestSubstringContaining']
const variableNames = ['const', 'let']
const blockNames = ['if', 'else', 'while', 'for', 'break', 'return']

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
        dangerouslySetInnerHTML={{ __html: codeStringToHTML(codeString, functionNames, variableNames, blockNames) }}
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
