
const connection = require("../../database/connection");
const { parseContentToSQL } = require("./fieldsExtractor");

const create = async (tablename, content) => {
  const parsedContent = parseContentToSQL(content);
  const [result] = await connection.execute(
    `INSERT INTO ${tablename} (${parsedContent.fields})
        VALUES (${parsedContent.placeholders})`,
    [...parsedContent.values]
  );
  return result;
};




const find = async (tablename, content, fields = null) => {
  const columns = fields ? fields.join(', ') : fields
  try {
    const result = await connection.execute(
      `SELECT ${columns || '*'} FROM ${tablename}
      WHERE ${content.field} = ?`, [content.value]
    )
    
    const [data] = result
    return data
  }
  catch(err) {
    console.error(err.message)
  }
}

module.exports = {
    create,
    find
}
