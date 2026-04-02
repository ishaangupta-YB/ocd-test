# Claude Code Prompt — Y-BOCS-II OCD Self-Report Screener Website

## Overview

Build a complete, production-ready **Next.js (App Router)** website that implements the **Yale-Brown Obsessive-Compulsive Scale — Second Edition, Self-Report Version (Y-BOCS-II-SR)** as an interactive online OCD screening tool. The site will be deployed on **Vercel**. I have attached the original Y-BOCS-II-SR PDF — treat it as the **single source of truth** for all question text, examples, instructions, and structure. Every word, every option anchor, every example must match the PDF exactly.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router, `app/` directory)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: React Context + `useReducer` (no external state libraries)
- **Deployment**: Vercel (ensure `next.config.js` is Vercel-compatible)
- **Font**: Use a refined, accessible Google Font pairing — e.g., `DM Sans` for body and `Instrument Serif` or `Playfair Display` for headings. Avoid Inter/Roboto/Arial.
- **No backend / no database** — everything runs client-side. No data is stored or transmitted anywhere.

---

## Site Structure & Pages

```
/                → Landing / home page
/test            → The actual Y-BOCS-II-SR test (multi-step form)
/results         → Score results + interpretation
/about           → About page explaining the Y-BOCS-II, OCD, and disclaimers
```

---

## Page-by-Page Specification

### 1. Landing Page (`/`)

**Purpose**: Warm, non-clinical welcome. Explain what this tool is and set expectations.

**Content**:
- Hero section with heading: "Y-BOCS-II Self-Report OCD Screener"
- Subheading explaining this is a validated self-report screening tool for obsessive-compulsive symptoms
- A clear, prominent "Begin Screening" CTA button → navigates to `/test`
- Brief section: "What is the Y-BOCS-II?" — 2–3 sentences explaining it's the gold-standard assessment tool for measuring OCD symptom severity, developed by Goodman, Rasmussen, Price & Storch
- Section: "What to Expect" — explain the 4-part structure (symptom checklists + severity ratings), estimated completion time (~10–15 minutes)
- Section: "Important Disclaimer" (see Disclaimer section below)
- Footer with attribution: "Based on the Yale-Brown Obsessive-Compulsive Scale — Second Edition, Self-Report Version (Y-BOCS-II-SR). © Goodman, Rasmussen, Price, & Storch, 2006."

**Design**: Calming, warm aesthetic. Muted earth tones or soft blues/greens. Generous whitespace. Avoid anything that looks clinical or cold. The vibe should be: "you're safe here, this is just a tool to help you understand yourself better."

---

### 2. Test Page (`/test`) — THE CORE OF THE APP

This is a **multi-step wizard form** that implements all 4 parts of the Y-BOCS-II-SR exactly as specified in the PDF.

#### General Instructions Screen
Before Part A begins, show the general instructions text from the PDF:
> "Please answer the below questions as accurately as you can, keeping in mind that there are no right or wrong answers. Answer what you feel is most consistent with you and your own experience, as accurately as you can."

#### PART A — Obsessions Checklist (Items 01–29)

**PDF Instructions for Part A** (display verbatim):
> "The following questions refer to repeated types of thoughts, images, sensations, or urges you may experience. Please indicate whether you have experienced each of the following thoughts, images, or urges during the last 30 days by circling 'yes' (Y) or 'no' (N)."
> "Examples are provided for each type of thought for the sake of clarification, but please note that these are only representative examples—your own thoughts and experiences may be similar, but distinct from the examples given."

**Items**: 29 items, each with:
- Item number (01–29)
- Main question text (exactly as PDF)
- Example text in a secondary/muted style (exactly as PDF, prefixed with "e.g.,")
- Y / N toggle or button pair

**All 29 items from the PDF**:

| # | Question | Example |
|---|----------|---------|
| 01 | Excessive concern with germs | e.g. excessive fear that you will contract an illness from door handles, other people, or objects. |
| 02 | Excessive concern with contaminants or chemicals | e.g. excessive fear that you will be poisoned or contract cancer from household cleaners, asbestos, radiation, pesticides, or toxic waste. |
| 03 | Excessive concern that you will harm others by spreading germs or contaminants. | e.g. you are excessively concerned that you will make someone else sick because you transferred germs or chemical residue from yourself or an object you touch. |
| 04 | Excessive concern or disgust with bodily waste or fluids | e.g. excessive fear or disgust for contact with urine, feces, saliva or blood. |
| 05 | Excessive concern or disgust with sticky substances or residues | e.g. you are excessively bothered by adhesive residue, chalk dust, or grease. |
| 06 | Excessive concern with becoming pregnant or of making someone pregnant | e.g. you are afraid of becoming or making someone pregnant if you swim in a public pool. |
| 07 | Concerned with having an illness or disease. | e.g. you are excessively concerned with the possibility of having HIV or cancer. |
| 08 | Fear of eating certain foods. (Not concern with gaining weight) | e.g. you are excessively fearful that certain foods will make you choke, or will alter your body chemistry. |
| 09 | Fear of harming yourself or others because you are not careful enough. | e.g. when driving, you are afraid you might hit a pedestrian because of not paying enough attention. You are afraid a customer might get injured because you gave them the wrong materials or information. |
| 10 | Fear of harming yourself or others on impulse | e.g. you are afraid you might impulsively stab a loved one or drive your car into oncoming traffic for no reason. |
| 11 | Fear of being responsible for terrible events. | e.g. you are afraid that something terrible like a fire, natural disaster, or burglary was or will be your fault. |
| 12 | Fear of blurting out obscenities, insults, or something inappropriate | e.g. you are afraid you might shout blasphemies in church, yell "fire!" in a movie theater, or write obscenities in a business email for no good reason. |
| 13 | Fear of doing something else embarrassing or inappropriate | e.g. you are afraid you might walk out of a store with unpaid merchandise. |
| 14 | Violent, horrific, or repulsive images | e.g. disturbing images of car accidents, disfigured people, or corpses enter your thoughts for no apparent reason. |
| 15 | Excessive concern with right and wrong or scrupulosity | e.g. you have unfounded worries that you might or might have lied or cheated, or prayed 'incorrectly'. |
| 16 | Concern with sacrilege or blasphemy | e.g. you have unacceptable unwanted thoughts about God or religion; concern about degree of devotion to God. |
| 17 | Excessive fears of Satan, evil spirits or demonic possession | e.g. you are excessively concerned or preoccupied with the number '666,' sports teams with the word 'devil' in them, or that you or others might be possessed. |
| 18 | Forbidden or improper sexual thoughts or impulses | e.g. you have intrusive, unwanted sexual thoughts about family members or experience unwanted images of forbidden sexual acts. |
| 19 | Experiences unwanted sexual impulses | e.g. you are concerned that you might 'snap' and commit a sexual violation. |
| 20 | Excessive concerns about sexual orientation or gender identity | e.g. you repeatedly wonder if you are gay even though you have every reason to believe you are heterosexual. |
| 21 | Need for symmetry or exactness | e.g. you are excessively concerned with certain things being touched or moved, or are excessively bothered when things are not lined up perfectly straight. |
| 22 | Perfection in appearance or grooming | e.g. you are excessively concerned with the appearance of clothing (such as wrinkles, loose threads, lint, clothes matching). You are excessively bothered if your hair is not parted exactly straight. |
| 23 | Fear of saying the wrong thing | e.g. you excessively think through every possible interpretation of what you are about to say before you answer a question. |
| 24 | Excessively bothered by things not sounding "just right." | e.g. you might readjust the volume of your stereo until it sounds "just right." Or, you ask family members to say things in just the right way. |
| 25 | Need to know or remember | e.g. you feel the need to remember insignificant details like license plate numbers, names of actors, or advertising slogans. |
| 26 | Need to hoard or save things | e.g. you are afraid something valuable might be discarded with recycled newspapers even though all of your valuables are locked up elsewhere. |
| 27 | Fear of losing objects, information, or a person | e.g. you are excessively worried you might lose your memories, soul, or essence, or something of value. |
| 28 | Magical or superstitious fears | e.g. certain numbers hold special meaning to you or are associated with good/bad events. |
| 29 | Intrusive meaningless sounds, words, or music | e.g. words or music of no special significance play over and over in your mind like a broken record. |

**UX for Part A**:
- Show items in groups of ~5–7 per screen/step to avoid overwhelming the user
- Each item is a card with the question prominently displayed and the example in smaller, muted text below
- Y/N selection via two pill-shaped buttons that toggle. Selected state should be clearly visible (filled color for selected, outline for unselected)
- "Next" button to advance to the next group. "Back" button to go to previous group
- Progress bar at the top showing overall test progress (across all 4 parts)

---

#### PART B — Obsession Severity (5 questions, 0–5 scale each)

**Transition screen**: Show Part B instructions from the PDF verbatim:
> "Please answer the following questions regarding the unwanted thoughts, images, or urges that you indicated experiencing in Part A by selecting the option that is most consistent with your experience during the past 30 days, circling the most appropriate number from 0 to 5. You may refer back to your responses to Part A if needed."

**CRITICAL**: If the user answered "No" to ALL items in Part A (i.e., they endorsed zero obsessions), **skip Part B entirely** and auto-score it as 0. Show a brief message: "Based on your responses, you did not endorse any obsession symptoms. Moving to Part C."

**5 Severity Items** (each rated 0–5, display the full anchor text for each option exactly as in the PDF):

**B1 — Time Occupied by Obsessions**
| Score | Anchor |
|-------|--------|
| 0 | None |
| 1 | Less than 1 hour per day |
| 2 | 1 to 3 hours per day |
| 3 | Between 3 and 8 hours per day |
| 4 | Between 8 and 12 hours per day |
| 5 | More than 12 hours per day, constant, or nearly constant |

**B2 — Obsession-Free Interval**
| Score | Anchor |
|-------|--------|
| 0 | No obsessive thoughts |
| 1 | More than 8 consecutive hours per day |
| 2 | Between 3 and 8 consecutive hours per day |
| 3 | Between 1 and 3 consecutive hours per day |
| 4 | Between a few minutes and 1 hour |
| 5 | Constant or nearly constant |

**B3 — Control Over Obsessions**
Question text: "How much control do you feel you have over these thoughts? How successfully can you stop or ignore them when they occur?"
| Score | Anchor |
|-------|--------|
| 0 | Complete control, can dismiss completely |
| 1 | Much control, usually able to stop or ignore |
| 2 | Moderate control, often able to stop or ignore, but may require some effort/concentration |
| 3 | Some control, sometimes able to stop or ignore thoughts with much effort/concentration |
| 4 | Little control, rarely able to stop or ignore thoughts, and even then only with much difficulty |
| 5 | No control. Rarely able to even let go of thoughts for a moment |

**B4 — Distress from Obsessions**
Question text: "How much distress, anxiety, or upset do these thoughts cause you?"
| Score | Anchor |
|-------|--------|
| 0 | No distress |
| 1 | Slightly disturbing |
| 2 | Definitely disturbing, but still manageable |
| 3 | Often highly disturbing and difficult to manage |
| 4 | Most or even all thoughts are highly disturbing and difficult to manage |
| 5 | All or nearly all thoughts are highly disturbing. Overwhelming and disabling distress whenever a thought occurs |

**B5 — Interference from Obsessions**
Question text: "How much do these thoughts interfere with your social, school, or work functioning?"
| Score | Anchor |
|-------|--------|
| 0 | No interference |
| 1 | Slight interference with social or work activities, but overall performance not impaired |
| 2 | Definite interference with social or work activities, but still manageable |
| 3 | Significant impairment in one or more (but not all) aspects of functioning |
| 4 | Significant impairment in ALL areas of functioning |
| 5 | Incapacitating |

**UX for Part B**: Show one question per screen. Display the question text prominently. Show all 6 options (0–5) as stacked radio-style cards, each showing the score number and the full anchor text. The selected card should be highlighted. User must select one option before the "Next" button becomes active.

---

#### PART C — Compulsions & Avoidance Checklist (Items 30–67)

**Transition screen**: Show Part C instructions from the PDF verbatim:
> "The following questions refer to behaviors, strategies, or actions people may use to minimize, avoid, or neutralize some of the intrusive or unwanted thoughts portrayed in Part A."
> "If the any of the thoughts described in Part A have caused you to engage in any of the minimizing, neutralizing, or avoiding actions or behaviors listed below during the last 30 days, please indicate so by circling 'yes' (Y) or 'no' (N). You may refer back to your answers for Part A if needed."
> "Again, some examples are provided for each type of action/behavior for the sake of clarification, but please note that these are only representative examples—your own behaviors or experiences may be similar, but distinct from the examples given."

**Items**: 38 items (30–67), same Y/N format as Part A. All items exactly from the PDF:

| # | Question | Example |
|---|----------|---------|
| 30 | Excessive or ritualized hygiene | e.g. excessive handwashing or cleaning rituals |
| 31 | Cleaning of household items, inanimate objects, or pets | e.g. you vacuum your floors several times per day. |
| 32 | Checking locks, stove, appliances, emergency brake, faucets, etc. | e.g. you have to check several times that your doors are locked before leaving the house. You have returned home after leaving to make sure that you remembered to turn the stove off. |
| 33 | Checking that nothing terrible did or will happen | e.g. you will circle back around the block to make sure you have not run over a pedestrian. |
| 34 | Checking that you did not make a mistake | e.g. you will excessively check over homework, writing, or answers on forms before turning them in. |
| 35 | Checking tied to bodily concerns | e.g. you spend excessive time scrutinizing your body for moles or signs of skin cancer. |
| 36 | Need to repeat routine activities or boundary crossings | e.g. you have to cross back and forth through a doorway multiple times when entering a room. You have to turn your car on and off several times before you feel comfortable. |
| 37 | Need to make things even or balanced | e.g. you need to adjust the lengths of your shoe laces so that they are exactly the same. |
| 38 | Need to re-read or re-write | e.g. you rewrite a sentence until the letters look perfect. You will doubt information that you just read unless you re-read a sentence or page several times. |
| 39 | Counting compulsions | e.g. you spend excessive time counting ceiling or floor tiles, books in a bookcase, or words in a sentence. |
| 40 | Ritualized activity of daily living routines | e.g. you feel the need to put clothes on in a certain order. You feel you can only brush your teeth after you have followed an elaborate series of steps beforehand. |
| 41 | Excessive religious rituals | e.g. you will repeat prayers or passages from a religious text an excessive number of times. |
| 42 | Ordering or arranging compulsions | e.g. you will repeatedly straighten piles of papers on your desktop or adjust books in a bookcase until they seem 'right.' |
| 43 | Repeating what someone else has said | e.g. you repeat words, phrases, or sounds someone else has just said. |
| 44 | Asking for reassurance | e.g. you repeatedly ask other people if you said something or performed a routine correctly. |
| 45 | Ritualized eating behaviors | e.g. you arrange or eat food in a very particular way to avoid a feared consequence other than gaining weight. |
| 46 | Saving or collecting useless items | e.g. you pile up old newspapers or collect objects you do not have a use for, or that have no monetary value. |
| 47 | Picking up objects that most people would pass by | e.g. you might pick up and save shards of broken glass, nails, or pieces of paper with writing on them while walking down the sidewalk. |
| 48 | Examining things that leave your possession | e.g. you sift through your own garbage or will hesitate to throw away used items to ensure you don't accidentally throw away something of value. |
| 49 | Buying many unneeded items | e.g. you might buy 20 umbrellas or 50 boxes of tissues at a time, to the extent that you waste a lot of money, or fill closets full of unnecessary items. |
| 50 | Need to tell, ask, or confess things | e.g. you feel the need to confess or sins or wrongs that you did not commit. You feel you must describe every detail so that nothing is left out, or repeat the same question in different ways to make sure it was understood. |
| 51 | Need to do something until it feels "just right" | e.g. you adjust your car seat, straighten pictures, or arrange papers on a desk until you feel an internal signal that it's OK or 'just right.' |
| 52 | Need to touch, tap, or rub | e.g. you have the urge to run your finger along surfaces or edges, or to lightly touch other people. You feel the need to tap objects a certain number of times. |
| 53 | Staring or blinking rituals | e.g. you feel the need to blink a certain number of times or stare at something for a certain length of time to avoid something bad happening. |
| 54 | Superstitious behaviors | e.g. you go out of your way to step over sidewalk cracks, or make sure sentences never contain 13 words. You feel the need to make the sign of a cross before dialing a phone number containing '666.' |
| 55 | Mental rituals (other than checking or counting) | e.g. you might silently recite a prayer, song, or nonsense words to cancel out an unwanted or negative thought. |
| 56 | Pervasive slowness | e.g. it is excessively difficult for you to start, execute, or finish a wide range of routine tasks. You may be unable to complete, or become 'paralyzed' while trying to finish a task. |
| 57 | Ritualized avoidance | e.g. you plan a course on a map or GPS to stay at least 1 mile away from a chemical factory or hospital. |
| 58 | Actively taking measures to avoid contact with contaminants or other feared objects | e.g. you will refuse to shake hands with strangers, or will avoid going near someone who has a cut. |
| 59 | Avoiding doing things, going places, or being with someone because of intrusive, senseless, or unwanted thoughts | *(no example in PDF)* |
| 60 | Avoiding contact with dirty or contaminated objects or people | *(no example in PDF)* |
| 61 | Avoiding handling sharp or dangerous objects, or operating vehicles or machinery, out of concern that you might harm others | *(no example in PDF)* |
| 62 | Avoiding contact with people, children, or animals because of unwanted impulses | *(no example in PDF)* |
| 63 | Avoiding talking to or writing to others for fear you will say or write the wrong thing | *(no example in PDF)* |
| 64 | Avoiding watching TV, listening to radio, or reading the newspaper to shield yourself from disturbing information | *(no example in PDF)* |
| 65 | Avoiding going shopping out of concern you will buy extra items that aren't needed | *(no example in PDF)* |
| 66 | Avoiding doing things, going places, or being with someone that would trigger unwanted impulses or ritualized actions | *(no example in PDF)* |
| 67 | Avoiding reading or writing because it may bring on the urge to repeatedly re-read or re-write | *(no example in PDF)* |

**UX**: Same as Part A — grouped into screens of ~5–7 items, Y/N toggle buttons, progress bar continues.

---

#### PART D — Compulsion/Avoidance Severity (5 questions, 0–5 scale each)

**Transition screen**: Show Part D instructions from the PDF verbatim:
> "Lastly, please answer the following questions pertaining to the minimizing, neutralizing, or avoiding behaviors that you indicated experiencing in Part C by selecting the option that is most consistent with your experience during the past 30 days, circling the most appropriate number from 0 to 5. You may refer back to your responses to Part C if needed."

**CRITICAL**: If the user answered "No" to ALL items in Part C (i.e., they endorsed zero compulsions/avoidance), **skip Part D entirely** and auto-score it as 0. Show a brief message: "Based on your responses, you did not endorse any compulsion or avoidance symptoms. Proceeding to results."

**5 Severity Items** (each rated 0–5):

**D1 — Time Spent on Compulsions/Avoidance**
Question: "How much time do you spend engaging in these activities in response to unwanted thoughts or actively avoiding things that trigger those thoughts?"
| Score | Anchor |
|-------|--------|
| 0 | None |
| 1 | Less than 1 hour per day |
| 2 | 1 to 3 hours per day |
| 3 | Between 3 and 8 hours per day |
| 4 | Between 8 and 12 hours per day |
| 5 | More than 12 hours per day, constant, or nearly constant |

**D2 — Resistance to Compulsions**
Question: "Do you give in to the urge to perform these behaviors, or do you try to resist them? How much of an effort do you make to try to resist engaging in these behaviors or avoiding things?"
| Score | Anchor |
|-------|--------|
| 0 | Always make an effort to resist, or symptoms are so minimal you don't need to resist |
| 1 | You try to resist most of the time |
| 2 | You make a moderate effort to resist |
| 3 | You make some effort to resist |
| 4 | You give in to almost all of these urges without trying to control them, but you might hesitate |
| 5 | You completely give in to all urges. The urge to engage in these behaviors is almost involuntary |

**D3 — Control Over Compulsions**
Question: "How strong is the drive to perform these behaviors (or avoiding things)? How much control do you feel you have over whether or not you engage in the behaviors (or avoiding) when an unwanted thought comes to mind?"
| Score | Anchor |
|-------|--------|
| 0 | Complete control, can dismiss urges to perform behaviors completely |
| 1 | Much control, usually able to resist urges to perform behaviors |
| 2 | Moderate control; you feel pressure to perform behaviors but are often able to control them |
| 3 | Some control; you feel a strong drive to perform behaviors, but are sometimes able to control them |
| 4 | Little control, rarely able to stop behaviors. You can only delay behaviors with much difficulty |
| 5 | No control. The drive to carry out behaviors is completely overpowering, or even involuntary. You are rarely able to delay the behaviors even momentarily |

**D4 — Distress from Compulsions**
Question: "How would you feel if you were prevented or interrupted from performing these behaviors (or avoiding) when you felt you needed to perform them? How distressed would you become?"
| Score | Anchor |
|-------|--------|
| 0 | No distress |
| 1 | You would become slightly anxious if behaviors or avoidance were prevented |
| 2 | Anxiety would definitely increase, but would remain manageable if behaviors or avoidance were prevented |
| 3 | You would experience much anxiety if certain behaviors or avoidance were prevented |
| 4 | You would experience much anxiety if almost any of these behaviors or avoidance were prevented |
| 5 | You experience overwhelming anxiety from any attempt to delay, interrupt, or modify behaviors or avoidance |

**D5 — Interference from Compulsions**
Question: "How much do these behaviors or avoidance interfere with your social, school, or work functioning?"
| Score | Anchor |
|-------|--------|
| 0 | None |
| 1 | Slight interference with social or work activities, but overall performance not impaired |
| 2 | Definite interference with social or work activities, but still manageable |
| 3 | Significant impairment in one or more (not all) aspects of functioning |
| 4 | Significant impairment in ALL areas of functioning |
| 5 | Incapacitating. Limits life activities in ALL areas |

**UX**: Same as Part B — one question per screen, stacked radio cards with full anchor text.

---

### 3. Results Page (`/results`)

#### Scoring Logic

The Y-BOCS-II-SR total severity score is calculated as:

```
Obsession Subtotal  = B1 + B2 + B3 + B4 + B5  (range: 0–25)
Compulsion Subtotal = D1 + D2 + D3 + D4 + D5  (range: 0–25)
Total Score         = Obsession Subtotal + Compulsion Subtotal  (range: 0–50)
```

Parts A and C (the checklists) are **NOT scored numerically** — they serve only to identify which symptoms are present and to contextualize Parts B and D. However, display a count of how many obsessions and compulsions the user endorsed (e.g., "You endorsed 8 out of 29 obsession types and 12 out of 38 compulsion/avoidance types").

#### Severity Benchmarks (Y-BOCS-II empirically derived)

Use these empirically validated severity ranges for interpretation:

| Score Range | Severity Level | Color Code |
|-------------|---------------|------------|
| 0–14        | Sub-clinical (Non-clinical) | Green |
| 15–21       | Mild          | Yellow/Amber |
| 22–34       | Moderate      | Orange |
| 35–50       | Severe        | Red |

*Source: Cervin et al., 2025 — "Benchmarking empirical severity for the Yale-Brown Obsessive Compulsive Scale-Second Edition" published in Journal of Affective Disorders.*

#### Results Page Display

Show the following:

1. **Total Score** — large, prominent number with the severity label and corresponding color
2. **Visual Score Gauge** — a horizontal bar or circular gauge showing where the score falls on the 0–50 range, with the severity bands color-coded
3. **Subscale Breakdown**:
   - Obsession Severity Subtotal: X / 25
   - Compulsion Severity Subtotal: X / 25
   - Show a small bar chart or dual gauge comparing the two
4. **Symptom Count Summary**:
   - "You endorsed X out of 29 obsession symptom types"
   - "You endorsed X out of 38 compulsion/avoidance symptom types"
5. **Interpretation Text** — based on the severity band, display a calm, empathetic explanation:

   - **Sub-clinical (0–14)**: "Your responses suggest that obsessive-compulsive symptoms are not significantly impacting your daily life at this time. This score falls within the sub-clinical range, meaning the symptoms you may experience are within normal limits and are unlikely to require clinical intervention. If you are still concerned, consider speaking with a mental health professional."
   
   - **Mild (15–21)**: "Your responses suggest mild obsessive-compulsive symptoms. You may be experiencing some intrusive thoughts or repetitive behaviors that cause mild distress or take up some of your time, but they are generally manageable. Speaking with a mental health professional could help you develop strategies to manage these symptoms before they escalate."
   
   - **Moderate (22–34)**: "Your responses suggest moderate obsessive-compulsive symptoms. These symptoms are likely causing noticeable distress and may be interfering with your daily activities, work, or relationships. It is recommended that you consult with a mental health professional who specializes in OCD. Evidence-based treatments like Exposure and Response Prevention (ERP) therapy and/or medication can be highly effective."
   
   - **Severe (35–50)**: "Your responses suggest severe obsessive-compulsive symptoms that are likely causing significant distress and substantially interfering with your daily functioning. It is strongly recommended that you seek help from a mental health professional experienced in treating OCD as soon as possible. Effective treatments are available, including specialized therapy (ERP) and medication, and you do not have to face this alone."

6. **"What You Can Do Next" Section**:
   - Recommend consulting a licensed mental health professional
   - Mention ERP (Exposure and Response Prevention) as the gold-standard therapy for OCD
   - Mention that medication (SSRIs) can also be effective
   - Link to the International OCD Foundation: https://iocdf.org/
   - Link to NOCD: https://www.nocd.com/
   - Link to Psychology Today therapist finder: https://www.psychologytoday.com/us/therapists/ocd

7. **Prominent Disclaimer** (see below)

8. **"Retake Test" button** → navigates back to `/test`
9. **"Share / Download Results" button** — generates a clean summary the user can screenshot or copy to clipboard (text only, no PDF generation needed)

#### State Passing
Pass the completed answers from `/test` to `/results` via:
- URL search params (encoded state), OR
- React Context that persists across navigation, OR
- `sessionStorage`

Do NOT use `localStorage` — this is sensitive data and should not persist beyond the session.

---

### 4. About Page (`/about`)

Content sections:

1. **What is OCD?** — Brief, accurate, non-stigmatizing description. OCD is a chronic condition characterized by intrusive, unwanted thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce distress. It affects approximately 1–2% of the population worldwide.

2. **What is the Y-BOCS-II?** — The Yale-Brown Obsessive-Compulsive Scale (Y-BOCS) is the gold-standard clinical assessment for measuring OCD symptom severity. The Second Edition (Y-BOCS-II) was developed by Wayne K. Goodman, Steven A. Rasmussen, Lawrence H. Price, and Eric A. Storch in 2006 to improve sensitivity, especially for severe cases, and to better capture avoidance behaviors. The self-report version allows individuals to complete the assessment independently.

3. **How is it scored?** — Explain the 4-part structure, that Parts A & C are symptom identification checklists and Parts B & D are severity scales scored 0–5 on each of 5 dimensions. Total severity = sum of Parts B + D, range 0–50.

4. **Limitations** — Self-report is less reliable than clinician-administered. Cultural context matters. This is a screening tool, not a diagnosis. Comorbid conditions may affect results.

5. **Full Disclaimer** (see below)

6. **Attribution**: "This tool is based on the Y-BOCS-II Self-Report Version. © Goodman, Rasmussen, Price, & Storch, 2006. This website is not affiliated with or endorsed by the scale's authors."

---

## Disclaimer (Use EVERYWHERE it's needed)

Display this disclaimer prominently on the landing page, before the test starts, on the results page, and on the about page:

> **Important Disclaimer**: This tool is for **educational and screening purposes only**. It is **not a diagnostic instrument** and does **not** constitute medical advice, diagnosis, or treatment. A high score does not mean you have OCD, and a low score does not mean you don't. Only a qualified mental health professional can diagnose OCD through a comprehensive clinical evaluation. If you are experiencing distress, please consult a licensed mental health provider. If you are in crisis, please contact the 988 Suicide & Crisis Lifeline (call or text 988 in the US) or your local emergency services.

---

## Design & UX Requirements

### Visual Design
- **Palette**: Calming, muted tones. Think: soft sage green, warm cream/off-white, gentle slate, muted teal. Avoid harsh clinical whites or anxiety-inducing reds (except for the severe score indicator).
- **Typography**: Refined Google Font pair. Serif or interesting sans-serif for headings, clean readable sans for body. Minimum 16px body text.
- **Cards**: Rounded corners (12–16px radius), subtle shadows, no harsh borders
- **Spacing**: Generous padding and margins. The test should feel spacious, not cramped
- **Dark mode**: Support dark mode via Tailwind's `dark:` classes and a toggle in the header

### Animations (Framer Motion)
- Page/step transitions: smooth slide or fade between test steps
- Progress bar: animated fill
- Score reveal on results page: count-up animation for the total score number
- Card selections: subtle scale/color transition on hover and select
- Staggered entry animations for lists of items

### Accessibility
- Full keyboard navigation
- ARIA labels on all interactive elements
- Focus visible rings
- Color is never the sole indicator — always pair with text/icons
- Minimum 4.5:1 contrast ratio for all text
- Screen reader friendly progress announcements

### Mobile Responsiveness
- Fully responsive from 320px to 1440px+
- On mobile, Y/N buttons should be large touch targets (minimum 48px)
- Severity scale options should stack vertically on mobile
- Test navigation (Back/Next) should be sticky at the bottom on mobile

### Progress Indicator
- Show a persistent progress bar at the top of the test page
- Calculate total steps: Part A groups + Part B questions + Part C groups + Part D questions
- Show current part label (e.g., "Part A: Obsessions — Questions 1–7 of 29")
- Show overall completion percentage

---

## Data Architecture

```typescript
// Types
interface TestState {
  partA: Record<number, boolean | null>;  // items 1-29, true=Yes, false=No, null=unanswered
  partB: Record<number, number | null>;   // 5 items, each 0-5 or null
  partC: Record<number, boolean | null>;  // items 30-67
  partD: Record<number, number | null>;   // 5 items, each 0-5 or null
  currentStep: number;
  startedAt: string;
  completedAt: string | null;
}

interface TestResults {
  obsessionCount: number;      // count of "Yes" in Part A
  compulsionCount: number;     // count of "Yes" in Part C
  obsessionSubtotal: number;   // sum of Part B (0-25)
  compulsionSubtotal: number;  // sum of Part D (0-25)
  totalScore: number;          // obsessionSubtotal + compulsionSubtotal (0-50)
  severityLevel: 'sub-clinical' | 'mild' | 'moderate' | 'severe';
}
```

---

## Important Implementation Notes

1. **No data leaves the browser.** Zero network requests for storing or transmitting answers. Add a visible notice: "Your responses are completely private. No data is stored or sent to any server."

2. **Validation**: Every question must be answered before proceeding to the next step. Show a gentle inline error if the user tries to advance without completing all items in the current group.

3. **Session only**: Store test state in React Context or sessionStorage. Clear on tab close. Never use localStorage or cookies for test data.

4. **SEO**: Add proper meta tags, Open Graph tags, and a meta description. Title: "Y-BOCS-II OCD Screener — Free Online Self-Report Tool". Favicon should be a simple, calming icon.

5. **Performance**: Aim for 90+ Lighthouse score. Use `next/font` for Google Fonts. Lazy load non-critical components.

6. **Legal footer**: Every page footer should include: "This tool is not a substitute for professional diagnosis. © 2025. Based on the Y-BOCS-II-SR © Goodman, Rasmussen, Price, & Storch, 2006."

7. **No tracking / no analytics** unless I explicitly ask for it later.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          (root layout with font, theme, metadata)
│   ├── page.tsx            (landing page)
│   ├── test/
│   │   └── page.tsx        (test wizard)
│   ├── results/
│   │   └── page.tsx        (results display)
│   └── about/
│       └── page.tsx        (about page)
├── components/
│   ├── ui/                 (reusable UI: Button, Card, ProgressBar, RadioCard, ToggleButton, ScoreGauge, etc.)
│   ├── test/               (test-specific: PartAGroup, PartBQuestion, PartCGroup, PartDQuestion, TestWizard, etc.)
│   ├── results/            (ResultsScore, SeverityGauge, SubscaleBreakdown, InterpretationText, ResourceLinks, etc.)
│   ├── layout/             (Header, Footer, ThemeToggle, Navigation)
│   └── shared/             (Disclaimer, PrivacyNotice)
├── context/
│   └── TestContext.tsx      (React Context + useReducer for test state)
├── data/
│   ├── partA.ts            (all 29 Part A items with question text and examples)
│   ├── partB.ts            (all 5 Part B items with question text and all 6 anchors each)
│   ├── partC.ts            (all 38 Part C items with question text and examples)
│   ├── partD.ts            (all 5 Part D items with question text and all 6 anchors each)
│   └── scoring.ts          (severity benchmarks, interpretation text)
├── lib/
│   └── scoring.ts          (scoring calculation functions)
└── styles/
    └── globals.css         (Tailwind directives + custom CSS variables)
```

---

## Summary Checklist Before You Start Coding

- [ ] Read the attached Y-BOCS-II-SR PDF cover to cover
- [ ] Verify every question, every example, every anchor text matches the PDF exactly
- [ ] Set up Next.js with TypeScript, Tailwind, Framer Motion
- [ ] Implement all 4 parts with exact content from the PDF
- [ ] Implement skip logic (skip Part B if no Part A endorsements, skip Part D if no Part C endorsements)
- [ ] Implement scoring: Total = Part B sum + Part D sum (0–50)
- [ ] Implement severity interpretation with empirical benchmarks (0–14, 15–21, 22–34, 35–50)
- [ ] Add disclaimers everywhere
- [ ] Add privacy notice
- [ ] Test responsive design on mobile
- [ ] Test keyboard accessibility
- [ ] Verify Vercel deployment compatibility
- [ ] Lighthouse audit for performance

**Build this completely. Every page, every component, every question, fully functional. Do not leave any TODOs or placeholder content. Ship it.**