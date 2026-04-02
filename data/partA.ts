import type { ChecklistItem } from "@/lib/test-types";

export const generalInstructions =
  "Please answer the below questions as accurately as you can, keeping in mind that there are no right or wrong answers. Answer what you feel is most consistent with you and your own experience, as accurately as you can.";

export const partAInstructions = [
  "The following questions refer to repeated types of thoughts, images, sensations, or urges you may experience. Please indicate whether you have experienced each of the following thoughts, images, or urges during the last 30 days by circling “yes” (Y) or “no” (N).",
  "Examples are provided for each type of thought for the sake of clarification, but please note that these are only representative examples—your own thoughts and experiences may be similar, but distinct from the examples given.",
];

export const partAItems: ChecklistItem[] = [
  {
    id: 1,
    prompt: "Excessive concern with germs",
    example:
      "e.g. excessive fear that you will contract an illness from door handles, other people, or objects.",
  },
  {
    id: 2,
    prompt: "Excessive concern with contaminants or chemicals",
    example:
      "e.g. excessive fear that you will be poisoned or contract cancer from household cleaners, asbestos, radiation, pesticides, or toxic waste.",
  },
  {
    id: 3,
    prompt: "Excessive concern that you will harm others by spreading germs or contaminants.",
    example:
      "e.g. you are excessively concerned that you will make someone else sick because you transferred germs or chemical residue from yourself or an object you touch.",
  },
  {
    id: 4,
    prompt: "Excessive concern or disgust with bodily waste or fluids",
    example:
      "e.g. excessive fear or disgust for contact with urine, feces, saliva or blood.",
  },
  {
    id: 5,
    prompt: "Excessive concern or disgust with sticky substances or residues",
    example:
      "e.g. you are excessively bothered by adhesive residue, chalk dust, or grease.",
  },
  {
    id: 6,
    prompt:
      "Excessive concern with becoming pregnant or of making someone pregnant",
    example:
      "e.g. you are afraid of becoming or making someone pregnant if you swim in a public pool.",
  },
  {
    id: 7,
    prompt: "Concerned with having an illness or disease.",
    example:
      "e.g. you are excessively concerned with the possibility of having HIV or cancer.",
  },
  {
    id: 8,
    prompt: "Fear of eating certain foods. (Not concern with gaining weight)",
    example:
      "e.g. you are excessively fearful that certain foods will make you choke, or will alter your body chemistry.",
  },
  {
    id: 9,
    prompt:
      "Fear of harming yourself or others because you are not careful enough.",
    example:
      "e.g. when driving, you are afraid you might hit a pedestrian because of not paying enough attention. You are afraid a customer might get injured because you gave them the wrong materials or information.",
  },
  {
    id: 10,
    prompt: "Fear of harming yourself or others on impulse",
    example:
      "e.g. you are afraid you might impulsively stab a loved one or drive your car into oncoming traffic for no reason.",
  },
  {
    id: 11,
    prompt: "Fear of being responsible for terrible events.",
    example:
      "e.g. you are afraid that something terrible like a fire, natural disaster, or burglary was or will be your fault.",
  },
  {
    id: 12,
    prompt: "Fear of blurting out obscenities, insults, or something inappropriate",
    example:
      "e.g. you are afraid you might shout blasphemies in church, yell “fire!” in a movie theater, or write obscenities in a business email for no good reason.",
  },
  {
    id: 13,
    prompt: "Fear of doing something else embarrassing or inappropriate",
    example:
      "e.g. you are afraid you might walk out of a store with unpaid merchandise.",
  },
  {
    id: 14,
    prompt: "Violent, horrific, or repulsive images",
    example:
      "e.g. disturbing images of car accidents, disfigured people, or corpses enter your thoughts for no apparent reason.",
  },
  {
    id: 15,
    prompt: "Excessive concern with right and wrong or scrupulosity",
    example:
      "e.g. you have unfounded worries that you might or might have lied or cheated, or prayed ‘incorrectly’.",
  },
  {
    id: 16,
    prompt: "Concern with sacrilege or blasphemy",
    example:
      "e.g. you have unacceptable unwanted thoughts about God or religion; concern about degree of devotion to God.",
  },
  {
    id: 17,
    prompt: "Excessive fears of Satan, evil spirits or demonic possession",
    example:
      "e.g. you are excessively concerned or preoccupied with the number ‘666,’ sports teams with the word ‘devil’ in them, or that you or others might be possessed.",
  },
  {
    id: 18,
    prompt: "Forbidden or improper sexual thoughts or impulses",
    example:
      "e.g. you have intrusive, unwanted sexual thoughts about family members or experience unwanted images of forbidden sexual acts.",
  },
  {
    id: 19,
    prompt: "Experiences unwanted sexual impulses",
    example:
      "e.g. you are concerned that you might ‘snap’ and commit a sexual violation.",
  },
  {
    id: 20,
    prompt: "Excessive concerns about sexual orientation or gender identity",
    example:
      "e.g. you repeatedly wonder if you are gay even though you have every reason to believe you are heterosexual.",
  },
  {
    id: 21,
    prompt: "Need for symmetry or exactness",
    example:
      "e.g. you are excessively concerned with certain things being touched or moved, or are excessively bothered when things are not lined up perfectly straight.",
  },
  {
    id: 22,
    prompt: "Perfection in appearance or grooming",
    example:
      "e.g. you are excessively concerned with the appearance of clothing (such as wrinkles, loose threads, lint, clothes matching). You are excessively bothered if your hair is not parted exactly straight.",
  },
  {
    id: 23,
    prompt: "Fear of saying the wrong thing",
    example:
      "e.g. you excessively think through every possible interpretation of what you are about to say before you answer a question.",
  },
  {
    id: 24,
    prompt: "Excessively bothered by things not sounding “just right.”",
    example:
      "e.g. you might readjust the volume of your stereo until it sounds “just right.” Or, you ask family members to say things in just the right way.",
  },
  {
    id: 25,
    prompt: "Need to know or remember",
    example:
      "e.g. you feel the need to remember insignificant details like license plate numbers, names of actors, or advertising slogans.",
  },
  {
    id: 26,
    prompt: "Need to hoard or save things",
    example:
      "e.g. you are afraid something valuable might be discarded with recycled newspapers even though all of your valuables are locked up elsewhere.",
  },
  {
    id: 27,
    prompt: "Fear of losing objects, information, or a person",
    example:
      "e.g. you are excessively worried you might lose your memories, soul, or essence, or something of value.",
  },
  {
    id: 28,
    prompt: "Magical or superstitious fears",
    example:
      "e.g. certain numbers hold special meaning to you or are associated with good/bad events.",
  },
  {
    id: 29,
    prompt: "Intrusive meaningless sounds, words, or music",
    example:
      "e.g. words or music of no special significance play over and over in your mind like a broken record.",
  },
];
