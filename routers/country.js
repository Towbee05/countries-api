const router = require('express').Router();
const { getallCountriesStatic ,getallCountries, getSingleCountry } = require('../controllers/country');

router.route('/static').get(getallCountriesStatic);
router.route('').get(getallCountries);
router.route('/:id').get(getSingleCountry);

module.exports = router;