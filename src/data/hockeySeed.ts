export type SeedPlayer = {
  id: string
  name: string
  position: 'F' | 'D' | 'G'
  number: number
  team: string
  status: 'active' | 'ir'
}

export type SeedGame = {
  id: string
  opponent: string
  date: string // ISO date YYYY-MM-DD
  venue: 'home' | 'away'
  status: 'scheduled' | 'final'
  playerId: string
}

export const seedPlayers: SeedPlayer[] = [
  { id: 'player-00', name: 'Alex Mercer', position: 'F', number: 17, team: 'Home Club', status: 'active' },
  { id: 'player-01', name: 'Jordan Lee', position: 'D', number: 4, team: 'Home Club', status: 'active' },
  { id: 'player-02', name: 'Sam Ortiz', position: 'G', number: 30, team: 'Home Club', status: 'active' },
  { id: 'player-03', name: 'Riley Chen', position: 'F', number: 9, team: 'Home Club', status: 'active' },
  { id: 'player-04', name: 'Casey Novak', position: 'D', number: 22, team: 'Home Club', status: 'active' },
  { id: 'player-05', name: 'Morgan Hale', position: 'F', number: 11, team: 'Home Club', status: 'active' },
  { id: 'player-06', name: 'Taylor Brooks', position: 'G', number: 1, team: 'Home Club', status: 'ir' },
  { id: 'player-07', name: 'Quinn Patel', position: 'F', number: 19, team: 'Home Club', status: 'active' },
  { id: 'player-08', name: 'Harper Diaz', position: 'D', number: 3, team: 'Home Club', status: 'active' },
  { id: 'player-09', name: 'Avery Skater', position: 'F', number: 21, team: 'Home Club', status: 'active' },
  { id: 'player-10', name: 'Drew Callahan', position: 'D', number: 6, team: 'Home Club', status: 'ir' },
  { id: 'player-11', name: 'Jamie Soto', position: 'F', number: 13, team: 'Home Club', status: 'active' },
  { id: 'player-12', name: 'Reese Lang', position: 'G', number: 35, team: 'Home Club', status: 'active' },
  { id: 'player-13', name: 'Cameron Walsh', position: 'F', number: 27, team: 'Home Club', status: 'active' },
  { id: 'player-14', name: 'Parker Nguyen', position: 'D', number: 8, team: 'Home Club', status: 'active' },
  { id: 'player-15', name: 'Sidney Cole', position: 'F', number: 16, team: 'Home Club', status: 'active' },
  { id: 'player-16', name: 'Blake Ibarra', position: 'D', number: 44, team: 'Home Club', status: 'active' },
  { id: 'player-17', name: 'Emery Frost', position: 'F', number: 23, team: 'Home Club', status: 'ir' },
  { id: 'player-18', name: 'Logan Berg', position: 'D', number: 5, team: 'Home Club', status: 'active' },
  { id: 'player-19', name: 'Finley Shaw', position: 'F', number: 14, team: 'Home Club', status: 'active' },
]

export const seedGames: SeedGame[] = [
  { id: 'game-00', opponent: 'TOR', date: '2026-03-20', venue: 'home', status: 'final', playerId: 'player-00' },
  { id: 'game-01', opponent: 'BOS', date: '2026-08-12', venue: 'away', status: 'final', playerId: 'player-01' },
  { id: 'game-02', opponent: 'MTL', date: '2026-08-19', venue: 'home', status: 'final', playerId: 'player-03' },
  { id: 'game-03', opponent: 'OTT', date: '2026-08-26', venue: 'away', status: 'final', playerId: 'player-04' },
  { id: 'game-04', opponent: 'BUF', date: '2026-09-01', venue: 'home', status: 'final', playerId: 'player-05' },
  { id: 'game-05', opponent: 'DET', date: '2026-09-04', venue: 'away', status: 'final', playerId: 'player-07' },
  { id: 'game-06', opponent: 'TOR', date: '2026-09-06', venue: 'home', status: 'final', playerId: 'player-08' },
  { id: 'game-07', opponent: 'CHI', date: '2026-09-07', venue: 'away', status: 'final', playerId: 'player-09' },
  { id: 'game-08', opponent: 'MIN', date: '2026-09-08', venue: 'home', status: 'final', playerId: 'player-11' },
  { id: 'game-09', opponent: 'NSH', date: '2026-08-05', venue: 'away', status: 'final', playerId: 'player-14' },
  { id: 'game-10', opponent: 'TOR', date: '2026-09-12', venue: 'home', status: 'scheduled', playerId: 'player-00' },
  { id: 'game-11', opponent: 'NYR', date: '2026-09-15', venue: 'away', status: 'scheduled', playerId: 'player-02' },
  { id: 'game-12', opponent: 'PIT', date: '2026-09-18', venue: 'home', status: 'scheduled', playerId: 'player-03' },
  { id: 'game-13', opponent: 'WSH', date: '2026-09-21', venue: 'away', status: 'scheduled', playerId: 'player-05' },
  { id: 'game-14', opponent: 'CAR', date: '2026-09-24', venue: 'home', status: 'scheduled', playerId: 'player-07' },
  { id: 'game-15', opponent: 'FLA', date: '2026-09-27', venue: 'away', status: 'scheduled', playerId: 'player-09' },
  { id: 'game-16', opponent: 'TBL', date: '2026-10-01', venue: 'home', status: 'scheduled', playerId: 'player-12' },
  { id: 'game-17', opponent: 'BOS', date: '2026-10-04', venue: 'away', status: 'scheduled', playerId: 'player-13' },
  { id: 'game-18', opponent: 'MTL', date: '2026-10-08', venue: 'home', status: 'scheduled', playerId: 'player-15' },
  { id: 'game-19', opponent: 'OTT', date: '2026-10-11', venue: 'away', status: 'scheduled', playerId: 'player-19' },
]
