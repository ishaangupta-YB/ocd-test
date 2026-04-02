import type { SeverityQuestion } from "@/lib/test-types";

export const partBInstructions =
  "Please answer the following questions regarding the unwanted thoughts, images, or urges that you indicated experiencing in Part A by selecting the option that is most consistent with your experience during the past 30 days, circling the most appropriate number from 0 to 5. You may refer back to your responses to Part A if needed.";

export const partBQuestions: SeverityQuestion[] = [
  {
    id: 1,
    name: "Time Occupied by Obsessions",
    prompt: "How much of your time is occupied by these thoughts?",
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
    name: "Obsession-Free Interval",
    prompt:
      "On average, what is the longest continuous period or block of time during which you are free of these thoughts?",
    options: [
      { value: 0, label: "No obsessive thoughts" },
      { value: 1, label: "More than 8 consecutive hours per day" },
      { value: 2, label: "Between 3 and 8 consecutive hours per day" },
      { value: 3, label: "Between 1 and 3 consecutive hours per day" },
      { value: 4, label: "Between a few minutes and 1 hour" },
      { value: 5, label: "Constant or nearly constant" },
    ],
  },
  {
    id: 3,
    name: "Control Over Obsessions",
    prompt:
      "How much control do you feel you have over these thoughts? How successfully can you stop or ignore them when they occur?",
    options: [
      { value: 0, label: "Complete control, can dismiss completely" },
      { value: 1, label: "Much control, usually able to stop or ignore" },
      {
        value: 2,
        label:
          "Moderate control, often able to stop or ignore, but may require some effort/concentration",
      },
      {
        value: 3,
        label:
          "Some control, sometimes able to stop or ignore thoughts with much effort/concentration",
      },
      {
        value: 4,
        label:
          "Little control, rarely able to stop or ignore thoughts, and even then only with much difficulty",
      },
      {
        value: 5,
        label: "No control. Rarely able to even let go of thoughts for a moment",
      },
    ],
  },
  {
    id: 4,
    name: "Distress from Obsessions",
    prompt: "How much distress, anxiety, or upset do these thoughts cause you?",
    options: [
      { value: 0, label: "No distress" },
      { value: 1, label: "Slightly disturbing" },
      { value: 2, label: "Definitely disturbing, but still manageable" },
      { value: 3, label: "Often highly disturbing and difficult to manage" },
      {
        value: 4,
        label:
          "Most or even all thoughts are highly disturbing and difficult to manage",
      },
      {
        value: 5,
        label:
          "All or nearly all thoughts are highly disturbing. Overwhelming and disabling distress whenever a thought occurs",
      },
    ],
  },
  {
    id: 5,
    name: "Interference from Obsessions",
    prompt:
      "How much do these thoughts interfere with your social, school, or work functioning?",
    options: [
      { value: 0, label: "No interference" },
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
          "Significant impairment in one or more (but not all) aspects of functioning",
      },
      {
        value: 4,
        label: "Significant impairment in ALL areas of functioning",
      },
      { value: 5, label: "Incapacitating" },
    ],
  },
];
