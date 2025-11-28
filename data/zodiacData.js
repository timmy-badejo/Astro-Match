// data/zodiacData.js

export const zodiacSigns = [
  {
    id: 1,
    name: 'Aries',
    image: require('../vectors/aries.png'),
    compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    dates: 'March 21 - April 19',
    traits: ['Courageous', 'Determined', 'Confident'],
    description:
      'Aries is the first zodiac sign and is known for its energy and dynamic nature.',
  },
  {
    id: 2,
    name: 'Taurus',
    image: require('../vectors/taurus.png'),
    compatibleSigns: ['Virgo', 'Capricorn', 'Pisces', 'Cancer'],
    dates: 'April 20 - May 20',
    traits: ['Reliable', 'Patient', 'Practical'],
    description:
      'Taurus is known for its practicality and reliability, making them a dependable partner.',
  },
  {
    id: 3,
    name: 'Gemini',
    image: require('../vectors/gemini.png'),
    compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    dates: 'May 21 - June 20',
    traits: ['Adaptable', 'Curious', 'Outgoing'],
    description:
      'Gemini is a versatile and dynamic sign, with a dual personality that craves change.',
  },
  {
    id: 4,
    name: 'Cancer',
    image: require('../vectors/cancer.png'),
    compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    dates: 'June 21 - July 22',
    traits: ['Emotional', 'Caring', 'Loyal'],
    description:
      'Cancer is deeply intuitive and sentimental, with a strong need for emotional security.',
  },
  {
    id: 5,
    name: 'Leo',
    image: require('../vectors/leo.png'),
    compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Aquarius'],
    dates: 'July 23 - August 22',
    traits: ['Generous', 'Loyal', 'Energetic'],
    description:
      'Leo is known for their charisma, confidence, and strong leadership qualities.',
  },
  {
    id: 6,
    name: 'Virgo',
    image: require('../vectors/virgo.png'),
    compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    dates: 'August 23 - September 22',
    traits: ['Practical', 'Analytical', 'Modest'],
    description:
      'Virgo is analytical and diligent, with a strong focus on precision and order.',
  },
  {
    id: 7,
    name: 'Libra',
    image: require('../vectors/libra.png'),
    compatibleSigns: ['Gemini', 'Aquarius', 'Sagittarius', 'Leo'],
    dates: 'September 23 - October 22',
    traits: ['Charming', 'Diplomatic', 'Fair-minded'],
    description:
      'Libra is known for their diplomacy and desire for balance and harmony in life.',
  },
  {
    id: 8,
    name: 'Scorpio',
    image: require('../vectors/scorpio.png'),
    compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    dates: 'October 23 - November 21',
    traits: ['Passionate', 'Resourceful', 'Stubborn'],
    description:
      'Scorpio is intense and powerful, with a natural ability to focus on the goals they set.',
  },
  {
    id: 9,
    name: 'Sagittarius',
    image: require('../vectors/sagitarius.png'), // make sure filename matches
    compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    dates: 'November 22 - December 21',
    traits: ['Optimistic', 'Adventurous', 'Independent'],
    description:
      'Sagittarius is known for their adventurous spirit and thirst for knowledge.',
  },
  {
    id: 10,
    name: 'Capricorn',
    image: require('../vectors/capricon.png'), // make sure filename matches
    compatibleSigns: ['Taurus', 'Virgo', 'Pisces', 'Scorpio'],
    dates: 'December 22 - January 19',
    traits: ['Ambitious', 'Disciplined', 'Patient'],
    description:
      'Capricorn is the hardworking and ambitious sign that aims to achieve high goals.',
  },
  {
    id: 11,
    name: 'Aquarius',
    image: require('../vectors/aquarius.png'),
    compatibleSigns: ['Gemini', 'Libra', 'Sagittarius', 'Leo'],
    dates: 'January 20 - February 18',
    traits: ['Innovative', 'Humanitarian', 'Independent'],
    description:
      'Aquarius is forward-thinking, intellectual, and committed to making the world a better place.',
  },
  {
    id: 12,
    name: 'Pisces',
    image: require('../vectors/pisces.png'),
    compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    dates: 'February 19 - March 20',
    traits: ['Compassionate', 'Artistic', 'Gentle'],
    description:
      'Pisces is sensitive and empathetic, with a natural affinity for creativity and art.',
  },
];
