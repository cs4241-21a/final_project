export default interface MaterialProps {
  name: string,
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
  farm_at: string,
  respawn_rate?: string,
}