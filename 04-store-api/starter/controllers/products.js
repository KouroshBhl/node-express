const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).limit(5).sort('-name price');
  res.status(200).json({ length: products.length, products });
};
const getAllProducts = async (req, res) => {
  let objData = req.query;
  const { sort, name, fields, numericFilters } = req.query;
  if (name) objData.name = { $regex: req.query.name, $options: 'i' };

  let sortlist = 'createdAt';
  let fieldList = '';
  if (sort) sortlist = sort.split(',').join(' ');

  if (fields) fieldList = fields.split(',').join(' ');

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((el) => {
      const [field, operator, value] = el.split('-');
      if (options.includes(field)) {
        objData[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(objData);

  const products = await Product.find(objData)
    .sort(sortlist)
    .select(fieldList)
    .skip(skip)
    .limit(limit);

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
