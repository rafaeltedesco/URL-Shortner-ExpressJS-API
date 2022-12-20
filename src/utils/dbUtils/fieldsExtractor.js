
const joinFields = (content, separator=',') => content.join(`${separator} `)

const parseContentToSQL = (content) => {
    const fields = Object.keys(content)
    const values = Object.values(content)
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