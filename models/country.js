const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, "A country name must be provided!!"] 
    },
    topLevelDomain: {
        type: [String]
    },
    alpha2Code: {
        type: String
    },
    alpha3Code: {
        type: String
    },
    callingCodes: {
        type: [String]
    },
    capital: {
        type: String
    },
    altSpellings: {
        type: [String]
    },
    subregion: {
        type: String
    },
    region: {
        type: String
    },
    population: {
        type: Number
    },
    latlng: {
        type: [Number]
    },
    demonym: {
        type: String
    },
    area: {
        type: Number
    },
    timezones: {
        type: [String]
    },
    borders: {
        type: [String],
        required: false
    },
    nativeName: {
        type: String
    },
    numericCode: {
        type: String
    },
    flags: {
        type: Map,
        of: String
    },
    currencies:{
        type: [{
            code: { type: String },
            name: { type: String },
            symbol: { type: String }
        }]
    },
    languages: {
        type: [{
            iso639_1: { type: String },
            iso639_2: { type: String },
            name : { type : String },
            nativeName: { type: String }
        }]
    },
    translations: {
        type: Map,
        of: String
    },
    flag: {
        type: String
    },
    regionalBlocs: {
        type: [{
            acronym: { type: String },
            name: { type: String }
        }]
    },
    cioc: { 
        type: String
    },
    independent: {
        type: Boolean,
        default: false
    }
});

module.exports =  mongoose.model("Country", CountrySchema);