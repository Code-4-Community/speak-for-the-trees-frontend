import { RowValidateCallback } from '@fast-csv/parse';
import { csvRow } from '../../containers/adminDashboard/ducks/types';
import {
  verifyFields,
  requiredFields,
  csvRowToJSON,
} from '../csvParse';

test('requiredFields tests', () => {
  const exampleRequired: csvRow = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
  };

  expect(requiredFields(exampleRequired)).toEqual(
    {
      lat: 72.5,
      lng: 70,
      city: "Boston",
      zip: "02120",
      address: "1 town st",
      neighborhoodId: 10,
    }
  );
});

test('verifyFields tests', () => {
  const exampleGood: csvRow = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
  };

  const exampleGoodBlanks = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
    "Circumference": "",
    "Diameter": "",
    "Site Type": "",
    "Sucker Growth": "true",
  };

  const exampleBadRequired = {
    "Latitude": "72.5",
    "Longitude": "hello",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
  };

  const exampleBadOptional = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
    "Circumference": "goodbye",
  };

  const testError: RowValidateCallback = (nothing: any, isValid: boolean | undefined, reason?: string) => {
    if (!isValid) {
      throw new Error(reason);
    }
  }

  expect(() => verifyFields(exampleGood, testError)).not.toThrow();
  expect(() => verifyFields(exampleGoodBlanks, testError)).not.toThrow();
  expect(() => verifyFields(exampleBadRequired, testError)).toThrow(
    new Error('Required column is malformed.\nrequires Latitude, Longitude, City, Zip, Address, and Neighborhood Id')
  );
  expect(() => verifyFields(exampleBadOptional, testError)).toThrow(
    new Error('Malformed columns.\nBlock Id, Diameter, Circumference, Site Width, and Site Length must be blank or contain numbers')
  );
});

test('csvRowToJSON tests', () => {
  const exampleGood: csvRow = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
  };

  const exampleGoodBlanks = {
    "Latitude": "72.5",
    "Longitude": "70",
    "City": "Boston",
    "Zip": "2120",
    "Address": "1 town st",
    "Neighborhood Id": "10",
    "Site Type": "",
    "Sucker Growth": "true",
    "Bag Filled": "",
  };

  const exampleNoBlanks = {
      // Required fields
  "Latitude": "100",
  "Longitude": "100",
  "City": "Boston",
  "Zip": "0212",
  "Address": "Boston baby",
  "Neighborhood Id": "1",
  //---------------------------
  "Tree Present": "false",
  "Status": "good",
  "Genus": "tree",
  "Species": "tree",
  "Common Name": "steve",
  "Confidence": "high",
  "Diameter": "10",
  "Circumference": "",
  "Multistem": "yES",
  "Coverage": "good",
  "Pruning": "yes",
  "Condition": "good",
  "Discoloring": "no",
  "Leaning": "",
  "Constricting Grate": "",
  "Wounds": "",
  "Pooling": "wowza",
  "Stakes With Wires": "",
  "Stakes Without Wires": "",
  "Light": "",
  "Bicycle": "true",
  "Bag Empty": "YES",
  "Bag Filled": "",
  "Tape": "",
  "Sucker Growth": "",
  "Site Type": "pit",
  "Sidewalk Width": "long",
  "Site Width": "100",
  "Site Length": "50",
  "Material": "mulch",
  "Raised Bed": "",
  "Fence": "",
  "Trash": "",
  "Wires": "",
  "Grate": "",
  "Stump": "",
  "Tree Notes": "good tree",
  "Site Notes": "",
  "Block Id": "100",
  }

  expect(csvRowToJSON(exampleGood)).toEqual({
    lat: 72.5,
    lng: 70,
    city: "Boston",
    zip: "02120",
    address: "1 town st",
    neighborhoodId: 10,
  });

  expect(csvRowToJSON(exampleGoodBlanks)).toEqual({
    lat: 72.5,
    lng: 70,
    city: "Boston",
    zip: "02120",
    address: "1 town st",
    neighborhoodId: 10,
    siteType: "",
    suckerGrowth: true,
  });
})

