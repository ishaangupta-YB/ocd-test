import type { SeverityQuestion } from "@/lib/test-types";

export const partDInstructions =
  "Lastly, please answer the following questions pertaining to the minimizing, neutralizing, or avoiding behaviors that you indicated experiencing in Part C by selecting the option that is most consistent with your experience during the past 30 days, circling the most appropriate number from 0 to 5. You may refer back to your responses to Part C if needed.";

export const partDQuestions: SeverityQuestion[] = [
  {
    id: 1,
    name: "Time Spent on Compulsions/Avoidance",
    prompt:
      "How much time do you spend engaging in these activities in response to unwanted thoughts or actively avoiding things that trigger those thoughts?",
    options: [
      { value: 0, label: "None" },
      { value: 1, label: "Less than 1 hour per day" },
      { value: 2, label: "1 to 3 hours per day" },
      { value: 3, label: "Between 3 and 8 hours per day" },
      { value: 4, label: "Between 8 and 12 hours per day" },
      {
        value: 5,
        label: "More than 12 hours per day, constant, or nearly constant",
      },
    ],
  },
  {
    id: 2,
    name: "Resistance to Compulsions",
    prompt:
      "Do you give in to the urge to perform these behaviors, or do you try to resist them? How much of an effort do you make to try to resist engaging in these behaviors or avoiding things?",
    options: [
      {
        value: 0,
        label:
          "Always make an effort to resist, or symptoms are so minimal you don’t need to resist",
      },
      { value: 1, label: "You try to resist most of the time" },
      { value: 2, label: "You make a moderate effort to resist" },
      { value: 3, label: "You make some effort to resist" },
      {
        value: 4,
        label:
          "You give in to almost all of these urges without trying to control them, but you might hesitate",
      },
      {
        value: 5,
        label:
          "You completely give in to all urges. The urge to engage in these behaviors is almost involuntary",
      },
    ],
  },
  {
    id: 3,
    name: "Control Over Compulsions",
    prompt:
      "How strong is the drive to perform these behaviors (or avoiding things)? How much control do you feel you have over whether or not you engage in the behaviors (or avoiding) when an unwanted thought comes to mind?",
    options: [
      {
        value: 0,
        label:
          "Complete control, can dismiss urges to perform behaviors completely",
      },
      {
        value: 1,
        label: "Much control, usually able to resist urges to perform behaviors",
      },
      {
        value: 2,
        label:
          "Moderate control; you feel pressure to perform behaviors but are often able to control them",
      },
      {
        value: 3,
        label:
          "Some control; you feel a strong drive to perform behaviors, but are sometimes able to control them",
      },
      {
        value: 4,
        label:
          "Little control, rarely able to stop behaviors. You can only delay behaviors with much difficulty",
      },
      {
        value: 5,
        label:
          "No control. The drive to carry out behaviors is completely overpowering, or even involuntary. You are rarely able to delay the behaviors even momentarily",
      },
    ],
  },
  {
    id: 4,
    name: "Distress from Compulsions",
    prompt:
      "How would you feel if you were prevented or interrupted from performing these behaviors (or avoiding) when you felt you needed to perform them? How distressed would you become?",
    options: [
      { value: 0, label: "No distress" },
      {
        value: 1,
        label:
          "You would become slightly anxious if behaviors or avoidance were prevented",
      },
      {
        value: 2,
        label:
          "Anxiety would definitely increase, but would remain manageable if behaviors or avoidance were prevented",
      },
      {
        value: 3,
        label:
          "You would experience much anxiety if certain behaviors or avoidance were prevented",
      },
      {
        value: 4,
        label:
          "You would experience much anxiety if almost any of these behaviors or avoidance were prevented",
      },
      {
        value: 5,
        label:
          "You experience overwhelming anxiety from any attempt to delay, interrupt, or modify behaviors or avoidance",
      },
    ],
  },
  {
    id: 5,
    name: "Interference from Compulsions",
    prompt:
      "How much do these behaviors or avoidance interfere with your social, school, or work functioning?",
    options: [
      { value: 0, label: "None" },
      {
        value: 1,
        label:
          "Slight interference with social or work activities, but overall performance not impaired",
      },
      {
        value: 2,
        label:
          "Definite interference with social or work activities, but still manageable",
      },
      {
        value: 3,
        label:
          "Significant impairment in one or more (not all) aspects of functioning",
      },
      {
        value: 4,
        label: "Significant impairment in ALL areas of functioning",
      },
      {
        value: 5,
        label: "Incapacitating. Limits life activities in ALL areas",
      },
    ],
  },
];
