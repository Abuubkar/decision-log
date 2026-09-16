import type { Decision } from "./types";

/**
 * Two years of decisions from one made-up company: a small team selling route
 * planning software to independent waste collection firms. The demo opens on
 * these, and Reset demo puts them back.
 */
export const SEED: Decision[] = [
  {
    id: "d11",
    title: "Build the driver handover screen ourselves",
    statement:
      "We are building the end-of-shift handover screen in house instead of buying Shiftly and wrapping it.",
    rationale:
      "Handover is the one screen every driver touches twice a day, and it is where our data model actually differs from everyone else. Buying it saves about five weeks and leaves the most-used screen in the product owned by someone else.",
    decidedOn: "2026-02-09",
    owner: "Priya",
    area: "Product",
    status: "active",
  },
  {
    id: "d10",
    title: "Stop publishing the weekly changelog",
    statement:
      "The changelog goes out when something matters, as an email to the depots it affects.",
    rationale: "Three people opened it last quarter. Two of them work here.",
    decidedOn: "2025-10-16",
    owner: "Ellie",
    area: "Product",
    status: "active",
  },
  {
    id: "d9",
    title: "Flat monthly pricing by depot size",
    statement: "One price per band: under ten vehicles, ten to forty, forty and up.",
    rationale:
      "Per-vehicle billing turned every renewal into a negotiation about the vehicle count, and depots kept taking vans off the account over winter. Banding it stops the number moving and renewal takes one email.",
    decidedOn: "2025-07-08",
    owner: "Marcus",
    area: "GTM",
    status: "active",
  },
  {
    id: "d8",
    title: "Freeze hiring until August",
    statement: "No offers until the August board meeting. Both open roles come down.",
    rationale:
      "Eleven months of runway and a pipeline that had gone quiet since February. Waiting costs less than hiring now and having the harder conversation in October.",
    decidedOn: "2025-04-30",
    owner: "Marcus",
    area: "Hiring",
    status: "superseded",
  },
  {
    id: "d7",
    title: "Rewrite the driver app as native Android",
    statement: "The driver app becomes native Android. iOS waits until someone asks for it.",
    rationale:
      "Offline route sync broke worst on the handsets our drivers actually carry, which are four-year-old budget Androids. Seven of our forty depots issue phones at all. Everyone else uses whatever is in their pocket.",
    decidedOn: "2025-02-13",
    owner: "Naz",
    area: "Engineering",
    status: "active",
  },
  {
    id: "d6",
    title: "Hire a support lead before a second salesperson",
    statement: "Support lead first. The sales hire moves to the second half of the year.",
    rationale:
      "Priya spent most of January answering tickets. Another salesperson adds depots to a queue one founder is already clearing by hand at night.",
    decidedOn: "2025-01-22",
    owner: "Marcus",
    area: "Hiring",
    status: "active",
  },
  {
    id: "d5",
    title: "Drop the Redis cache",
    statement: "Route lookups go straight to Postgres. Redis comes out entirely.",
    rationale:
      "The cache saved roughly 80ms on a page nobody complained about and cost us four incidents in three months, every one of them stale route data shown to a driver mid-shift.",
    decidedOn: "2024-11-05",
    owner: "Tom",
    area: "Engineering",
    status: "active",
  },
  {
    id: "d4",
    title: "Turn down the Calderwood pilot",
    statement: "We said no to the forty-vehicle pilot.",
    rationale:
      "They wanted SSO, an audit log, a named account manager and a security review before signing. All of it reasonable for them. It would have made us an enterprise company eighteen months before we had the people, and the pilot fee would not have covered the first requirement.",
    decidedOn: "2024-09-11",
    owner: "Priya",
    area: "GTM",
    status: "active",
  },
  {
    id: "d3",
    title: "Build the driver app in React Native",
    statement: "One React Native codebase covering both platforms.",
    rationale:
      "Three of us wrote React every day and nobody wanted to learn two mobile stacks at once. That held right up until offline sync, which we never got stable on older handsets.",
    decidedOn: "2024-06-27",
    owner: "Tom",
    area: "Engineering",
    status: "reversed",
  },
  {
    id: "d2",
    title: "Bill per vehicle",
    statement: "Pricing is per vehicle on the account, billed monthly.",
    rationale:
      "Depots budget in vehicles, so the invoice matches how they already think. Seat pricing punished them for letting six drivers share two logins, which is what they all do anyway.",
    decidedOn: "2024-05-02",
    owner: "Marcus",
    area: "GTM",
    status: "superseded",
  },
  {
    id: "d1",
    title: "Ship the route editor without drag and drop",
    statement:
      "The route editor is a keyboard-first list. The map shows the result and takes no input.",
    rationale:
      "We watched four depot managers plan a week of routes. All four typed. None touched the map except to check it. Drag and drop was three weeks of work for the demo, not for them.",
    decidedOn: "2024-03-14",
    owner: "Priya",
    area: "Product",
    status: "active",
  },
];
