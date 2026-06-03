import type { PersonalityResult } from "@/lib/types";

// Auto-ported from the former Python backend (personalities.json).
// Keyed by internal type code. Never surfaced in the UI — only the figures are shown.
export const PERSONALITIES: Record<string, PersonalityResult> = {
  "INFP": {
    "typeCode": "INFP",
    "character": "Nyota",
    "figureName": "Cloudwatcher",
    "series": "I Am the Seasons",
    "tagline": "you built an entire universe in your head and honestly it's better than this one",
    "description": "you're the type to cry at a commercial and then pretend it didn't happen. your inner world is so rich that reality feels like a slight downgrade — and you're quiet not because you have nothing to say, but because you have too much.",
    "vibeWords": [
      "emotionally fluent",
      "daydream addict",
      "0 to sobbing real quick",
      "lowkey poet",
      "values-coded",
      "soft but feral"
    ],
    "thisIsYou": [
      "your playlists have lore",
      "you've rewritten a text four times and then didn't send it",
      "you feel things so deeply that a good sunset can ruin your whole evening",
      "'I'm fine' is doing a lot of heavy lifting in your vocabulary",
      "you root for the side character in every movie",
      "you have a notes app full of thoughts you'll never show anyone"
    ],
    "groupChatVibe": "the one who drops something devastatingly profound at 1am and then disappears",
    "compatibleWith": [
      {
        "type": "INFJ",
        "character": "Nyota",
        "figure": "Sanctuary Star"
      },
      {
        "type": "ENFJ",
        "character": "Nyota",
        "figure": "Life-bearing Star"
      },
      {
        "type": "ISFP",
        "character": "Nyota",
        "figure": "Hidden in Autumn"
      }
    ],
    "color": "#B8C6E8",
    "image": "/images/figures/cloudwatcher.png"
  },
  "INFJ": {
    "typeCode": "INFJ",
    "character": "Nyota",
    "figureName": "Sanctuary Star",
    "series": "We Are All Stars",
    "tagline": "you knew what everyone needed before they said it and honestly that's a little terrifying",
    "description": "you're the friend people come to when they need to be understood, not fixed. you read people like open books and absorb their emotions, then wonder why you're so tired. small circle, meaningful work, lots of silence — that's the dream.",
    "vibeWords": [
      "empath supreme",
      "human lie detector",
      "low social battery",
      "deep convos only",
      "old soul",
      "quietly intense"
    ],
    "thisIsYou": [
      "people tell you their secrets within twenty minutes. you didn't ask.",
      "you have a vision for the group project and will quietly redo it at 1am",
      "your ideal friday night is 'plans got cancelled'",
      "you've had a full emotional arc about something that hasn't happened yet",
      "'I'm not mad, I'm disappointed' is your most devastating weapon",
      "you need alone time like you need oxygen"
    ],
    "groupChatVibe": "the therapist friend who holds everyone together but privately wonders if anyone notices",
    "compatibleWith": [
      {
        "type": "INFP",
        "character": "Nyota",
        "figure": "Cloudwatcher"
      },
      {
        "type": "ISFJ",
        "character": "Nyota",
        "figure": "Snowfall Bliss"
      },
      {
        "type": "ENFJ",
        "character": "Nyota",
        "figure": "Life-bearing Star"
      }
    ],
    "color": "#B8C6E8",
    "image": "/images/figures/sanctuary-star.png"
  },
  "ISFP": {
    "typeCode": "ISFP",
    "character": "Nyota",
    "figureName": "Hidden in Autumn",
    "series": "I Am the Seasons",
    "tagline": "still waters run deep and yours have a whole coral reef down there",
    "description": "you experience the world through texture and mood — you'll stop walking just to watch the light hit a building. your taste is specific, your feelings are intense, and you're gentle with the people you let in. you don't follow trends; trends occasionally follow you.",
    "vibeWords": [
      "aesthetic-coded",
      "soft-spoken menace",
      "feels in color",
      "pinterest brain",
      "quietly iconic",
      "vibe curator"
    ],
    "thisIsYou": [
      "your spotify is a mood board and it shifts daily",
      "you notice details nobody else catches",
      "you'd rather show love through a playlist than say it out loud",
      "you avoid conflict until you can't and then it's volcanic",
      "your aesthetic is very intentional but you'll never admit how long it took",
      "you feel everything but process it through art, not words"
    ],
    "groupChatVibe": "the quiet creative who surprises everyone with how intensely they feel about things",
    "compatibleWith": [
      {
        "type": "INFP",
        "character": "Nyota",
        "figure": "Cloudwatcher"
      },
      {
        "type": "ISTP",
        "character": "Hirono",
        "figure": "Ragpicker"
      },
      {
        "type": "INFJ",
        "character": "Nyota",
        "figure": "Sanctuary Star"
      }
    ],
    "color": "#B8C6E8",
    "image": "/images/figures/hidden-in-autumn.png"
  },
  "ISFJ": {
    "typeCode": "ISFJ",
    "character": "Nyota",
    "figureName": "Snowfall Bliss",
    "series": "I Am the Seasons",
    "tagline": "you love quietly and that's what makes it hit so hard",
    "description": "you remember how someone takes their coffee three months after they mentioned it once. you show up, you follow through, and you never ask for credit. you hold everything together for everyone and ask for almost nothing back.",
    "vibeWords": [
      "mom friend",
      "remembers everything",
      "acts of service",
      "quietly reliable",
      "'too nice', allegedly",
      "comfort personified"
    ],
    "thisIsYou": [
      "you remember the small things nobody else notices",
      "you've been told 'you're too nice' and you didn't know what to do with that",
      "your comfort zone is cozy and you've decorated it beautifully",
      "you'd rather keep the peace than win the argument",
      "you've done something really thoughtful and then downplayed it immediately",
      "change is hard but you adapt. you just need a minute."
    ],
    "groupChatVibe": "the one who shows up with soup when you're sick without you having to ask",
    "compatibleWith": [
      {
        "type": "INFJ",
        "character": "Nyota",
        "figure": "Sanctuary Star"
      },
      {
        "type": "ESFJ",
        "character": "Lulu",
        "figure": "Tea Break"
      },
      {
        "type": "ISTP",
        "character": "Hirono",
        "figure": "Ragpicker"
      }
    ],
    "color": "#B8C6E8",
    "image": "/images/figures/snowfall-bliss.png"
  },
  "INTJ": {
    "typeCode": "INTJ",
    "character": "Hirono",
    "figureName": "Insight",
    "series": "City of Mercy",
    "tagline": "you saw the outcome three steps ago and you're just waiting for everyone to catch up",
    "description": "you operate on a different processing speed and you've made peace with it. you don't need validation — just competence, efficiency, and for people to stop scheduling meetings that could've been emails. your brain runs background simulations and you're right annoyingly often.",
    "vibeWords": [
      "3 steps ahead",
      "competence connoisseur",
      "small-talk allergy",
      "master-plan energy",
      "resting strategist face",
      "emotionally... efficient"
    ],
    "thisIsYou": [
      "you've already planned your exit before you walk into a party",
      "'I told you so' is your most-used internal monologue",
      "you respect competence and nothing else",
      "your resting face has been mistaken for anger. it's just thinking.",
      "you'd rather do the whole project alone than explain your vision twice",
      "small talk is violence"
    ],
    "groupChatVibe": "the strategic mastermind who rarely speaks but when they do, everyone listens",
    "compatibleWith": [
      {
        "type": "INTP",
        "character": "Hirono",
        "figure": "Echo"
      },
      {
        "type": "ENTJ",
        "character": "Hirono",
        "figure": "Protector"
      },
      {
        "type": "ISTP",
        "character": "Hirono",
        "figure": "Ragpicker"
      }
    ],
    "color": "#7A9E9F",
    "image": "/images/figures/insight.png"
  },
  "INTP": {
    "typeCode": "INTP",
    "character": "Hirono",
    "figureName": "Echo",
    "series": "City of Mercy",
    "tagline": "your brain has 200 tabs open and none of them are social skills",
    "description": "you live inside your own head and it's a genuinely fascinating place. you connect ideas that have no business being together and make it make sense — explaining it out loud is the hard part. you're not antisocial, just busy wondering if time is a flat circle.",
    "vibeWords": [
      "200 tabs open",
      "theory generator",
      "wikipedia rabbit holes",
      "forgot to eat again",
      "logic gremlin",
      "unbothered overthinker"
    ],
    "thisIsYou": [
      "you've gone down a wikipedia rabbit hole and emerged four hours later knowing everything about medieval siege weapons",
      "you answer simple questions with complicated answers",
      "your idea of small talk is 'so what's your theory on consciousness?'",
      "you forgot to eat because you were thinking about something",
      "you've solved the problem in your head but explaining it out loud is a whole separate problem",
      "'that's an interesting question' means you're about to disappear for three days"
    ],
    "groupChatVibe": "the one everyone texts when they need to settle a random debate at 2am",
    "compatibleWith": [
      {
        "type": "INTJ",
        "character": "Hirono",
        "figure": "Insight"
      },
      {
        "type": "ENTP",
        "character": "Hirono",
        "figure": "Manacle"
      },
      {
        "type": "ISTP",
        "character": "Hirono",
        "figure": "Ragpicker"
      }
    ],
    "color": "#7A9E9F",
    "image": "/images/figures/echo.png"
  },
  "ENTJ": {
    "typeCode": "ENTJ",
    "character": "Hirono",
    "figureName": "Protector",
    "series": "Little Mischief",
    "tagline": "you didn't come here to participate, you came here to lead",
    "description": "you see inefficiency the way others see a crooked picture frame — it bugs you until it's fixed. you walk into chaos and start organizing it unasked, and somehow everyone just lets you, because you're usually right. you set the vision and expect people to keep up.",
    "vibeWords": [
      "born to lead",
      "five-year-plan haver",
      "efficiency obsessed",
      "delegates like a general",
      "no chill, all results",
      "crooked-frame energy"
    ],
    "thisIsYou": [
      "you have a five-year plan and a backup five-year plan",
      "you've reorganized someone else's workflow without being asked",
      "'efficient' is the highest compliment you can give",
      "you delegate like a general and somehow people thank you for it",
      "your to-do list has sub-lists and those sub-lists have priorities",
      "quitting is not in your vocabulary. pivoting, however, is."
    ],
    "groupChatVibe": "the CEO friend who books the restaurant, orders for the table, and handles the bill split",
    "compatibleWith": [
      {
        "type": "ESTJ",
        "character": "Lulu",
        "figure": "Survival Coffee"
      },
      {
        "type": "ENTP",
        "character": "Hirono",
        "figure": "Manacle"
      },
      {
        "type": "INTJ",
        "character": "Hirono",
        "figure": "Insight"
      }
    ],
    "color": "#7A9E9F",
    "image": "/images/figures/protector.png"
  },
  "ISTP": {
    "typeCode": "ISTP",
    "character": "Hirono",
    "figureName": "Ragpicker",
    "series": "Little Mischief",
    "tagline": "you fixed it, you won't explain how, and you'd like to be alone now",
    "description": "you're the most quietly capable person in any room and you have zero interest in proving it. you learn by doing, solve problems by taking things apart, and let your actions do the talking. people underestimate you exactly once.",
    "vibeWords": [
      "fixes everything",
      "low-key genius",
      "actions > words",
      "needs 12 hrs alone",
      "unbothered",
      "mysteriously competent"
    ],
    "thisIsYou": [
      "you can build, fix, or disassemble basically anything",
      "you show love by solving problems, not talking about feelings",
      "your face gives nothing away and you like it that way",
      "you need approximately twelve hours of alone time per day",
      "you said 'I'll figure it out' and then actually did",
      "commitment to plans gives you hives. commitment to skills does not."
    ],
    "groupChatVibe": "the mysteriously competent one who disappears for weeks and comes back with a new skill",
    "compatibleWith": [
      {
        "type": "INTP",
        "character": "Hirono",
        "figure": "Echo"
      },
      {
        "type": "ESTP",
        "character": "Lulu",
        "figure": "The Greatest Magician"
      },
      {
        "type": "ISFP",
        "character": "Nyota",
        "figure": "Hidden in Autumn"
      }
    ],
    "color": "#7A9E9F",
    "image": "/images/figures/ragpicker.png"
  },
  "ENFP": {
    "typeCode": "ENFP",
    "character": "Lulu",
    "figureName": "Folk Singer",
    "series": "My Sweet Farm Garden",
    "tagline": "you love so hard it's basically a cardio workout",
    "description": "your enthusiasm is genuinely a superpower — you make people feel like the most interesting person in the room and generate ideas faster than you can execute them. you've never met a stranger, just a friend you haven't vibed with yet.",
    "vibeWords": [
      "chaotic good",
      "new hobby weekly",
      "never met a stranger",
      "idea machine",
      "2am genius ideas",
      "contagiously hyped"
    ],
    "thisIsYou": [
      "you have a new passion every week and each one is 'the one'",
      "strangers become your best friend in ten minutes flat",
      "your notes app is a graveyard of genius 2am ideas",
      "'spontaneous' is your love language",
      "you've over-committed to five things and somehow showed up to all of them",
      "your energy is contagious and honestly exhausting"
    ],
    "groupChatVibe": "the one who starts the spontaneous road trip at 11pm and somehow convinces everyone to go",
    "compatibleWith": [
      {
        "type": "ENFJ",
        "character": "Nyota",
        "figure": "Life-bearing Star"
      },
      {
        "type": "INFP",
        "character": "Nyota",
        "figure": "Cloudwatcher"
      },
      {
        "type": "ESFP",
        "character": "Lulu",
        "figure": "Serving Time"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/folk-singer.png"
  },
  "ENTP": {
    "typeCode": "ENTP",
    "character": "Hirono",
    "figureName": "Manacle",
    "series": "Little Mischief",
    "tagline": "you didn't start the argument but you will absolutely finish it",
    "description": "your brain is a debate stage and every conversation is an opportunity. you're not difficult — you're chasing the most interesting version of the truth, even if that means poking holes in what everyone else accepts. you make the group smarter by being annoying in exactly the right way.",
    "vibeWords": [
      "devil's advocate",
      "argues for sport",
      "...unless?",
      "idea ping-pong",
      "lovable menace",
      "surgical roasting"
    ],
    "thisIsYou": [
      "you've played devil's advocate so hard you changed your own mind",
      "your browser has 47 tabs open and you know what's in each one. mostly.",
      "someone says 'that's impossible' and your brain goes '...unless?'",
      "you've been called 'a lot' and took it as a compliment",
      "you can connect any two topics in three steps or fewer",
      "your love language is roasting people with surgical precision"
    ],
    "groupChatVibe": "the one who turns a chill hangout into a two-hour debate and somehow no one is mad",
    "compatibleWith": [
      {
        "type": "ENTJ",
        "character": "Hirono",
        "figure": "Protector"
      },
      {
        "type": "ENFP",
        "character": "Lulu",
        "figure": "Folk Singer"
      },
      {
        "type": "INTJ",
        "character": "Hirono",
        "figure": "Insight"
      }
    ],
    "color": "#7A9E9F",
    "image": "/images/figures/manacle.png"
  },
  "ENFJ": {
    "typeCode": "ENFJ",
    "character": "Nyota",
    "figureName": "Life-bearing Star",
    "series": "We Are All Stars",
    "tagline": "you'd give someone your jacket and somehow convince them it was their idea",
    "description": "you run on empathy and organizational skills in equal measure. you check in before anyone asks, coordinate the group without making it feel like work, and always know the right thing to say. the only thing you're bad at is taking your own advice.",
    "vibeWords": [
      "mom friend deluxe",
      "reads the room instantly",
      "pep-talk pro",
      "color-coded calendar",
      "everyone's therapist",
      "won't take own advice"
    ],
    "thisIsYou": [
      "you check in on people before they even realize they're struggling",
      "group projects run through you whether you asked for it or not",
      "you give the best pep talks but won't take your own advice",
      "your calendar is color-coded for other people's deadlines",
      "you can read a room faster than anyone and adjust immediately",
      "'let me know if you need anything' and you genuinely mean it every time"
    ],
    "groupChatVibe": "the mom friend who somehow also has the best social life",
    "compatibleWith": [
      {
        "type": "ENFP",
        "character": "Lulu",
        "figure": "Folk Singer"
      },
      {
        "type": "INFJ",
        "character": "Nyota",
        "figure": "Sanctuary Star"
      },
      {
        "type": "ESFJ",
        "character": "Lulu",
        "figure": "Tea Break"
      }
    ],
    "color": "#B8C6E8",
    "image": "/images/figures/life-bearing-star.png"
  },
  "ESTP": {
    "typeCode": "ESTP",
    "character": "Lulu",
    "figureName": "The Greatest Magician",
    "series": "Magician",
    "tagline": "you'd rather figure it out in real time than read the instructions",
    "description": "you learn by doing, decide by moving, and would rather ask forgiveness than permission. first to say yes to something risky, last to regret it. your whole process is 'how hard could it be?' — and somehow it works out more than it should.",
    "vibeWords": [
      "how hard could it be",
      "adrenaline-coded",
      "act now, think later",
      "duct-tape solutions",
      "zero hesitation",
      "main character irl"
    ],
    "thisIsYou": [
      "you've fixed something with duct tape and it's still holding",
      "your decision-making process is 'how hard could it be?'",
      "you're the first one to volunteer and the last one to overthink it",
      "sitting still is a challenge. sitting still in a meeting is torture.",
      "you learn by doing and the bruises were worth it",
      "risk assessment? you assess risks by taking them"
    ],
    "groupChatVibe": "the one who says 'watch this' and somehow doesn't end up in the ER",
    "compatibleWith": [
      {
        "type": "ESFP",
        "character": "Lulu",
        "figure": "Serving Time"
      },
      {
        "type": "ESTJ",
        "character": "Lulu",
        "figure": "Survival Coffee"
      },
      {
        "type": "ENTP",
        "character": "Hirono",
        "figure": "Manacle"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/the-greatest-magician.png"
  },
  "ESFJ": {
    "typeCode": "ESFJ",
    "character": "Lulu",
    "figureName": "Tea Break",
    "series": "Office",
    "tagline": "you packed extra snacks because you knew someone would forget theirs",
    "description": "you are the social infrastructure — without you the group fragments into six smaller groups that never hang out. you plan, host, and check in because you genuinely want to. your superpower is making people feel seen; your kryptonite is feeling unappreciated.",
    "vibeWords": [
      "the glue",
      "remembers your order",
      "professional host",
      "'just checking in!'",
      "needs to be needed",
      "google-docs warlord"
    ],
    "thisIsYou": [
      "you remember everyone's birthdays, allergies, and drink orders",
      "you've hosted a gathering and cleaned up before anyone offered to help",
      "'just checking in!' is your signature text",
      "you hold the friend group together with sheer willpower and google docs",
      "you need to be needed and you're not even sorry about it",
      "you take 'how was your day' very seriously"
    ],
    "groupChatVibe": "the glue. literally the glue. if you left, three subgroups would never speak again.",
    "compatibleWith": [
      {
        "type": "ENFJ",
        "character": "Nyota",
        "figure": "Life-bearing Star"
      },
      {
        "type": "ISFJ",
        "character": "Nyota",
        "figure": "Snowfall Bliss"
      },
      {
        "type": "ESFP",
        "character": "Lulu",
        "figure": "Serving Time"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/tea-break.png"
  },
  "ESFP": {
    "typeCode": "ESFP",
    "character": "Lulu",
    "figureName": "Serving Time",
    "series": "Pigchelin Restaurant",
    "tagline": "you are the main character and everyone else is fine with it",
    "description": "you don't walk into a room — you arrive. you bring the energy, the laughs, and the spontaneous chaos that always turns into the best night ever. you're not shallow; you just know life is short and joy is underrated.",
    "vibeWords": [
      "main character",
      "owns every dance floor",
      "FOMO-fueled",
      "serotonin dealer",
      "outfit always on point",
      "bad vibes don't survive"
    ],
    "thisIsYou": [
      "you've never met a dance floor you didn't own",
      "FOMO is your primary motivator and honestly it works",
      "you're the reason the group chat has 400 unread messages",
      "your outfit is never an accident",
      "you live for the moment and the moment lives for you",
      "bad vibes don't survive in your presence"
    ],
    "groupChatVibe": "the hype person who makes a random tuesday night feel like an event",
    "compatibleWith": [
      {
        "type": "ENFP",
        "character": "Lulu",
        "figure": "Folk Singer"
      },
      {
        "type": "ESTP",
        "character": "Lulu",
        "figure": "The Greatest Magician"
      },
      {
        "type": "ESFJ",
        "character": "Lulu",
        "figure": "Tea Break"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/serving-time.png"
  },
  "ESTJ": {
    "typeCode": "ESTJ",
    "character": "Lulu",
    "figureName": "Survival Coffee",
    "series": "Office",
    "tagline": "someone had to take charge and you were tired of waiting",
    "description": "you turn chaos into a plan and a plan into results. you don't get why people resist structure when structure is literally what makes everything work. you're direct, reliable, and you'll tell someone the truth when no one else will.",
    "vibeWords": [
      "'here's the plan'",
      "spreadsheet for everything",
      "reads the T&Cs",
      "brutally honest",
      "winging it = nightmare",
      "gets it done"
    ],
    "thisIsYou": [
      "your group chat messages start with 'okay here's the plan'",
      "you've made a spreadsheet for something that didn't need a spreadsheet",
      "you're the friend who actually reads the terms and conditions",
      "'winging it' makes you physically uncomfortable",
      "you give feedback that's honest, direct, and occasionally devastating",
      "rules exist for a reason and that reason is you"
    ],
    "groupChatVibe": "the project manager friend who nobody asked for but everyone secretly relies on",
    "compatibleWith": [
      {
        "type": "ENTJ",
        "character": "Hirono",
        "figure": "Protector"
      },
      {
        "type": "ESFJ",
        "character": "Lulu",
        "figure": "Tea Break"
      },
      {
        "type": "ESTP",
        "character": "Lulu",
        "figure": "The Greatest Magician"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/survival-coffee.png"
  },
  "ISTJ": {
    "typeCode": "ISTJ",
    "character": "Lulu",
    "figureName": "Buddha Mode",
    "series": "Office",
    "tagline": "you've been doing it the right way this whole time and you're not about to stop now",
    "description": "you are consistency personified — you don't chase trends, cut corners, or flake. ever. your word is your bond and your routine is your religion. people might mistake steadiness for rigidity, but the world runs on people like you.",
    "vibeWords": [
      "never flakes",
      "5 minutes early",
      "folders within folders",
      "'if it ain't broke...'",
      "loyalty as a lifestyle",
      "human dependability"
    ],
    "thisIsYou": [
      "your morning routine hasn't changed in three years and it works perfectly",
      "you show up on time. actually, five minutes early.",
      "your files are organized and your folders have folders",
      "you said you'd do it and you did it. that's the whole personality.",
      "'if it ain't broke don't fix it' is your entire philosophy",
      "loyalty isn't a trait for you. it's a lifestyle."
    ],
    "groupChatVibe": "the dependable one who's never flaked on plans in recorded history",
    "compatibleWith": [
      {
        "type": "ISFJ",
        "character": "Nyota",
        "figure": "Snowfall Bliss"
      },
      {
        "type": "ESTJ",
        "character": "Lulu",
        "figure": "Survival Coffee"
      },
      {
        "type": "ESFJ",
        "character": "Lulu",
        "figure": "Tea Break"
      }
    ],
    "color": "#F5B5C0",
    "image": "/images/figures/buddha-mode.png"
  }
};
