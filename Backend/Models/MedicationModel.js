const mongoose = require('mongoose');

//enum medication units
const medicationUnits = [
    'gal (Gallon)',
    'qt (Quart)',
    'pt (Pint)',
    'cup (Cup)',
    'tbsp (Tablespoon)',
    'tsp (Teaspoon)',
    'drop (Drop)',
    'L (Liter)',
    'dL (Deciliter)',
    'mL (Milliliter)',
    'kg (Kilogram)',
    'g (Gram)',
    'mg (Milligram)',
    'mcg (Microgram)',
    'IU (International Unit)',
    'U (Unit)',
    'mU (Milliunit)',
    'puff (Puff)',
    'spray (Spray)',
    'patch (Patch)',
    'suppository (Suppository)',
    'inhalation (Inhalation)',
    'actuation (Actuation)',
    'cartridge (Cartridge)',
    'vial (Vial)',
    'ampule (Ampule)',
    'mol (Mole)',
    'Eq (Equivalents)',
    'mEq (Milliequivalents)'
  ];

const medicationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    dosage: {
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true,
            enum: medicationUnits
        }
    },
    numberOfHoursBetweenDoses: {//number of hours between doses
        type: Number,
        required: true,
        alias: 'frequency'
    }
});

const Medication = mongoose.model('medication', medicationSchema);

module.exports = Medication;