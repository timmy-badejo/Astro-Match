# Astro-Match
AstroMatch is a React Native / Expo app that helps users explore zodiac compatibility. Users can sign up with their name and sign, browse zodiac information, and view compatibility results between signs. This project was built for MDIA 3295 to practice feature development, manual testing, and QA documentation.
What do ResultsScreen, ProfileScreen & CompatibilitySearchScreen do?

CompatibilitySearchScreen

Takes the selected sign from ZodiacSignScreen via route.params.selectedSign.

Shows a “Searching compatibility for zodiac sign {selectedSign}” message.

Prepares the user for results / deeper logic.

Has a button “See Results” → navigates to ResultsScreen and passes the same selectedSign.

ResultsScreen

Receives selectedSign from CompatibilitySearchScreen.

Looks up that sign’s data in zodiacSigns (from data/zodiacData.js).

Shows:

compatible signs list

a short text insight / description

Has a “View Profile” button → navigates to ProfileScreen.

ProfileScreen

Receives name and selectedSign from the previous screen (later you’ll probably pass it from Results).

Displays:

user name

zodiac sign

profile picture

basic bio/username and birthdate

Acts as a “personalization” screen so the app feels like your profile, not just generic compatibility.

You can literally describe this as:

“The main flow is: SignUp → ZodiacSign → CompatibilitySearch → Results → Profile. Each screen passes data forward using route.params, building up from basic input (name, sign) to personalized compatibility insights and a user profile.”