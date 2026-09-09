export interface Zone {
  id: number
  zone: string
  formerly: string
  state: string
  requirement: string
}

export const zones: Zone[] = [
  { id: 0, zone: 'The Abyssal Shelf', formerly: 'California', state: 'Cool', requirement: '—' },
  { id: 1, zone: 'The Scorched Corridor', formerly: 'Nevada/Arizona/Utah', state: 'Crazy', requirement: '—' },
  { id: 2, zone: 'The Florida Graveyard', formerly: 'Florida', state: 'Sexy', requirement: '—' },
  { id: 3, zone: 'The Frost Marches', formerly: 'Northeast US/Canada', state: 'Cool', requirement: '—' },
  { id: 4, zone: 'The Sahara Sea', formerly: 'Sahara Desert', state: 'Sexy', requirement: '—' },
  { id: 5, zone: 'The Gobi Gulf', formerly: 'Gobi Desert', state: 'Integrated', requirement: '—' },
  { id: 6, zone: 'Aeterna — The Threshold', formerly: 'Antarctica Coast', state: 'Integrated', requirement: 'Stage 4+' },
  { id: 7, zone: 'Aeterna — The Academy Spires', formerly: 'Antarctica Interior', state: 'Servant', requirement: 'Stage 5+' },
  { id: 8, zone: 'Aeterna — The Veil Quarter', formerly: 'Deep Interior', state: 'Mysterious', requirement: 'Stage 6+' },
  { id: 9, zone: 'Aeterna — The Throne Zone', formerly: 'Center', state: 'Great Teacher', requirement: 'Stage 7+' },
  { id: 10, zone: 'Aeterna — The Luminous Core', formerly: 'True Center', state: 'Enlightened', requirement: 'Stage 8+' },
  { id: 11, zone: 'The Deep City', formerly: 'Underground', state: 'Protocol', requirement: 'Stage 9+' },
]
