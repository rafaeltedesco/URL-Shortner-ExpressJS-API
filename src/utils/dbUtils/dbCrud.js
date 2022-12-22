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




const find = async (tablename, content) => {
  try {
    const result = await connection.execute(
      `SELECT * FROM ${tablename}
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
