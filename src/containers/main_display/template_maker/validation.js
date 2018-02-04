export default function (nameString, thingToName = 'API') {
    let nameErrors = {
        noName: `Please enter a name for your ${thingToName}.`,
        invalidCharacters: 'Names may only contain alphanumeric characters, dashes, and underscores.'
    }
    let invalidChars = /[^A-z0-9_-]/
    if (!nameString) return nameErrors.noName
    if (invalidChars.test(nameString)) return nameErrors.invalidCharacters
    return ''
}