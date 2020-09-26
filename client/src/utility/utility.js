if (!String.prototype.splice) {
  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

const addColorTags = (line, functionNames, variableNames, blockNames) => {
  let newLine = line
  
  if (functionNames)
    for (let i = 0; i < functionNames.length; i += 1) {
      let index = newLine.indexOf(functionNames[i])

      if (index > -1) {
        if (newLine[index + functionNames[i].length] === ' ' || newLine[index + functionNames[i].length] === '(') {
          newLine = newLine.splice(index, 0, '<span class="function">')
          index = newLine.indexOf(functionNames[i])
          newLine = newLine.splice(index + functionNames[i].length, 0, '</span>')
        }
      }
    }
  
  if (variableNames)
    for (let i = 0; i < variableNames.length; i += 1) {
      let index = newLine.indexOf(variableNames[i])

      if (index > -1) {
        newLine = newLine.splice(index, 0, '<span class="variable">')
        index = newLine.indexOf(variableNames[i])
        newLine = newLine.splice(index + variableNames[i].length, 0, '</span>')
      }
    }
  
  if (blockNames)
    for (let i = 0; i < blockNames.length; i += 1) {
      let index = newLine.indexOf(blockNames[i])

      if (index > -1 && newLine[index + blockNames[i].length] === ' ') {
        newLine = newLine.splice(index, 0, '<span class="block-name">')
        index = newLine.indexOf(blockNames[i])
        newLine = newLine.splice(index + blockNames[i].length, 0, '</span>')
      }
    }

  return newLine
}

const createWhiteSpace = count => {
  let whiteSpaceString = ''

  for (let i = 0; i < count * 2; i += 1)
    whiteSpaceString += '&nbsp;'

  return whiteSpaceString
}

export const codeStringToHTML = (codeString, functionNames, variableNames, blockNames) => {
  let HTMLString = '',
      lineStartIndex = 0

  if (codeString)
    for (let i = 0; i < codeString.length; i += 1) {
      if (codeString[i] === '\n') {
        let line = codeString.substring(lineStartIndex, i)

        if (i !== 0) {
          if (line.length !== 0) {
            let spaceCounter = 0

            while (line[spaceCounter] === ' ')
              spaceCounter += 1

            if (spaceCounter)
              line = line.substring(spaceCounter)
            
            line = addColorTags(line, functionNames, variableNames, blockNames)

            HTMLString += `<div class="code-line">${spaceCounter === 0 ? '' : createWhiteSpace(spaceCounter)}${line}</div>`
          } else {

            HTMLString += '<br/>'
          }
        }

        lineStartIndex = i + 1
      }
    }

  return HTMLString
}

export const stringifyArray = array => {
  let returnString = `[${array[0]}`

  for (let i = 1; i < array.length; i += 1)
    returnString += `, ${array[i]}`
  returnString += ']'

  return returnString
}

export const stringifyBoolean = boolean => {
  if (boolean)
    return 'true'
  
  return 'false'
}