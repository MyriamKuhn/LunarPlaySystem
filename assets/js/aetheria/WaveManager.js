/***********/

/* IMPORTS */

/***********/
import { BeetlemorphOne, BeetlemorphTwo, BeetlemorphThree, BeetlemorphFour} from '/assets/js/aetheria/Beetlemorph.js';
import { RhinomorphOne, RhinomorphTwo, RhinomorphThree, RhinomorphFour } from '/assets/js/aetheria/Rhinomorph.js';
import { LobstermorphOne, LobstermorphTwo, LobstermorphThree, LobstermorphFour } from '/assets/js/aetheria/Lobstermorph.js';
import { PhantommorphOne, PhantommorphTwo, PhantommorphThree, PhantommorphFour } from '/assets/js/aetheria/Phantommorph.js';
import { Boss1, Boss2, Boss3, Boss4 } from '/assets/js/aetheria/Boss.js';


export class WaveManager {
  constructor() {
    // Tableau des vagues
    this.waves = [
      {
        level: 1,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphTwo, count: 5 }],
        toActivate: [BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 2,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphTwo, count: 5 }],
        toActivate: [BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo, BeetlemorphTwo],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 3,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphThree, count: 5 }],
        toActivate: [BeetlemorphThree, BeetlemorphThree, BeetlemorphThree, BeetlemorphThree, BeetlemorphThree],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 4,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphThree, count: 2 }],
        toActivate: [BeetlemorphThree, BeetlemorphThree],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 5,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphThree, count: 3 }],
        toActivate: [BeetlemorphThree, BeetlemorphThree, BeetlemorphThree],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 6,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphFour, count: 3 }],
        toActivate: [BeetlemorphFour, BeetlemorphFour, BeetlemorphFour],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 7,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphFour, count: 2 }],
        toActivate: [BeetlemorphFour, BeetlemorphFour],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 8,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphFour, count: 2 }],
        toActivate: [BeetlemorphFour, BeetlemorphFour],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 9,
        enemies: [{ oldType: BeetlemorphOne, newType: BeetlemorphFour, count: 3 }],
        toActivate: [BeetlemorphFour, BeetlemorphFour, BeetlemorphFour],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 10,
        enemies: [{ oldType: BeetlemorphOne, newType:  Boss1, count: 1 }],
        toActivate: [Boss1],
        pointsRequired: 5,
        isBossCheck: false,
      },
      {
        level: 11,
        enemies: [{ oldType: BeetlemorphThree, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphFour, newType: RhinomorphOne, count: 3 },
                  { oldType: Boss1, newType: RhinomorphOne, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphOne, RhinomorphOne],
        pointsRequired: 10,
        isBossCheck: true,
      },
      {
        level: 12,
        enemies: [{ oldType: BeetlemorphThree, newType: RhinomorphOne, count: 1 }],
        toActivate: [RhinomorphOne],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 13,
        enemies: [{ oldType: BeetlemorphTwo, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphFour, newType: RhinomorphTwo, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 14,
        enemies: [{ oldType: BeetlemorphTwo, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphThree, newType: RhinomorphTwo, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 15,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphFour, newType: RhinomorphTwo, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 16,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphTwo, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphThree, newType: RhinomorphThree, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo, RhinomorphThree],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 17,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphTwo, newType: RhinomorphThree, count: 1 },
                  { oldType: BeetlemorphFour, newType: RhinomorphFour, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo, RhinomorphThree, RhinomorphFour],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 18,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphThree, count: 1 },
                  { oldType: BeetlemorphThree, newType: RhinomorphFour, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo, RhinomorphThree, RhinomorphFour],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 19,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphTwo, newType: RhinomorphThree, count: 1 },
                  { oldType: BeetlemorphThree, newType: RhinomorphFour, count: 1 }],
        toActivate: [RhinomorphOne, RhinomorphTwo, RhinomorphThree, RhinomorphFour],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 20,
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphOne, count: 2 },
                  { oldType: BeetlemorphOne, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphThree, count: 1 },
                  { oldType: BeetlemorphOne, newType: RhinomorphFour, count: 1 },
                  { oldType: BeetlemorphThree, newType: Boss2, count: 1 }],
        toActivate: [Boss2],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 21,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphOne, count: 1 },
                  { oldType: RhinomorphTwo, newType: LobstermorphOne, count: 1 },
                  { oldType: RhinomorphFour, newType: LobstermorphOne, count: 1 },
                  { oldType: Boss2, newType: LobstermorphOne, count: 1 }],
        toActivate: [LobstermorphOne, LobstermorphOne, LobstermorphOne, LobstermorphOne],
        pointsRequired: 15,
        isBossCheck: true,
      },
      {
        level: 22,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphOne, count: 1 }],
        toActivate: [LobstermorphOne],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 23,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphOne, count: 1 },
                  { oldType: RhinomorphThree, newType: LobstermorphTwo, count: 1 }],
        toActivate: [LobstermorphOne, LobstermorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 24,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphTwo, count: 1 },
                  { oldType: RhinomorphFour, newType: LobstermorphTwo, count: 1 }],
        toActivate: [LobstermorphTwo, LobstermorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 25,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphThree, count: 1 },
                  { oldType: RhinomorphTwo, newType: LobstermorphThree, count: 1 },
                  { oldType: RhinomorphThree, newType: LobstermorphThree, count: 1 }],
        toActivate: [LobstermorphThree, LobstermorphThree, LobstermorphThree],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 26,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphFour, count: 1 }],
        toActivate: [LobstermorphFour],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 27,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphOne, count: 1 },
                  { oldType: RhinomorphTwo, newType: LobstermorphTwo, count: 1 }],
        toActivate: [LobstermorphOne, LobstermorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 28,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphTwo, count: 1 }],
        toActivate: [LobstermorphTwo],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 29,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphTwo, count: 1 },
                  { oldType: RhinomorphTwo, newType: LobstermorphThree, count: 1 },
                  { oldType: RhinomorphThree, newType: LobstermorphFour, count: 1 }],
        toActivate: [LobstermorphTwo, LobstermorphThree, LobstermorphFour],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 30,
        enemies: [{ oldType: RhinomorphOne, newType: LobstermorphOne, count: 1 },
                  { oldType: RhinomorphTwo, newType: LobstermorphFour, count: 1 },
                  { oldType: RhinomorphFour, newType: Boss3, count: 1 }],
        toActivate: [Boss3],
        pointsRequired: 15,
        isBossCheck: false,
      },
      {
        level: 31,
        enemies: [{ oldType: RhinomorphOne, newType: PhantommorphOne, count: 1 },
                  { oldType: RhinomorphTwo, newType: PhantommorphOne, count: 1 },
                  { oldType: RhinomorphThree, newType: PhantommorphOne, count: 1 },
                  { oldType: RhinomorphFour, newType: PhantommorphOne, count: 1 },
                  { oldType: LobstermorphTwo, newType: PhantommorphOne, count: 1 },
                  { oldType: Boss3, newType: PhantommorphOne, count: 1 }],
        toActivate: [PhantommorphOne, PhantommorphOne, PhantommorphOne, PhantommorphOne, PhantommorphOne, PhantommorphOne],
        pointsRequired: 20,
        isBossCheck: true,
      },
      {
        level: 32,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphTwo, count: 1 }],
        toActivate: [PhantommorphTwo],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 33,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphOne, count: 1 }],
        toActivate: [PhantommorphOne],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 34,
        enemies: [],
        toActivate: [],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 35,
        enemies: [{ oldType: LobstermorphFour, newType: PhantommorphOne, count: 1 }],
        toActivate: [PhantommorphOne],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 36,
        enemies: [{ oldType: RhinomorphOne, newType: PhantommorphTwo, count: 1 },
                  { oldType: RhinomorphTwo, newType: PhantommorphThree, count: 1 },
                  { oldType: LobstermorphTwo, newType: PhantommorphThree, count: 1 },
                  { oldType: LobstermorphThree, newType: PhantommorphFour, count: 1 }],
        toActivate: [PhantommorphTwo, PhantommorphThree, PhantommorphThree, PhantommorphFour],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 37,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphTwo, count: 1 }],
        toActivate: [PhantommorphTwo],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 38,
        enemies: [{ oldType: RhinomorphThree, newType: PhantommorphOne, count: 1 },
                  { oldType: LobstermorphThree, newType: PhantommorphTwo, count: 1 },
                  { oldType: LobstermorphFour, newType: PhantommorphThree, count: 1 }],
        toActivate: [PhantommorphOne, PhantommorphTwo, PhantommorphThree],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 39,
        enemies: [{ oldType: LobstermorphTwo, newType: PhantommorphFour, count: 1 }],
        toActivate: [PhantommorphFour],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 40,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphOne, count: 1 },
                  { oldType: LobstermorphThree, newType: PhantommorphTwo, count: 1 },
                  { oldType: LobstermorphFour, newType: Boss4, count: 1 }],
        toActivate: [Boss4],
        pointsRequired: 20,
        isBossCheck: false,
      },
      {
        level: 41,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphOne, count: 1 },
                  { oldType: LobstermorphThree, newType: PhantommorphTwo, count: 1 },
                  { oldType: Boss4, newType: LobstermorphThree, count: 1 }],
        toActivate: [LobstermorphThree],
        pointsRequired: 25,
        isBossCheck: true,
      },
    ];
  }

  // Récupère la vague pour un niveau donné
  getWaveEnemies(level) {
    const enemies = [];
    const wave = this.waves.find((wave) => wave.level === level);

    // Si aucune vague n'existe pour ce niveau
    if (!wave) {
      return enemies;
    }

    wave.enemies.forEach(({ oldType, newType, count }) => {
      for (let i = 0; i < count; i++) {
        enemies.push({ oldType, newType });
      }
    });

    const toActivate = [...wave.toActivate];

    return { enemies, toActivate };
  }

  // Récupère les points requis pour passer au niveau suivant
  getPointsRequired(level) {
    const wave = this.waves.find((wave) => wave.level === level);

    // Si aucune vague n'existe pour ce niveau
    if (!wave) {
      return 0;
    }

    return wave.pointsRequired;
  }

  // Vérifie si le niveau est un boss
  getIsBossCheck(level) {
    const wave = this.waves.find((wave) => wave.level === level);

    // Si aucune vague n'existe pour ce niveau
    if (!wave) {
      return false;
    }

    return wave.isBossCheck;
  }
}

