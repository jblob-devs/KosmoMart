import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";


const config = {
  dictionaries: [adjectives],
};

function generateName(){
  return uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, animals],
    separator: ' ',
    style: 'capital',
  });
}

export function generateEncounter() {
  return generateName()
}
