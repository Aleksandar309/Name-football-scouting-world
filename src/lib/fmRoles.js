// All FM-style attributes grouped
export const ATTRIBUTES = {
  technical: [
    'Corners','Crossing','Dribbling','Finishing','First Touch',
    'Free Kick Taking','Heading','Long Shots','Long Throws',
    'Marking','Passing','Penalty Taking','Tackling','Technique'
  ],
  mental: [
    'Aggression','Anticipation','Bravery','Composure','Concentration',
    'Decisions','Determination','Flair','Leadership','Off The Ball',
    'Positioning','Teamwork','Vision','Work Rate'
  ],
  physical: [
    'Acceleration','Agility','Balance','Jumping Reach',
    'Natural Fitness','Pace','Stamina','Strength'
  ]
}

export const ATTR_SHORT = {
  'Corners':'Cor','Crossing':'Cro','Dribbling':'Dri','Finishing':'Fin',
  'First Touch':'Fir','Free Kick Taking':'Fre','Heading':'Hea',
  'Long Shots':'Lon','Long Throws':'LTh','Marking':'Mar','Passing':'Pas',
  'Penalty Taking':'Pen','Tackling':'Tac','Technique':'Tec',
  'Aggression':'Agg','Anticipation':'Ant','Bravery':'Bra','Composure':'Cmp',
  'Concentration':'Cnt','Decisions':'Dec','Determination':'Det','Flair':'Fla',
  'Leadership':'Ldr','Off The Ball':'OtB','Positioning':'Pos','Teamwork':'Tea',
  'Vision':'Vis','Work Rate':'Wor',
  'Acceleration':'Acc','Agility':'Agi','Balance':'Bal','Jumping Reach':'Jum',
  'Natural Fitness':'Nat','Pace':'Pac','Stamina':'Sta','Strength':'Str'
}

// Key attributes highlighted per position
export const POS_KEY_ATTRS = {
  GK: ['Reflexes','One on Ones','Command of Area','Aerial Reach','Handling','Kicking','Positioning'],
  CB: ['Marking','Heading','Tackling','Positioning','Concentration','Strength','Jumping Reach'],
  LB: ['Crossing','Pace','Stamina','Tackling','Acceleration','Work Rate','Dribbling'],
  RB: ['Crossing','Pace','Stamina','Tackling','Acceleration','Work Rate','Dribbling'],
  LWB:['Crossing','Pace','Stamina','Dribbling','Acceleration','Work Rate','Off The Ball'],
  RWB:['Crossing','Pace','Stamina','Dribbling','Acceleration','Work Rate','Off The Ball'],
  DM: ['Tackling','Positioning','Marking','Concentration','Passing','Stamina','Work Rate'],
  CM: ['Passing','Vision','Decisions','Stamina','Work Rate','Off The Ball','Technique'],
  AM: ['Passing','Vision','Decisions','Dribbling','First Touch','Flair','Off The Ball'],
  LM: ['Crossing','Pace','Stamina','Dribbling','Acceleration','Off The Ball','Work Rate'],
  RM: ['Crossing','Pace','Stamina','Dribbling','Acceleration','Off The Ball','Work Rate'],
  LW: ['Dribbling','Pace','Acceleration','Flair','Finishing','Off The Ball','Crossing'],
  RW: ['Dribbling','Pace','Acceleration','Flair','Finishing','Off The Ball','Crossing'],
  CF: ['Passing','Vision','Dribbling','First Touch','Off The Ball','Technique','Decisions'],
  ST: ['Finishing','Off The Ball','Composure','Heading','Acceleration','Pace','Strength'],
  SS: ['Finishing','Dribbling','Off The Ball','Flair','Vision','Passing','First Touch'],
}

// Role definitions — each role has: name, positions it applies to, key attrs, duty
export const ROLES = [
  // GK
  { name:'Goalkeeper',        pos:['GK'],                    duty:'D',  keys:['Reflexes','Handling','Positioning','Concentration'] },
  { name:'Sweeper Keeper',    pos:['GK'],                    duty:'A',  keys:['Rushing Out','Kicking','Passing','Reflexes'] },

  // Defenders
  { name:'Central Defender',  pos:['CB'],                    duty:'D',  keys:['Marking','Heading','Tackling','Positioning','Concentration','Strength'] },
  { name:'Ball-Playing Def',  pos:['CB'],                    duty:'D',  keys:['Passing','Technique','First Touch','Marking','Heading','Concentration'] },
  { name:'Limited Defender',  pos:['CB'],                    duty:'D',  keys:['Marking','Heading','Tackling','Strength','Concentration','Positioning'] },
  { name:'Libero',            pos:['CB'],                    duty:'S',  keys:['Passing','Marking','Heading','Tackling','Vision','Technique'] },
  { name:'Full Back',         pos:['LB','RB','LWB','RWB'],   duty:'S',  keys:['Tackling','Crossing','Pace','Stamina','Work Rate'] },
  { name:'Wing Back',         pos:['LB','RB','LWB','RWB'],   duty:'A',  keys:['Crossing','Pace','Stamina','Dribbling','Acceleration','Off The Ball'] },
  { name:'Inverted Wing Back',pos:['LB','RB','LWB','RWB'],   duty:'A',  keys:['Passing','Dribbling','Technique','Vision','Pace','Stamina'] },
  { name:'Complete Wing Back',pos:['LB','RB','LWB','RWB'],   duty:'A',  keys:['Crossing','Dribbling','Pace','Stamina','Acceleration','Off The Ball','Finishing'] },

  // Midfielders
  { name:'Defensive Midfielder',pos:['DM'],                  duty:'D',  keys:['Tackling','Marking','Positioning','Concentration','Stamina','Strength'] },
  { name:'Anchor Man',          pos:['DM'],                  duty:'D',  keys:['Tackling','Marking','Positioning','Concentration','Teamwork','Stamina'] },
  { name:'Half Back',           pos:['DM'],                  duty:'D',  keys:['Tackling','Passing','Positioning','Concentration','Vision','Marking'] },
  { name:'Deep Lying Playmaker',pos:['DM','CM'],             duty:'S',  keys:['Passing','Vision','Decisions','Technique','Composure','First Touch'] },
  { name:'Roaming Playmaker',   pos:['CM','DM'],             duty:'S',  keys:['Passing','Vision','Decisions','Dribbling','Stamina','Off The Ball'] },
  { name:'Box-to-Box Mid',      pos:['CM'],                  duty:'S',  keys:['Stamina','Work Rate','Passing','Tackling','Off The Ball','Finishing'] },
  { name:'Central Midfielder',  pos:['CM'],                  duty:'S',  keys:['Passing','Stamina','Work Rate','Decisions','Technique','First Touch'] },
  { name:'Ball Winning Mid',    pos:['CM','DM'],             duty:'D',  keys:['Tackling','Aggression','Work Rate','Stamina','Marking','Concentration'] },
  { name:'Carrilero',           pos:['CM'],                  duty:'S',  keys:['Passing','Stamina','Work Rate','Positioning','Decisions','Tackling'] },
  { name:'Advanced Playmaker',  pos:['AM','CM'],             duty:'S',  keys:['Passing','Vision','Decisions','Dribbling','First Touch','Technique','Flair'] },
  { name:'Enganche',            pos:['AM'],                  duty:'S',  keys:['Passing','Vision','Flair','Dribbling','Technique','Decisions','First Touch'] },
  { name:'Trequartista',        pos:['AM','CF'],             duty:'A',  keys:['Flair','Vision','Dribbling','Passing','Technique','Off The Ball','Finishing'] },
  { name:'Shadow Striker',      pos:['AM','SS'],             duty:'A',  keys:['Off The Ball','Finishing','Dribbling','Pace','Acceleration','Composure'] },
  { name:'Attacking Midfielder',pos:['AM'],                  duty:'S',  keys:['Passing','Vision','Decisions','Off The Ball','First Touch','Technique'] },

  // Wingers
  { name:'Winger',             pos:['LM','RM','LW','RW'],    duty:'A',  keys:['Crossing','Dribbling','Pace','Acceleration','Off The Ball','Stamina'] },
  { name:'Inverted Winger',    pos:['LM','RM','LW','RW'],    duty:'A',  keys:['Dribbling','Pace','Acceleration','Finishing','Technique','Flair','Cutting Inside'] },
  { name:'Wide Midfielder',    pos:['LM','RM'],              duty:'S',  keys:['Crossing','Stamina','Work Rate','Passing','Tackling','Pace'] },
  { name:'Inside Forward',     pos:['LW','RW','LM','RM'],    duty:'A',  keys:['Finishing','Dribbling','Pace','Off The Ball','Acceleration','Flair','Technique'] },
  { name:'Raumdeuter',         pos:['LW','RW'],              duty:'A',  keys:['Off The Ball','Finishing','Composure','Anticipation','Concentration','Decisions'] },
  { name:'Wide Playmaker',     pos:['LM','RM','LW','RW'],    duty:'S',  keys:['Passing','Vision','Decisions','First Touch','Technique','Dribbling'] },

  // Forwards
  { name:'Complete Forward',   pos:['ST','CF'],              duty:'A',  keys:['Finishing','Heading','Dribbling','Passing','Off The Ball','Composure','Strength','Pace'] },
  { name:'Advanced Forward',   pos:['ST'],                   duty:'A',  keys:['Finishing','Off The Ball','Composure','Pace','Acceleration','Dribbling'] },
  { name:'Deep Lying Forward', pos:['CF','SS'],              duty:'S',  keys:['Passing','Vision','First Touch','Decisions','Off The Ball','Technique'] },
  { name:'False Nine',         pos:['CF','ST'],              duty:'S',  keys:['Passing','Vision','Dribbling','First Touch','Off The Ball','Technique','Finishing'] },
  { name:'Pressing Forward',   pos:['ST','CF'],              duty:'D',  keys:['Work Rate','Stamina','Aggression','Pace','Acceleration','Pressing'] },
  { name:'Poacher',            pos:['ST'],                   duty:'A',  keys:['Finishing','Composure','Off The Ball','Anticipation','Concentration','Acceleration'] },
  { name:'Target Man',         pos:['ST','CF'],              duty:'S',  keys:['Heading','Strength','Jumping Reach','Holding','First Touch','Bravery'] },
  { name:'Segundo Volante',    pos:['DM','CM'],              duty:'S',  keys:['Stamina','Work Rate','Off The Ball','Finishing','Tackling','Passing'] },
]

// Calculate role score based on player attributes
export function calcRoleScore(attrs, role) {
  let total = 0, count = 0
  role.keys.forEach(k => {
    if (attrs[k] !== undefined) { total += attrs[k]; count++ }
  })
  return count > 0 ? Math.round((total / count) * 10) / 10 : 0
}

// Get top roles for a position
export function getTopRoles(attrs, position, limit = 5) {
  const applicable = ROLES.filter(r => r.pos.includes(position))
  return applicable
    .map(r => ({ ...r, score: calcRoleScore(attrs, r) }))
    .filter(r => r.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, limit)
}

// Color for attribute value
export function attrColor(v) {
  if (!v || v < 1) return '#2a3550'
  if (v >= 17) return '#00e676'
  if (v >= 14) return '#69f0ae'
  if (v >= 11) return '#ffb300'
  if (v >= 8)  return '#ff7043'
  return '#ef5350'
}

export function attrBg(v) {
  if (!v || v < 1) return 'rgba(42,53,80,0.3)'
  if (v >= 17) return 'rgba(0,230,118,0.12)'
  if (v >= 14) return 'rgba(105,240,174,0.08)'
  if (v >= 11) return 'rgba(255,179,0,0.08)'
  if (v >= 8)  return 'rgba(255,112,67,0.08)'
  return 'rgba(239,83,80,0.06)'
}

// Pitch positions for visualization
export const PITCH_POSITIONS = {
  GK:  { x: 50, y: 90 },
  CB:  { x: 50, y: 72 },
  LB:  { x: 18, y: 72 },
  RB:  { x: 82, y: 72 },
  LWB: { x: 14, y: 58 },
  RWB: { x: 86, y: 58 },
  SW:  { x: 50, y: 80 },
  DM:  { x: 50, y: 55 },
  CM:  { x: 50, y: 45 },
  AM:  { x: 50, y: 33 },
  LM:  { x: 15, y: 45 },
  RM:  { x: 85, y: 45 },
  LW:  { x: 15, y: 28 },
  RW:  { x: 85, y: 28 },
  SS:  { x: 35, y: 22 },
  CF:  { x: 65, y: 22 },
  ST:  { x: 50, y: 14 },
}
