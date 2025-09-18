const productSchema = require('./productValidator');

// All fields optional for updates
const productUpdateSchema = productSchema.fork(
  ['name', 'price', 'description', 'stock'],
  field => field.optional()
);

module.exports = productUpdateSchema;
