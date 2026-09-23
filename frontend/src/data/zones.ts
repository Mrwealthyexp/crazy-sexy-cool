import type { StageId } from './transcendence'

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  dominantEnergy: string
  greatTeacherEffect: string
  danger: string
  unlockStage: StageId
}

export const zones: Zone[] = [
  {
    id: 'red-district',
    name: 'The Red District',
    coordinates: [14, 72],
    description: 'A furnace of violence, adrenaline, and unprocessed grief.',
    dominantEnergy: 'Crazy',
    greatTeacherEffect: 'Storm weather purifies rage into courage.',
    danger: 'Karmic debt triples for unchecked aggression.',
    unlockStage: 'crazy',
  },
  {
    id: 'velvet-lounge',
    name: 'The Velvet Lounge',
    coordinates: [33, 56],
    description: 'A theater of glamour where desire, art, and longing braid together.',
    dominantEnergy: 'Sexy',
    greatTeacherEffect: 'Rain forces emotional truth and confession.',
    danger: 'Desire can calcify into addiction and hollow charm.',
    unlockStage: 'sexy',
  },
  {
    id: 'glass-tower',
    name: 'The Glass Tower',
    coordinates: [58, 22],
    description: 'A mirrored citadel where intellect becomes commerce and distance.',
    dominantEnergy: 'Cool',
    greatTeacherEffect: 'Snow freezes combat and makes stillness unavoidable.',
    danger: 'Detachment can become spiritual death.',
    unlockStage: 'cool',
  },
  {
    id: 'nexus',
    name: 'The Nexus',
    coordinates: [51, 49],
    description: 'The balancing chamber where all three worldly states collide and harmonize.',
    dominantEnergy: 'Sexy-Crazy-Cool',
    greatTeacherEffect: 'Rainbow weather spawns miracles and reconciliations.',
    danger: 'Only integrated souls can withstand the psychic pressure.',
    unlockStage: 'integrated',
  },
  {
    id: 'shadow-realm',
    name: 'The Shadow Realm',
    coordinates: [80, 68],
    description: 'A hidden precinct where birth moon shadows become living encounters.',
    dominantEnergy: 'Hidden self',
    greatTeacherEffect: 'Dark weather makes intuition the only surviving sense.',
    danger: 'Every unresolved wound becomes an active enemy.',
    unlockStage: 'servant',
  },
  {
    id: 'throne-room',
    name: 'The Throne Room',
    coordinates: [90, 12],
    description: 'A chamber of revelation where divine law is visible as light.',
    dominantEnergy: 'Great Teacher',
    greatTeacherEffect: 'Sunbreak exposes lies, hidden paths, and sacred timing.',
    danger: 'Unready souls are spiritually blinded on entry.',
    unlockStage: 'great-teacher',
  },
]
