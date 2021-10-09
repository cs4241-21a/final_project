export default interface CharacterProps {
  // !!! TODO (Michael) :  Define CharacterProps based off data given by API
  // FarmingSpotProps and MaterialProps have been done for reference
  name: string
  fullname: {
    en: string,
    es?: string,
    pt?: string,
    ko?: string,
    ja?: string,
    vi?: string,
    de?: string,
    fr?: string,
    ru?: string
  },
  element: string,
  rarity: number,
  weapon: string,
  ascension: string[],
  talent: string[],
}