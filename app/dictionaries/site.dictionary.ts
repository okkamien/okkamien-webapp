import siteMapJson from 'app/dictionaries/site-map.json'

export const siteName = 'Miejsko-Gminny Ośrodek Kultury w Kamieniu Krajeńskim'
export const siteDescription = ''
export const siteFoundedYear = 2024
export const siteDomain = 'okkamien.pl'

export const siteMap = siteMapJson

export const siteExternalLinks = {
  facebook: 'https://www.facebook.com/mgok.kamien.kr',
  instagram: 'https://www.instagram.com/ok_kamien/',
  youtube: 'https://www.youtube.com/@mgok.kamienkrajenski',
}

export const navigationSocials = [
  {
    label: 'facebook',
    link: siteExternalLinks.facebook,
  },
  {
    label: 'instagram',
    link: siteExternalLinks.instagram,
  },
  {
    label: 'youtube',
    link: siteExternalLinks.youtube,
  },
]

export const navigationLinks = [
  {
    label: 'Aktualności',
    link: siteMap.news,
  },
  {
    label: 'Wydarzenia',
    link: siteMap.events,
  },
  {
    label: 'Pracownie',
    link: siteMap.workshops,
  },
  {
    label: 'Placówki',
    link: siteMap.facilities,
  },
  // {
  //   label: 'O nas',
  //   link: siteMap.aboutUs,
  // },
  {
    label: 'Kontakt',
    link: siteMap.contact,
  },
]

export const footerAnotherLinks = [
  {
    label: 'Nazwa kategorii',
    link: '#',
  },
  {
    label: 'Nazwa kategorii',
    link: '#',
  },
  {
    label: 'Nazwa kategorii',
    link: '#',
  },
]
