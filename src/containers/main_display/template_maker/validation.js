export default function (nameString, thingToName = 'API') {
    let nameErrors = {
        noName: `Please enter a name for your ${thingToName}.`,
        invalidCharacters: 'Names may only contain alphanumeric characters, underscores, dashes, and periods.'
    }
    let invalidChars = /[^A-z._-]/
    if (!nameString) return nameErrors.noName
    if (invalidChars.test(nameString)) return nameErrors.invalidCharacters
    return ''
}