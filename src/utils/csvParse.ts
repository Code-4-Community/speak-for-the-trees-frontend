import { parse, RowValidateCallback, CsvParserStream } from '@fast-csv/parse';
import { UploadFile } from 'antd/lib/upload/interface';
import protectedApiClient from '../api/protectedApiClient';
import { csvRow, AddSitesRow, RequiredAddSitesRows } from '../containers/adminDashboard/ducks/types';
import { handleOptionalNumber, boolStringToBoolean } from "./stringFormat";

export const addSitesReadFile = async (
  file: UploadFile,
) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const csv = reader.result;
      
      const stream = parse<csvRow, csvRow>({ headers: true });
      
      try {
        const requestArray: AddSitesRow[] = await readStream(stream, csv);
        protectedApiClient.addSites({
          sites: requestArray
        });
      } catch (e) { 
        // This is an error in an async callback. As far as I can tell
        // there is no way to actually catch this error such that
        // the user can actually see it
        // Please try to fix this/figure out csv parsing on backend
        console.error(e);
      }

    } 

  reader.readAsText(file.originFileObj);
}

export const readStream = (stream: CsvParserStream<csvRow, csvRow>, csv: any) => {
  return new Promise<AddSitesRow[]>((resolve, reject) => {
    const results: AddSitesRow[] = [];
    stream.validate(verifyFields);
    stream.on('error', error => reject(error));
    stream.on('data', row => {results.push(csvRowToJSON(row))});
    stream.on('data-invalid', (row, rowNumber, reason) => {
      reject(`Error at row: ${rowNumber}\nreason: ${reason}`)
    });
    stream.on('end', () => resolve(results));
    stream.write(csv);
    stream.end();
  });
}

export const csvRowToJSON = (row: csvRow): AddSitesRow => {

  return {
    ...requiredFields(row),
    blockId: handleOptionalNumber(row['Block Id']),
    status: row['Status'],
    genus: row['Genus'],
    species: row['Species'],
    commonName: row['Common Name'],
    confidence: row['Confidence'],
    diameter: handleOptionalNumber(row['Diameter']),
    circumference: handleOptionalNumber(row['Circumference']),
    coverage: row['Coverage'],
    pruning: row['Pruning'], 
    condition: row['Condition'],
    discoloring: boolStringToBoolean(row['Discoloring']),
    leaning: boolStringToBoolean(row['Leaning']),
    constrictingGrate: boolStringToBoolean(row['Constricting Grate']),
    wounds: boolStringToBoolean(row['Wounds']),
    pooling: boolStringToBoolean(row['Pooling']),
    stakesWith: boolStringToBoolean(row['Stakes With Wires']),
    stakesWithout: boolStringToBoolean(row['Stakes Without Wires']),
    light: boolStringToBoolean(row['Light']),
    bicycle: boolStringToBoolean(row['Bicycle']),
    bagWith: boolStringToBoolean(row['Bag Filled']),
    bagWithout: boolStringToBoolean(row['Bag Empty']),
    tape: boolStringToBoolean(row['Tape']),
    suckerGrowth: boolStringToBoolean(row['Sucker Growth']),
    siteType: row['Site Type'],
    sidewalkWidth: row['Sidewalk Width'], 
    siteWidth: handleOptionalNumber(row['Site Width']),
    siteLength: handleOptionalNumber(row['Site Length']), 
    material: row['Material'],
    raisedBed: boolStringToBoolean(row['Raised Bed']),
    fence: boolStringToBoolean(row['Fence']),
    trash: boolStringToBoolean(row['Trash']),
    wires: boolStringToBoolean(row['Wires']),
    grate: boolStringToBoolean(row['Grate']),
    stump: boolStringToBoolean(row['Stump']),
    treeNotes: row['Tree Notes'],
    siteNotes: row['Site Notes'], 
  }
}

export const verifyFields = (row: csvRow, cb: RowValidateCallback): void => {

  // required fields
  if (!!!row['Latitude'] || isNaN(+row['Latitude']) 
  || !!!row['Longitude'] || isNaN(+row['Longitude'])
  || !!!row['City']
  || !!!row['Zip'] || isNaN(+row['Zip'])
  || !!!row['Address']
  || !!!row['Neighborhood Id'] || isNaN(+row['Neighborhood Id'])
  ) {
    return cb(null, false, 'Required column is malformed.\nrequires Latitude, Longitude, City, Zip, Address, and Neighborhood Id');
  }

  // other number fields
  if ((!!row['Block Id'] && isNaN(+row['Block Id']))
  || (!!row['Diameter'] && isNaN(+row['Diameter']))
  || (!!row['Circumference'] && isNaN(+row['Circumference']))
  || (!!row['Site Width'] && isNaN(+row['Site Width']))
  || (!!row['Site Length'] && isNaN(+row['Site Length']))
  ) {
    return cb(null, false, 'Malformed columns.\nBlock Id, Diameter, Circumference, Site Width, and Site Length must be blank or contain numbers');
  }

  return cb(null, true);
}

/**
 * Converts the strings of the required fields in a csvRow to their correct types
 * INVARIANT: values have already been verified, so number strings are not NAN
 * @param row The csv row with string values
 * @returns 
 */
export const requiredFields = (row: csvRow): RequiredAddSitesRows => {
  return {
    lat: +row['Latitude'],
    lng: +row['Longitude'],
    city: row['City'],
    zip: row['Zip'].length === 4 ? '0'.concat(row['Zip']) : row['Zip'],
    address: row['Address'],
    neighborhoodId: +row['Neighborhood Id'],
  }
}
