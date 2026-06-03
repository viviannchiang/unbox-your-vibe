// Auto-ported from the former Python backend (questions.json).
// Includes per-card scores used for in-browser scoring; stripped before reaching quiz UI.
//
// 20 questions, 5 per axis (EI, SN, TF, JP). Five is odd on purpose: a per-axis
// tie is impossible, so every result is decisive without relying on a default.

export interface ScoredCard {
  id: string;
  label: string;
  scores: Record<string, number>;
}

export interface ScoredQuestion {
  id: string;
  text: string;
  axis: "EI" | "SN" | "TF" | "JP";
  cards: ScoredCard[];
}

export const QUESTIONS: ScoredQuestion[] = [
  // ── E / I ──────────────────────────────────────────────
  {
    "id": "q1",
    "text": "you just found an amazing new café. what do you do?",
    "axis": "EI",
    "cards": [
      { "id": "q1_a", "label": "immediately text the group chat with the pin", "scores": { "E": 1 } },
      { "id": "q1_b", "label": "go back alone three times before telling anyone", "scores": { "I": 1 } }
    ]
  },
  {
    "id": "q2",
    "text": "it's saturday and you have zero plans. dream scenario?",
    "axis": "EI",
    "cards": [
      { "id": "q2_a", "label": "someone texts 'come over' and suddenly it's a whole thing", "scores": { "E": 1 } },
      { "id": "q2_b", "label": "literally no one contacts you for 12 hours straight", "scores": { "I": 1 } }
    ]
  },
  {
    "id": "q3",
    "text": "you're at a party and the vibe is mid. you:",
    "axis": "EI",
    "cards": [
      { "id": "q3_a", "label": "become the vibe. someone has to.", "scores": { "E": 1 } },
      { "id": "q3_b", "label": "find the pet or the bookshelf and camp there", "scores": { "I": 1 } }
    ]
  },
  {
    "id": "q4",
    "text": "you walk into a room full of strangers. you:",
    "axis": "EI",
    "cards": [
      { "id": "q4_a", "label": "start a conversation before you've even taken your coat off", "scores": { "E": 1 } },
      { "id": "q4_b", "label": "find the one person hovering by the snacks and stick with them", "scores": { "I": 1 } }
    ]
  },
  {
    "id": "q5",
    "text": "after a long, draining day, you recharge by:",
    "axis": "EI",
    "cards": [
      { "id": "q5_a", "label": "calling someone and talking through every detail", "scores": { "E": 1 } },
      { "id": "q5_b", "label": "going fully offline and decompressing completely alone", "scores": { "I": 1 } }
    ]
  },

  // ── S / N ──────────────────────────────────────────────
  {
    "id": "q6",
    "text": "you're decorating your shelf. what matters more?",
    "axis": "SN",
    "cards": [
      { "id": "q6_a", "label": "the pieces themselves — the colors, textures, how each one looks", "scores": { "S": 1 } },
      { "id": "q6_b", "label": "the feeling it gives off — it should capture a whole mood", "scores": { "N": 1 } }
    ]
  },
  {
    "id": "q7",
    "text": "someone asks what you want to eat. you say:",
    "axis": "SN",
    "cards": [
      { "id": "q7_a", "label": "that one place with the really good spicy noodles", "scores": { "S": 1 } },
      { "id": "q7_b", "label": "hmm something cozy? like... autumn energy?", "scores": { "N": 1 } }
    ]
  },
  {
    "id": "q8",
    "text": "you're scrolling for a new show. what hooks you?",
    "axis": "SN",
    "cards": [
      { "id": "q8_a", "label": "good reviews, strong cast, genre I already like", "scores": { "S": 1 } },
      { "id": "q8_b", "label": "weird premise I've never seen before, no idea what it's about", "scores": { "N": 1 } }
    ]
  },
  {
    "id": "q9",
    "text": "you're explaining an idea to someone. you:",
    "axis": "SN",
    "cards": [
      { "id": "q9_a", "label": "walk them through it with concrete, step-by-step examples", "scores": { "S": 1 } },
      { "id": "q9_b", "label": "start with the big picture and let the details catch up", "scores": { "N": 1 } }
    ]
  },
  {
    "id": "q10",
    "text": "the conversations you love most are about:",
    "axis": "SN",
    "cards": [
      { "id": "q10_a", "label": "real things actually happening — people, plans, life", "scores": { "S": 1 } },
      { "id": "q10_b", "label": "what-ifs, theories, and 'okay but imagine if...'", "scores": { "N": 1 } }
    ]
  },

  // ── T / F ──────────────────────────────────────────────
  {
    "id": "q11",
    "text": "your friend is stressed about a big decision. you:",
    "axis": "TF",
    "cards": [
      { "id": "q11_a", "label": "help them make a pros and cons list", "scores": { "T": 1 } },
      { "id": "q11_b", "label": "ask them which option feels right in their gut", "scores": { "F": 1 } }
    ]
  },
  {
    "id": "q12",
    "text": "you're watching a show and the main character makes a terrible decision. you:",
    "axis": "TF",
    "cards": [
      { "id": "q12_a", "label": "pause and explain to the room why that was objectively dumb", "scores": { "T": 1 } },
      { "id": "q12_b", "label": "feel physically stressed on their behalf", "scores": { "F": 1 } }
    ]
  },
  {
    "id": "q13",
    "text": "someone gives you feedback on something you worked hard on. first instinct:",
    "axis": "TF",
    "cards": [
      { "id": "q13_a", "label": "okay, what specifically can I fix?", "scores": { "T": 1 } },
      { "id": "q13_b", "label": "cool I will now think about this for three days", "scores": { "F": 1 } }
    ]
  },
  {
    "id": "q14",
    "text": "you're making a hard decision. what wins?",
    "axis": "TF",
    "cards": [
      { "id": "q14_a", "label": "the logical answer, even if it ruffles some feathers", "scores": { "T": 1 } },
      { "id": "q14_b", "label": "the option that keeps everyone okay", "scores": { "F": 1 } }
    ]
  },
  {
    "id": "q15",
    "text": "a friend is venting about a problem. your instinct:",
    "axis": "TF",
    "cards": [
      { "id": "q15_a", "label": "start offering solutions right away", "scores": { "T": 1 } },
      { "id": "q15_b", "label": "just listen and make sure they feel heard first", "scores": { "F": 1 } }
    ]
  },

  // ── J / P ──────────────────────────────────────────────
  {
    "id": "q16",
    "text": "your phone's home screen:",
    "axis": "JP",
    "cards": [
      { "id": "q16_a", "label": "folders with labels. wallpaper matches the case.", "scores": { "J": 1 } },
      { "id": "q16_b", "label": "three pages of apps in no order. you use search.", "scores": { "P": 1 } }
    ]
  },
  {
    "id": "q17",
    "text": "trip packing style:",
    "axis": "JP",
    "cards": [
      { "id": "q17_a", "label": "checklist, rolled clothes, everything fits perfectly", "scores": { "J": 1 } },
      { "id": "q17_b", "label": "throw things in last minute. somehow it works.", "scores": { "P": 1 } }
    ]
  },
  {
    "id": "q18",
    "text": "you're working on a project. your process:",
    "axis": "JP",
    "cards": [
      { "id": "q18_a", "label": "outline first, then fill in each section in order", "scores": { "J": 1 } },
      { "id": "q18_b", "label": "start wherever feels exciting, connect the dots later", "scores": { "P": 1 } }
    ]
  },
  {
    "id": "q19",
    "text": "your ideal day runs on:",
    "axis": "JP",
    "cards": [
      { "id": "q19_a", "label": "a plan you can actually follow", "scores": { "J": 1 } },
      { "id": "q19_b", "label": "a loose idea and lots of room to wander", "scores": { "P": 1 } }
    ]
  },
  {
    "id": "q20",
    "text": "a deadline's coming up. you:",
    "axis": "JP",
    "cards": [
      { "id": "q20_a", "label": "finish early so it's off your mind", "scores": { "J": 1 } },
      { "id": "q20_b", "label": "lock in and do your best work in the final stretch", "scores": { "P": 1 } }
    ]
  }
];
