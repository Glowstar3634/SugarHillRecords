/*
 * SUGAR HILL — V1 editorial content registry
 * Prototype content: review artist credits, archive sources, publishing rights,
 * links and release metadata with Leland before public launch.
 */
window.SUGAR_HILL_DATA = {
  siteName: 'Sugar Hill Records',
  founded: 1979,
  navigation: [
    { label: 'Home', path: '' },
    { label: 'Timeline', path: 'timeline/' },
    { label: 'Music', path: 'music/' },
    { label: 'Artists', path: 'artists/' },
    { label: 'Archives', path: 'archives/' },
    { label: 'Legacy', path: 'legacy/' }
  ],
  releases: [
    {
      id: 'rappers-delight', number: '01', title: "Rapper's Delight", artist: 'The Sugarhill Gang', year: '1979',
      headline: 'THE RECORD THAT BROKE THROUGH.',
      description: 'A defining commercial breakthrough that brought rap to a much wider audience and helped open a new chapter in popular music.',
      palette: 'sky', monogram: 'RD', catalog: 'SH — 1979'
    },
    {
      id: 'the-message', number: '02', title: 'The Message', artist: 'Grandmaster Flash & The Furious Five', year: '1982',
      headline: 'A DIFFERENT KIND OF MESSAGE.',
      description: 'An enduring example of hip-hop as social commentary, pushing the possibilities of what a rap record could communicate.',
      palette: 'rust', monogram: 'TM', catalog: 'SH — 1982'
    },
    {
      id: 'apache', number: '03', title: 'Apache', artist: 'The Sugarhill Gang', year: '1981',
      headline: 'A GROOVE THAT KEPT MOVING.',
      description: 'A percussive, crowd-moving Sugarhill Gang favorite whose energy has stayed connected to generations of DJs and dancers.',
      palette: 'gold', monogram: 'AP', catalog: 'SH — 1981'
    },
    {
      id: 'funk-you-up', number: '04', title: 'Funk You Up', artist: 'The Sequence', year: '1979',
      headline: 'A NEW VOICE ENTERS THE ROOM.',
      description: 'The pioneering South Carolina trio helped make women central to Sugar Hill’s story from the label’s earliest days.',
      palette: 'rose', monogram: 'FY', catalog: 'SH — 1979'
    }
  ],
  artists: [
    { number: '01', name: 'The Sugarhill Gang', category: 'THE BREAKTHROUGH', years: 'EST. 1979',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/The_Sugarhill_Gang_%2852790148289%29.jpg/960px-The_Sugarhill_Gang_%2852790148289%29.jpg',
      imageAlt: 'The Sugarhill Gang performing in 2023, photographed by Gage Skidmore', position: 'center 35%', className: 'artist-gang' },
    { number: '02', name: 'Grandmaster Flash & The Furious Five', category: 'THE VISIONARIES', years: 'EARLY 1980s',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Grandmaster_Flash_and_The_Furious_Five_%281982_Sugar_Hill_Press_Photo%29.jpg',
      imageAlt: 'Vintage press portrait of Grandmaster Flash and the Furious Five, circa 1982', position: 'center 26%', className: 'artist-flash' },
    { number: '03', name: 'The Sequence', category: 'THE TRAILBLAZERS', years: 'EST. 1979',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/TheSequence.jpg',
      imageAlt: 'The Sequence in a promotional photograph circa 1980', position: 'center center', className: 'artist-sequence' }
  ],
  archives: [
    { number: 'A–01', eyebrow: 'THE PEOPLE', title: 'Behind the sound', description: 'Photographs, studio moments and the artists who made history.', kind: 'portrait', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Sylvia_Robinson_at_at_her_desk_in_her_Englewood%2C_NJ_office_%281982%29_%28cropped%29.jpg' },
    { number: 'A–02', eyebrow: 'THE RECORDS', title: 'Sleeves & labels', description: 'The design language of an era, one record at a time.', kind: 'records' },
    { number: 'A–03', eyebrow: 'THE PAPER TRAIL', title: 'Press & print', description: 'An evolving collection of period coverage and ephemera.', kind: 'press' }
  ]
};
