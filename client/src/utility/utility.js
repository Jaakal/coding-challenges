export const createWhiteSpace = count => {
  let whiteSpaceString = ''

  for (let i = 0; i < count * 2; i += 1)
    whiteSpaceString += ' '
  
  return whiteSpaceString
}