import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";


const config = {
  dictionaries: [adjectives],
};


const emotions = [
"Madness",
"Surprise",
"Irritation",
"Interest",
"Shame",
"Longing",
"Sorrow",
"Confusion",
"Satisfaction",
"Passion",
"Rage",
"Contempt",
"Bewilderment",
"Bliss",
"Awe",
"Love",
"Anticipation",
"Excitement",
"Ecstasy",
"Smugness",
"Despair",
"Disappointment",
"Sadness",
"Happiness",
"Remorse",
"Shock",
"Boredom",
"Fury",
"Humility",
"Gratitude",
"Joy",
"Pity",
"Horror",
"Pain",
"Terror",
"Guilt",
"Envy",
"Pleasure",
"Anger",
"Pride",
"Hunger",
"Optimism",
"Melancholy",
"Torment",
"Contentment",
"Fright",
"Hatred"
]

const tone = [
  'Snooty',
  'Clear',
  'Hopeful',
  'Melancholic',
  'Joyful',
  'Angry',
  'Anxious',
  'Somber',
  'Playful',
  'Romantic',
  'Whimsical',
  'Dramatic',
  'Informative',
  'Inquisitive',
  'Reflective',
  'Philosophical',
  'Clinical',
  'Logical',
  'Objective',
  'Formal',
  'Respectful',
  'Diplomatic',
  'Detached',
  'Authoritative',
  'Cautious',
  'Neutral',
  'Friendly',
  'Sarcastic',
  'Witty',
  'Snarky',
  'Relatable',
  'Chill',
  'Sincere',
  'Mysterious',
  'Ominous',
]


function generateName(){
  return uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, animals],
    separator: ' ',
    style: 'capital',
  });
}

export function generateEmotions(number){
  const copy = [...emotions]; 
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; 
  }
  return copy.slice(0, number);
}

function generateTone(){
  return tone[Math.floor(Math.random() * tone.length)];
}

export function generateEncounter() {
  const alien = {
  name: generateName(),
  emotions: generateEmotions(3),
  tone: generateTone(),
  }

  return alien
}
