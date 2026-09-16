export const HERO = {
  headline: "Six months from now, someone will ask why.",
  support:
    "Decision Log records what your team decided, who decided it, and the reasoning behind it. Months later you open the log and read that reasoning in the words of the person who made the call.",
};

export const PROBLEM = {
  heading: "Most of what your team decides lives in a thread nobody can find.",
  paragraphs: [
    "A call gets made on a Tuesday afternoon. Four people agree, someone ships it, and the reasoning stays where it was argued. Nobody writes it down, because on Tuesday afternoon everybody already knows.",
    "A year later the person who made the call has moved on, or the constraint that forced their hand has gone away, and the decision looks arbitrary. So someone reopens it, and the team spends an afternoon rebuilding an argument it already had and already won.",
    "Writing the reasoning down takes two minutes on the day you decide, while it is still in your head. It holds for years.",
  ],
};

export const QUESTIONS = [
  {
    term: "What we decided",
    definition: "The call itself, in the words the team actually used.",
  },
  {
    term: "Why",
    definition: "The reasoning. This decays fastest and it is the reason to keep a log at all.",
  },
  {
    term: "When",
    definition: "The day the team committed, which is rarely the day someone wrote it up.",
  },
  {
    term: "Whether it still holds",
    definition:
      "Active, superseded or reversed. A decision that stopped holding keeps its place in the log and says so.",
  },
];

export const PROMISES = [
  {
    term: "Alternatives considered",
    definition:
      "Record what you turned down alongside what you chose, so the next person can see the shape of the decision rather than its outcome.",
  },
  {
    term: "Capture from Slack",
    definition: "React to a message and the decision lands in the log with the thread attached.",
  },
  {
    term: "Markdown export",
    definition:
      "Every decision writes out as a file, so your handbook and your onboarding docs stay true to what the team actually settled.",
  },
  {
    term: "Read a teammate",
    definition:
      "Filter the log by one person and read how they think, before you hand them the next call.",
  },
];

export const CLOSING = {
  heading: "Start with the last thing you decided.",
  support:
    "The demo opens on two years from a team that sells route planning software to waste collection firms. Change a status, add a decision of your own, and see how it reads.",
};

export const FOOTER =
  "Decision Log is a demonstration. Everything you type stays in your browser and goes away when you refresh.";
