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

const findOne = async (tablename, field) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM ${tablename}
    WHERE ${field.columnName} = ?`, [field.value]
  )
  return result
}

module.exports = {
    create,
    findOne
}
