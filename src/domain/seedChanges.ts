import type { Change } from "./changes";

/**
 * The history behind the seeded decisions. The interesting entries are the
 * status changes that land on the day another decision was recorded: that is
 * the log quietly showing what replaced what.
 */
export const SEED_CHANGES: Change[] = [
  { id: "h1", decisionId: "d1", kind: "created", at: "2024-03-14", by: "Priya" },
  { id: "h2", decisionId: "d2", kind: "created", at: "2024-05-02", by: "Marcus" },
  { id: "h3", decisionId: "d3", kind: "created", at: "2024-06-27", by: "Tom" },
  { id: "h4", decisionId: "d4", kind: "created", at: "2024-09-11", by: "Priya" },
  {
    id: "h5",
    decisionId: "d4",
    kind: "edited",
    at: "2024-09-13",
    by: "Priya",
    fields: [
      {
        field: "Why",
        from: "They wanted SSO and a security review before signing. Too much for a forty-vehicle pilot.",
        to: "They wanted SSO, an audit log, a named account manager and a security review before signing. All of it reasonable for them. It would have made us an enterprise company eighteen months before we had the people, and the pilot fee would not have covered the first requirement.",
      },
    ],
  },
  { id: "h6", decisionId: "d5", kind: "created", at: "2024-11-05", by: "Tom" },
  { id: "h7", decisionId: "d6", kind: "created", at: "2025-01-22", by: "Marcus" },
  { id: "h8", decisionId: "d7", kind: "created", at: "2025-02-13", by: "Naz" },
  {
    id: "h9",
    decisionId: "d3",
    kind: "status",
    at: "2025-02-13",
    by: "Naz",
    from: "active",
    to: "reversed",
  },
  { id: "h10", decisionId: "d8", kind: "created", at: "2025-04-30", by: "Marcus" },
  { id: "h11", decisionId: "d9", kind: "created", at: "2025-07-08", by: "Marcus" },
  {
    id: "h12",
    decisionId: "d2",
    kind: "status",
    at: "2025-07-08",
    by: "Marcus",
    from: "active",
    to: "superseded",
  },
  {
    id: "h13",
    decisionId: "d8",
    kind: "status",
    at: "2025-08-14",
    by: "Marcus",
    from: "active",
    to: "superseded",
  },
  { id: "h14", decisionId: "d10", kind: "created", at: "2025-10-16", by: "Ellie" },
  {
    id: "h15",
    decisionId: "d7",
    kind: "edited",
    at: "2025-11-03",
    by: "Naz",
    fields: [
      {
        field: "What we decided",
        from: "The driver app becomes native Android.",
        to: "The driver app becomes native Android. iOS waits until someone asks for it.",
      },
      {
        field: "Why",
        from: "Offline route sync kept breaking on older Android handsets.",
        to: "Offline route sync broke worst on the handsets our drivers actually carry, which are four-year-old budget Androids. Seven of our forty depots issue phones at all. Everyone else uses whatever is in their pocket.",
      },
    ],
  },
  { id: "h16", decisionId: "d11", kind: "created", at: "2026-02-09", by: "Priya" },
  {
    id: "h17",
    decisionId: "d9",
    kind: "edited",
    at: "2026-02-20",
    by: "Marcus",
    fields: [{ field: "Title", from: "Flat pricing", to: "Flat monthly pricing by depot size" }],
  },
];
