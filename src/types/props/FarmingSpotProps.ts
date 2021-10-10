import NamedProps from "./NamedProps";

export default interface FarmingSpotProps extends NamedProps {
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
    alias_of?: string,
    day_of_week: string[],
    resin: number | null,
    type?: string,
  }