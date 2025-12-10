# AstroMatch – Project

AstroMatch is a React Native (Expo) astrology dating app concept. Users create a profile, choose their zodiac sign, explore compatibility matches, save favorite signs, and view simple message threads.

## Screen Flow (10 Screens)
o
1. **SplashScreen** – Astro-world intro with floating logo and tagline.
2. **OnboardingScreen** – Quick explanation of how AstroMatch works with CTA buttons.
3. **CreateProfileScreen** – Collects name, email, date of birth, gender, about, and relationship intent.
4. **SignInScreen** – Simple sign-in by name for returning users.
5. **ZodiacSignScreen** – User chooses their zodiac sign from a refined list.
6. **CompatibilitySearchScreen** – Shows the selected sign and prepares compatibility search.
7. **ResultsScreen** – Displays compatible signs and insights, with “Add to favorites” and “View profile”.
8. **ProfileScreen** – Shows profile info and best matches using match cards.
9. **FavoritesScreen** – AsyncStorage-backed list of favorite signs.
10. **MessagesScreen** – Simple message thread list per sign.

## Components

- `PrimaryButton` – Reusable themed button.
- `InputField` – Labeled text input with optional error message.
- `OnboardingSlide` – Title/subtitle layout for onboarding.
- `ZodiacSignList` – Shared zodiac data list with improved styling and tap targets.
- `MatchCard` – Compact card for a sign + quick action.
- `MessageThreadItem` – Row for conversations in the Messages screen.

## Data and Persistence

- `data/zodiacData.js` holds sign names, date ranges, traits, and descriptions.
- `AsyncStorage` is used to store favorite sign names under `@astromatch:favorites`.

## Future Work

- Connect `api/astroApi.js` to a real or mocked astrology compatibility API.
- Expand messages into real chat.
- Add deeper validation and accessibility improvements.
