const CountrySchema = require('../models/country');

const getallCountriesStatic = async (req, res) => {
    const countries = await CountrySchema.find({});
    res.status(200).json({data: countries});
};  

const getallCountries = async (req, res) => {
    const { name, independent, region, numericFilters, capital } = req.query;
    const queryOperators = {};

    if (name) {
        queryOperators['name'] = { $regex:  name, $options : 'i'}
    }

    independent ? independent === 'true' ? queryOperators['independent'] = true : queryOperators['independent'] = false : null;
    region ? queryOperators['region'] = { $regex: region, $options : 'i' } : null;
    capital ? queryOperators['capital'] = { $regex: capital, $options: 'i' } : null;

    if (numericFilters) {
        const operators = {
            '>' : '$gt',
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq'
        };
        const options = ['population'];
        const regex = /\b(>|<|>=|<=|=)\b/g;
        let filter = numericFilters.replace(regex, (match)=> `-${operators[match]}-`);
        const [ field, operator, value ] = filter.split('-');
        options.includes(field) ? queryOperators[field] = { [operator] : value } : null;
        console.log(numericFilters, filter);
    };

    let { page, limit, sort, fieldList } = req.query;
    page = Number(page || 1);
    limit = Number(limit || 20);
    skip = (page - 1) * limit;
    
    let countriesResult = CountrySchema.find(queryOperators);
    
    if (sort){
        sort = sort.split(',').join(' ');
        countriesResult = countriesResult.sort(sort);
    }

    if (fieldList){
        fieldList = fieldList.split('.').join(' ');
        countriesResult = countriesResult.select(fieldList);
    }
    
    countriesResult = countriesResult.limit(limit).skip(skip);

    countries = await countriesResult;
    res.status(200).json({ nbHits : countries.length,data: countries});
};

const getSingleCountry = async (req, res, next) => {
    try{
        const { id } = req.params;
        const country = await CountrySchema.findOne({_id : id});
        res.status(200).json({data: country});
    } catch (err) {
        next(err);
    }
};

module.exports = { 
    getallCountriesStatic,
    getallCountries,
    getSingleCountry
};