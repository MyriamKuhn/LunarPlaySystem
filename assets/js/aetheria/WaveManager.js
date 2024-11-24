/***********/

/* IMPORTS */

/***********/
import { BeetlemorphOne, BeetlemorphTwo, BeetlemorphThree, BeetlemorphFour} from '/assets/js/aetheria/Beetlemorph.js';
import { RhinomorphOne, RhinomorphTwo, RhinomorphThree, RhinomorphFour } from '/assets/js/aetheria/Rhinomorph.js';
import { LobstermorphOne, LobstermorphTwo, LobstermorphThree, LobstermorphFour } from '/assets/js/aetheria/Lobstermorph.js';
import { PhantommorphOne, PhantommorphTwo, PhantommorphThree, PhantommorphFour } from '/assets/js/aetheria/Phantommorph.js';
import { MantismorphOne, MantismorphTwo, MantismorphThree, MantismorphFour } from '/assets/js/aetheria/Mantismorph.js';
import { EaglemorphOne, EaglemorphTwo, EaglemorphThree, EaglemorphFour } from '/assets/js/aetheria/Eaglemorph.js';
import { LocustmorphOne, LocustmorphTwo, LocustmorphThree, LocustmorphFour } from '/assets/js/aetheria/Locustmorph.js';
import { SquidmorphOne, SquidmorphTwo, SquidmorphThree, SquidmorphFour } from '/assets/js/aetheria/Squidmorph.js';
import { Boss1, Boss2, Boss3, Boss4, Boss5, Boss6, Boss7, Boss8 } from '/assets/js/aetheria/Boss.js';


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
        enemies: [{ oldType: BeetlemorphOne, newType: RhinomorphTwo, count: 1 },
                  { oldType: BeetlemorphTwo, newType: RhinomorphThree, count: 1 },
                  { oldType: BeetlemorphThree, newType: RhinomorphFour, count: 1 },
                  { oldType: RhinomorphOne, newType: LobstermorphThree, count: 1 },
                  { oldType: PhantommorphOne, newType: MantismorphOne, count: 4 },
                  { oldType: PhantommorphFour, newType: LobstermorphFour, count: 1 },
                  { oldType: Boss4, newType: MantismorphOne, count: 1 }],
        toActivate: [MantismorphOne, MantismorphOne, MantismorphOne, MantismorphOne, MantismorphOne, MantismorphOne, MantismorphOne],
        pointsRequired: 25,
        isBossCheck: true,
      },
      {
        level: 42,
        enemies: [{ oldType: PhantommorphOne, newType: MantismorphThree, count: 1 },
                  { oldType: PhantommorphTwo, newType: MantismorphTwo, count: 2 },
                  { oldType: PhantommorphThree, newType: MantismorphFour, count: 1 }],
        toActivate: [MantismorphTwo, MantismorphTwo, MantismorphThree, MantismorphFour],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 43,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 44,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 45,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 46,
        enemies: [{ oldType: BeetlemorphOne, newType: MantismorphTwo, count: 1 },
                  { oldType: PhantommorphOne, newType: MantismorphThree, count: 1 }],
        toActivate: [MantismorphTwo, MantismorphThree],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 47,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 48,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 49,
        enemies: [],
        toActivate: [],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 50,
        enemies: [{ oldType: LobstermorphOne, newType: PhantommorphFour, count: 1 },
                  { oldType: LobstermorphTwo, newType: Boss5, count: 1 }],
        toActivate: [Boss5],
        pointsRequired: 25,
        isBossCheck: false,
      },
      {
        level: 51,
        enemies: [{ oldType: PhantommorphOne, newType: EaglemorphOne, count: 2 },
                  { oldType: Boss5, newType: EaglemorphOne, count: 1 }],
        toActivate: [EaglemorphOne, EaglemorphOne, EaglemorphOne],
        pointsRequired: 30,
        isBossCheck: true,
      },
      {
        level: 52,
        enemies: [{ oldType: PhantommorphTwo, newType: EaglemorphOne, count: 1 },
                  { oldType: PhantommorphThree, newType: EaglemorphOne, count: 1 },
                  { oldType: PhantommorphFour, newType: EaglemorphTwo, count: 1 }],
        toActivate: [EaglemorphOne, EaglemorphOne, EaglemorphTwo],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 53,
        enemies: [{ oldType: LobstermorphThree, newType: EaglemorphThree, count: 1 }],
        toActivate: [EaglemorphThree],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 54,
        enemies: [{ oldType: LobstermorphOne, newType: EaglemorphTwo, count: 1 },
                  { oldType: MantismorphOne, newType: EaglemorphFour, count: 1 }],
        toActivate: [EaglemorphTwo, EaglemorphFour],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 55,
        enemies: [{ oldType: MantismorphTwo, newType: EaglemorphOne, count: 1 },
                  { oldType: MantismorphThree, newType: EaglemorphTwo, count: 1 }],
        toActivate: [EaglemorphOne, EaglemorphTwo],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 56,
        enemies: [{ oldType: BeetlemorphOne, newType: EaglemorphTwo, count: 1 },
                  { oldType: BeetlemorphThree, newType: EaglemorphThree, count: 1 }],
        toActivate: [EaglemorphTwo, EaglemorphThree],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 57,
        enemies: [{ oldType: BeetlemorphFour, newType: EaglemorphFour, count: 1 }],
        toActivate: [EaglemorphFour],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 58,
        enemies: [{ oldType: BeetlemorphFour, newType: EaglemorphThree, count: 1 }],
        toActivate: [EaglemorphThree],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 59,
        enemies: [{ oldType: BeetlemorphThree, newType: EaglemorphOne, count: 1 }],
        toActivate: [EaglemorphOne],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 60,
        enemies: [{ oldType: BeetlemorphTwo, newType: Boss6, count: 1 }],
        toActivate: [Boss6],
        pointsRequired: 30,
        isBossCheck: false,
      },
      {
        level: 61,
        enemies: [{ oldType: Boss6, newType: LocustmorphOne, count: 1 }],
        toActivate: [LocustmorphOne],
        pointsRequired: 35,
        isBossCheck: true,
      },
      {
        level: 62,
        enemies: [{ oldType: MantismorphOne, newType: LocustmorphOne, count: 1 },
                  { oldType: EaglemorphOne, newType: LocustmorphTwo, count: 1 }],
        toActivate: [LocustmorphOne, LocustmorphTwo],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 63,
        enemies: [{ oldType: MantismorphOne, newType: LocustmorphThree, count: 1 },
                  { oldType: EaglemorphFour, newType: LocustmorphFour, count: 1 }],
        toActivate: [LocustmorphThree, LocustmorphFour],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 64,
        enemies: [{ oldType: EaglemorphThree, newType: LocustmorphOne, count: 1 }],
        toActivate: [LocustmorphOne],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 65,
        enemies: [{ oldType: EaglemorphOne, newType: LocustmorphOne, count: 1 },
                  { oldType: EaglemorphTwo, newType: LocustmorphTwo, count: 1 }],
        toActivate: [LocustmorphOne, LocustmorphTwo],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 66,
        enemies: [{ oldType: EaglemorphOne, newType: LocustmorphThree, count: 1 },
                  { oldType: EaglemorphThree, newType: LocustmorphFour, count: 1 }],
        toActivate: [LocustmorphThree, LocustmorphFour],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 67,
        enemies: [],
        toActivate: [],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 68,
        enemies: [],
        toActivate: [],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 69,
        enemies: [{ oldType: EaglemorphOne, newType: LocustmorphOne, count: 1 },
                  { oldType: EaglemorphTwo, newType: LocustmorphTwo, count: 1 }],
        toActivate: [LocustmorphOne, LocustmorphTwo],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 70,
        enemies: [{ oldType: EaglemorphOne, newType: Boss7, count: 1 }],
        toActivate: [Boss7],
        pointsRequired: 35,
        isBossCheck: false,
      },
      {
        level: 71,
        enemies: [{ oldType: BeetlemorphOne, newType: SquidmorphOne, count: 1 },
                  { oldType: Boss7, newType: SquidmorphOne, count: 1 }],
        toActivate: [SquidmorphOne, SquidmorphOne],
        pointsRequired: 40,
        isBossCheck: true,
      },
      {
        level: 72,
        enemies: [],
        toActivate: [],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 73,
        enemies: [{ oldType: LocustmorphFour, newType: SquidmorphTwo, count: 1 }],
        toActivate: [SquidmorphTwo],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 74,
        enemies: [{ oldType: LocustmorphThree, newType: SquidmorphTwo, count: 1 }],
        toActivate: [SquidmorphTwo],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 75,
        enemies: [],
        toActivate: [],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 76,
        enemies: [],
        toActivate: [],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 77,
        enemies: [{ oldType: LocustmorphOne, newType: SquidmorphThree, count: 1 },
                  { oldType: LocustmorphTwo, newType: SquidmorphFour, count: 1 }],
        toActivate: [SquidmorphThree, SquidmorphFour],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 78,
        enemies: [],
        toActivate: [],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 79,
        enemies: [],
        toActivate: [],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 80,
        enemies: [{ oldType: LocustmorphTwo, newType: Boss8, count: 1 }],
        toActivate: [Boss8],
        pointsRequired: 40,
        isBossCheck: false,
      },
      {
        level: 81,
        enemies: [{ oldType: BeetlemorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: BeetlemorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: BeetlemorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: RhinomorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: RhinomorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: RhinomorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: RhinomorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: LobstermorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: LobstermorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: LobstermorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: LobstermorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: PhantommorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: PhantommorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: PhantommorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: PhantommorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: MantismorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: MantismorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: MantismorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: MantismorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: EaglemorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: EaglemorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: EaglemorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: EaglemorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: LocustmorphOne, newType: BeetlemorphOne, count: 4 },
          { oldType: LobstermorphTwo, newType: BeetlemorphOne, count: 1 },
          { oldType: LocustmorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: LocustmorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: SquidmorphOne, newType: BeetlemorphOne, count: 2 },
          { oldType: SquidmorphTwo, newType: BeetlemorphOne, count: 2 },
          { oldType: SquidmorphThree, newType: BeetlemorphOne, count: 1 },
          { oldType: SquidmorphFour, newType: BeetlemorphOne, count: 1 },
          { oldType: Boss8, newType: BeetlemorphOne, count: 1 }],
        toActivate: [BeetlemorphOne, BeetlemorphOne, BeetlemorphOne, BeetlemorphOne, BeetlemorphOne, BeetlemorphOne],
        pointsRequired: 45,
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

