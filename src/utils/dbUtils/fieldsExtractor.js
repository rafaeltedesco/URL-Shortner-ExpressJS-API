const snakeize = require('snakeize')

const joinFields = (content, separator=',') => content.join(`${separator} `)

const parseContentToSQL = (content) => {
    const snakeizedContent = snakeize(content)
    const fields = Object.keys(snakeizedContent)
    const values = Object.values(snakeizedContent)
    const placeholders = Array(fields.length).fill('?')
    return {
        fields: joinFields(fields),
        placeholders: joinFields(placeholders),
        values: values,
    }
}

module.exports = {
    parseContentToSQL
}