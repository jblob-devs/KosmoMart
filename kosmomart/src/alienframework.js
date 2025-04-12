import {
  uniqueUsernameGenerator,
  Config,
  adjectives,
  nouns,
} from "unique-username-generator";

const {
  uniqueNamesGenerator,
  animals,
  starWars,
  names,
} = require("unique-names-generator");



const config = {
  dictionaries: [adjectives],
};

const randAlienName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals],
  length: 2,
});

export function generateEncounter() {
  return randAlienName;
}

export function generateEncounter2() {
  const username = uniqueUsernameGenerator(config);
  return username + " " + uniqueNamesGenerator({
    dictionaries: [names],
    length: 1,
  });
}
