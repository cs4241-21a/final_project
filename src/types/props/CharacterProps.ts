import NamedProps from "./NamedProps";

export default interface CharacterProps extends NamedProps {
  // !!! TODO (Michael) :  Define CharacterProps based off data given by API
  // FarmingSpotProps and MaterialProps have been done for reference
  name: string
  fullname: {
    en: string,
    znCn?: string,
    ko?: string,
    ja?: string,
    ru?: string,
    vi?: string,
    de?: string,
    fr?: string,
    es?: string,
  },
  element: string,
  rarity: number,
  weapon: string,
  ascension: string[],
  talent: string[],
}