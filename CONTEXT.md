# Decision Log

A place to record the decisions a team has already made, so that six months later
nobody has to reconstruct the reasoning from memory or re-argue a settled call.

## Language

**Decision**:
A choice a team has already committed to, recorded after the fact. Not a proposal
and not a task.
_Avoid_: Entry, record, item, note, ADR

**Log**:
The full set of Decisions belonging to a team, in one list.
_Avoid_: Timeline, feed, history, board

**Statement**:
What was decided, in the team's own words. The Decision is the choice; the
Statement is how they put it.
_Avoid_: Summary, description, body, content

**Rationale**:
The reasoning behind a Decision. The part that decays fastest and the reason the
product exists.
_Avoid_: Notes, context, justification, description

**Status**:
Where a Decision stands today. Exactly one of Active, Superseded or Reversed.
_Avoid_: State, stage, lifecycle

**Active**:
The Decision still holds. This is the state every Decision starts in.
_Avoid_: Current, live, open

**Superseded**:
The Decision was replaced by a later, better one. The original reasoning was sound
for its moment.
_Avoid_: Replaced, outdated, archived

**Reversed**:
The Decision turned out to be wrong and the team went back on it.
_Avoid_: Undone, cancelled, rejected, revoked

**Owner**:
The person who made the call. One name, not a committee.
_Avoid_: Author, creator, assignee, decider

**Area**:
The part of the business a Decision belongs to, such as Product or Hiring. A
Decision has exactly one.
_Avoid_: Tag, category, label, topic

**Decided on**:
The date the team committed, which is not necessarily the date it was written down.
_Avoid_: Created at, timestamp, date added
