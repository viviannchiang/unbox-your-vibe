import type { Axis, Pole, Scene } from "@/lib/types";

// ── The night market: a 20-step branching story quiz ───────────────────────
// Every step measures a FIXED personality axis (the same for everyone), so all
// paths answer exactly 5 of each axis — branching can't unbalance the result.
// Branching is "last-choice": each step has two scene variants, keyed by the
// pole you picked at the previous step, so your last answer reshapes the next
// scene (prompt + answers). Paths re-converge to keep it buildable.

export const TOTAL_STEPS = 20;
export const STORY_ROOT_ID = "s1";

export const INTRO_TEXT =
  "you turn down a lane that wasn't here yesterday and hit a wall of red lanterns, neon, and the smell of charcoal pepper buns and grilled squid. the sign strung between two gates says tonight only.";

export const FINALE_TEXT =
  "the last lane ends at a single stall stacked with gachapon machines and blind boxes, glowing softer than the rest. the auntie behind it looks like she watched your whole night. “mm. i know exactly which one's yours,” she says, sliding a box across the counter with your name on it.";

const AXIS_POLES: Record<Axis, [Pole, Pole]> = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
};

// A variant = the prompt + its two answer labels, in [pole1, pole2] order.
type Variant = { text: string; options: [string, string] };
// A step = its axis + variants keyed by the pole chosen at the previous step
// ("" is the single root step, which has no incoming choice).
type StepDef = { step: number; axis: Axis; variants: Record<string, Variant> };

const STEPS: StepDef[] = [
  {
    step: 1,
    axis: "EI",
    variants: {
      "": {
        text: "the crowd swallows you the second you pass the gates. how do you move through it?",
        options: [
          "you're already chatting up the auntie at the first stall like you've known her for years.",
          "earbuds in (no music), you weave through quietly, just watching.",
        ],
      },
    },
  },
  {
    step: 2,
    axis: "SN",
    variants: {
      E: {
        text: "your new auntie friend points you to the busiest drink stall. “best in the market,” she swears. what do you get?",
        options: [
          "you order your forever drink: classic pearl milk tea, the one that never lets you down.",
          "you point at tonight's mystery special, the one with no name on the board.",
        ],
      },
      I: {
        text: "you drift to a quiet drink stall glowing under one bare bulb. what do you order?",
        options: [
          "your usual bubble tea, exactly the way you always get it.",
          "the weird seasonal brew the vendor won't explain. you're intrigued.",
        ],
      },
    },
  },
  {
    step: 3,
    axis: "TF",
    variants: {
      S: {
        text: "drink in hand, you spot a tiny stray kitten shivering between two stalls, mewing like crazy. what do you do?",
        options: [
          "you scan fast: is it hurt, hungry, stuck? you start sorting it out.",
          "you crouch and just talk to it softly first. comfort now, plan later.",
        ],
      },
      N: {
        text: "halfway through your drink, a tiny stray kitten plops in front of you, mewing like crazy. what do you do?",
        options: [
          "you check it over head to toe, figuring out what it actually needs.",
          "you scoop it close and let it calm down before anything else.",
        ],
      },
    },
  },
  {
    step: 4,
    axis: "JP",
    variants: {
      T: {
        text: "kitten sorted (an auntie takes it in), the market sprawls into a maze of lanes. how do you tackle it?",
        options: [
          "you find the directory board and plan your route, stall by stall.",
          "you pick whichever lane smells the best and just go.",
        ],
      },
      F: {
        text: "the kitten settles and an auntie takes it in. the market sprawls into a maze of lanes. how do you tackle it?",
        options: [
          "you lock in a game plan off the signboard first.",
          "no plan. you follow your nose and let the market lead.",
        ],
      },
    },
  },
  {
    step: 5,
    axis: "EI",
    variants: {
      J: {
        text: "route locked, you round a corner into a crowd packed around a BB-gun balloon stall, everyone hyping the shooter. what do you do?",
        options: [
          "you elbow in, grab a rifle, and call your shot to the whole crowd.",
          "you watch from the back, fully invested, zero need to join.",
        ],
      },
      P: {
        text: "wandering wherever, you bump into a crowd around a BB-gun balloon stall, everyone hyping the shooter. what do you do?",
        options: [
          "you're up next before you've even decided, talking trash already.",
          "you hang at the edge and enjoy the chaos from a safe spot.",
        ],
      },
    },
  },
  {
    step: 6,
    axis: "SN",
    variants: {
      E: {
        text: "all that hyping made you starving, and you hit the food gauntlet: charcoal pepper buns, chicken cutlets bigger than your face, sizzling oyster omelets. what do you order?",
        options: [
          "your ride-or-die: the pepper bun you already know is perfect. no risks.",
          "something you've never tried, just to see. “one of whatever that is.”",
        ],
      },
      I: {
        text: "you slip to a calmer food lane lined with the classics: oyster omelet, taiwanese hot dog, stinky tofu. what do you order?",
        options: [
          "your comfort order, the oyster omelet you get every single time. it never misses.",
          "the unlabeled special you can't identify. curiosity wins tonight.",
        ],
      },
    },
  },
  {
    step: 7,
    axis: "TF",
    variants: {
      S: {
        text: "past the food, a little shrine glows with a fortune-stick stall. “i only tell it true,” the reader says. what do you ask for?",
        options: [
          "the honest reading. give you the facts, even the unflattering ones.",
          "the kind version. you're a little tender tonight and you know it.",
        ],
      },
      N: {
        text: "a tiny shrine glows at the edge of the lane, fortune sticks rattling in a cup. “i only tell it true,” the reader says. what do you ask for?",
        options: [
          "the real reading, no softening. accuracy over comfort.",
          "the gentle one. go easy on you tonight.",
        ],
      },
    },
  },
  {
    step: 8,
    axis: "JP",
    variants: {
      T: {
        text: "the sticks rattle out an answer. across the market, a glove puppet show starts in ten minutes, one show only. what do you do?",
        options: [
          "you reorganize your whole route to catch it. main event, non-negotiable.",
          "if you drift over in time, great. if not, also great.",
        ],
      },
      F: {
        text: "the reader sends you off with a soft smile. a puppet show starts across the market in ten minutes, one show only. what do you do?",
        options: [
          "you lock in a plan and make sure you're there early.",
          "you'll go if the night carries you that way.",
        ],
      },
    },
  },
  {
    step: 9,
    axis: "EI",
    variants: {
      J: {
        text: "show handled, you need a seat for your pepper bun and bubble tea, and a family at a packed plastic table waves you to squeeze in. what do you do?",
        options: [
          "you sit right down and you're deep in conversation before you've taken a bite.",
          "you thank them, smile, and find your own quiet stool around the corner.",
        ],
      },
      P: {
        text: "you need a seat for your food, and a family at a packed plastic table waves you to squeeze in. what do you do?",
        options: [
          "you join instantly. strangers become dinner friends, easy.",
          "you wave warmly but go find your own little spot.",
        ],
      },
    },
  },
  {
    step: 10,
    axis: "SN",
    variants: {
      E: {
        text: "your table-mates ask where you're headed next, ready to point the way. what do you tell them?",
        options: [
          "“just tell me which lane has the good stuff and how to get there.”",
          "“wherever feels lucky.” they laugh and send you somewhere with no name.",
        ],
      },
      I: {
        text: "a vendor catches you squinting at the lanes and offers directions. what do you tell them?",
        options: [
          "“a real route, please. which way, how far, what's there.”",
          "“surprise me.” he points you down a lane he won't describe.",
        ],
      },
    },
  },
  {
    step: 11,
    axis: "TF",
    variants: {
      S: {
        text: "you reach a wall of claw machines and spot the last good prize, just as another wanderer reaches for the same one. what do you do?",
        options: [
          "you call it fair: “best of three? loser buys the winner a drink.”",
          "you wave them ahead. they lit up at that prize, let them have it.",
        ],
      },
      N: {
        text: "at a ring-toss stall, you and another wanderer eye the last big prize at the same second. what do you do?",
        options: [
          "you settle it cleanly: “one throw each, best ring wins.”",
          "you step back and let them go for it. they wanted it more.",
        ],
      },
    },
  },
  {
    step: 12,
    axis: "JP",
    variants: {
      T: {
        text: "win or lose, you notice vendors starting to pack up. the market closes soon and your list isn't done. what do you do?",
        options: [
          "you speedrun your must-sees in order. no loose ends before close.",
          "you ditch the list and chase whatever lane's still buzzing.",
        ],
      },
      F: {
        text: "the prize sorted, you notice shutters coming down. the market closes soon and there's still so much. what do you do?",
        options: [
          "you make a quick plan to hit the rest before it all shuts.",
          "you let the plan go and follow whatever's still glowing.",
        ],
      },
    },
  },
  {
    step: 13,
    axis: "EI",
    variants: {
      J: {
        text: "checking off your list, you hit a fork: a loud KTV booth blasting karaoke, and a quiet douhua stall with warm tofu pudding. which way?",
        options: [
          "KTV. you've already got a chaotic song queued in your head.",
          "the douhua stall. a warm bowl and a quiet stool sound perfect.",
        ],
      },
      P: {
        text: "vibes lead you to a fork: a loud KTV booth blasting karaoke, and a quiet douhua stall with warm tofu pudding. which way?",
        options: [
          "the karaoke booth, obviously. you're walking in mid-song.",
          "the douhua stall. you need a soft, quiet minute.",
        ],
      },
    },
  },
  {
    step: 14,
    axis: "SN",
    variants: {
      E: {
        text: "buzzing, you pass a stall of little keepsakes and a temple amulet cart. “take one, to remember tonight,” the vendor says. which do you pick?",
        options: [
          "something you'll actually use. a real, practical little thing.",
          "a 平安符 charm “for safe travels.” useless maybe, but it means something.",
        ],
      },
      I: {
        text: "you pass a stall of little keepsakes and a temple amulet cart. “take one,” the vendor says softly, “to remember.” which do you pick?",
        options: [
          "the practical pick. you like a keepsake that earns its spot in your bag.",
          "the little charm with a meaning. it'll wreck you (lovingly) in five years.",
        ],
      },
    },
  },
  {
    step: 15,
    axis: "TF",
    variants: {
      S: {
        text: "keepsake pocketed, a wanderer flops onto the stool beside you, spiraling about a huge life decision. “what would you do?” what do you say?",
        options: [
          "you help them map it: pros, cons, what actually makes sense.",
          "you ask the real one: “which choice makes you feel the most like you?”",
        ],
      },
      N: {
        text: "charm in hand, a wanderer drops next to you mid-spiral about a big life choice. “seriously, what would you do?” what do you say?",
        options: [
          "you break it down logically, step by step, no drama.",
          "you skip the logic: “forget smart, which one feels right?”",
        ],
      },
    },
  },
  {
    step: 16,
    axis: "JP",
    variants: {
      T: {
        text: "advice delivered (they're obsessed with you now), a market auntie waves you over. “last lap, kid. i show you around, or you go your own way?”",
        options: [
          "“show me around.” best of what's left, in order, no time wasted.",
          "“i'll wander.” you'll feel your way to the good stuff.",
        ],
      },
      F: {
        text: "the wanderer hugs you and floats off. a market auntie waves you over. “last lap, kid. i show you around, or you go your own way?”",
        options: [
          "“lead the way.” you like a clean, guided finish.",
          "“i'll roam.” wandering is the whole point for you.",
        ],
      },
    },
  },
  {
    step: 17,
    axis: "EI",
    variants: {
      J: {
        text: "the good kind of tired sinks in, battery low, but the market's not done with you. how do you get your second wind?",
        options: [
          "you head back toward the noise. people are how you recharge.",
          "you duck into a quiet corner. five minutes alone and you're reborn.",
        ],
      },
      P: {
        text: "somewhere mid-wander the tiredness lands, the good kind, but it's not over. how do you get your second wind?",
        options: [
          "back into the crowd. the buzz refuels you instantly.",
          "off to a still corner. solitude resets you every time.",
        ],
      },
    },
  },
  {
    step: 18,
    axis: "SN",
    variants: {
      E: {
        text: "recharged by the crowd, you lean back against a railing and look up past the neon. what catches you?",
        options: [
          "the scene itself: red lanterns, steam, the real glow of right now.",
          "your brain drifts: what's past all this, what does any of it mean.",
        ],
      },
      I: {
        text: "settled and quiet, you lean against a railing and look up past the neon. what catches you?",
        options: [
          "the actual details: lanterns swaying, the sky barely showing, this exact moment.",
          "you float off into what-ifs and whole other worlds.",
        ],
      },
    },
  },
  {
    step: 19,
    axis: "TF",
    variants: {
      S: {
        text: "heading for the exit, a wanderer ahead of you trips and their whole tray of food goes flying: chicken cutlet, mango shaved ice, the works. what do you do?",
        options: [
          "you're already on it: napkins out, salvaging what you can, sorting the mess.",
          "first thing out of your mouth: “omg are you okay, forget the food.”",
        ],
      },
      N: {
        text: "still drifting in your thoughts, you almost collide with a wanderer whose mango shaved ice just hit the ground. what do you do?",
        options: [
          "instinct kicks in. you clean it up and get them sorted fast.",
          "you check on them first: “hey, you good? don't even worry about it.”",
        ],
      },
    },
  },
  {
    step: 20,
    axis: "JP",
    variants: {
      T: {
        text: "mess handled, you feel it: the night's ending. one quiet lane glows at the very back. how do you end it?",
        options: [
          "you tie it up neat: one last loop to close the night exactly right.",
          "you leave it open and follow that last glow wherever it goes.",
        ],
      },
      F: {
        text: "the wanderer thanks you, a little teary. the night's ending, and one quiet lane glows at the back. how do you end it?",
        options: [
          "you end it clean and intentional, no loose threads.",
          "no plan. you drift toward the glow and let it decide.",
        ],
      },
    },
  },
];

function buildScenes(steps: StepDef[]): Record<string, Scene> {
  const scenes: Record<string, Scene> = {};
  for (const def of steps) {
    const [p1, p2] = AXIS_POLES[def.axis];
    for (const [key, v] of Object.entries(def.variants)) {
      const id = def.step === 1 ? STORY_ROOT_ID : `s${def.step}_${key}`;
      // A choice for pole P routes to the next step's variant keyed by P.
      const nextFor = (pole: Pole): string | null =>
        def.step < TOTAL_STEPS ? `s${def.step + 1}_${pole}` : null;
      scenes[id] = {
        id,
        step: def.step,
        axis: def.axis,
        text: v.text,
        cards: [
          { id: `${id}_${p1}`, label: v.options[0], pole: p1, next: nextFor(p1) },
          { id: `${id}_${p2}`, label: v.options[1], pole: p2, next: nextFor(p2) },
        ],
      };
    }
  }
  return scenes;
}

export const SCENES = buildScenes(STEPS);
