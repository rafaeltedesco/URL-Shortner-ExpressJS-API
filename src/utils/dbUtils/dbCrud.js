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

module.exports = {
    create
}
