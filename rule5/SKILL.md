---
name: rule-of-five
description: Apply Jeffrey Emanuel's Rule of Five (popularized by Steve Yegge) — run 5 passes over an artifact (1 draft + 4 refinements), rotating through distinct lenses (Correctness, Clarity, Edge Cases, Excellence) instead of one vague "make it better" pass. Use when the user says "rule of five", "rof", "5-pass review", "five-pass", "review this five times", "run the rule of five on X", "multi-pass review", or asks for iterative/rotating-focus review of code, designs, implementation plans, tests, prompts, proposals, cold emails, or any written artifact.
argument-hint: [artifact or path]
---

Rule of Five
============

**When invoked:** identify the target artifact, pick the right size from the Size Dial below, then run the numbered steps one at a time — announcing each pass, refining the artifact, emitting a short changelist before moving on.

Single-pass "make it better" reviews collapse distinct failure modes into one blurry sweep. The Rule of Five splits the work across 5 passes (1 draft + 4 refinements), each refinement with a named lens. Each lens sees things the others miss.

Applies to: code, implementation plans, design docs, tests, prompts, proposals, cold emails, subject lines, migrations, SQL, skill definitions — any artifact you'd otherwise "polish once and ship." The target can be a file path, a pasted block, or content already live in the conversation (a message you just drafted, a code block you just wrote).

For non-prose artifacts (SQL, config, code), translate the lenses: **CLARITY** = naming, structure, readability; **EDGE CASES** = null/empty/boundary inputs, concurrent writes, partial failures; **EXCELLENCE** = idiomatic style a senior reviewer would sign off on.

---

The Formula (use these prompts verbatim)
-----------------------------------------

### Step 0 — Draft
> Initial attempt at: {target.description}. Don't aim for perfection. Get the shape right. Breadth over depth.

*Skip this step if the artifact already exists. Start at Step 1.*

### Step 1 — CORRECTNESS
> First refinement pass. Focus: CORRECTNESS. Fix errors, bugs, mistakes. Is the logic sound?

### Step 2 — CLARITY
> Second refinement pass. Focus: CLARITY. Can someone else understand this? Simplify. Remove jargon.

### Step 3 — EDGE CASES
> Third refinement pass. Focus: EDGE CASES. What could go wrong? What's missing? Handle the unusual.

### Step 4 — EXCELLENCE
> Final polish. Focus: EXCELLENCE. This is the last pass. Make it shine. Is this something you'd be proud to ship?

Run them in this order. The sequence matters — correctness before clarity (can't simplify wrong logic), edge cases before excellence (don't polish something that breaks on the unhappy path).

---

Execution Rules
---------------

1. **One lens per pass.** Do not merge focuses. If you catch an edge case during the CLARITY pass, note it and address it on pass 3. Mixing lenses reproduces the blurry sweep the formula exists to prevent.
2. **Announce the pass before running it.** Emit a header in this exact form: `## Pass N — LENS` (e.g. `## Pass 2 — CLARITY`). The user should never have to guess which lens is active.
3. **Show a short changelist after each pass.** 2–5 bullets: what changed and why. Not a full diff — the user can read the file. This is the receipt.
4. **Refine, don't rewrite.** Each pass edits the previous output. Starting over defeats the formula.
5. **Converge early when you can.** If a pass produces zero substantive changes twice in a row, stop and declare: "This is about as good as we can make it." Yegge describes this phrase as the agent's natural convergence signal — honor it.
6. **One artifact per run.** If the user points at a directory, a multi-file feature, or "the whole codebase," pick the single most important file, run the formula on it, and propose the rest as follow-up invocations. Rof does not parallelize across files.
7. **Disambiguate the target before pass 1, not permission.** If no clear target is on screen or named, ask one question — "rof on what?" — then start. This is not asking permission; it's fixing an undefined input.

---

Size Dial (how many passes to run)
----------------------------------

- **Small / familiar stack** (a paragraph, a 20-line function, a subject line): 2–3 passes. Pick the two lenses that bite hardest — usually CORRECTNESS + EXCELLENCE for code, CLARITY + EDGE CASES for copy.
- **Medium / default**: full 5 passes (Draft → 4 lenses).
- **Large / unfamiliar stack / high-stakes** (migration SQL, customer-facing copy, architecture doc): full 5 passes. If the first CORRECTNESS pass found real bugs, insert a second CORRECTNESS pass before EXCELLENCE (6 passes total — the rule bends, the naming stays).

Ambiguous which size? Ask the user in one sentence, or infer from the artifact visible on screen.

---

Anti-Patterns (reject these)
----------------------------

- **One-shot all five.** Running all passes in a single output blob defeats the purpose — you lose the per-lens diff and the user can't tell if each focus actually did work.
- **Unnamed passes.** "Let me review this again" is not a pass. Every pass names its lens.
- **Skipping Step 0 when generating from scratch.** The draft is where the shape lives. Jumping straight to "correctness" on an empty page produces over-engineered nothing.
- **Rewriting each pass.** If pass 2 produces an artifact that shares almost no text with pass 1, you're not refining, you're restarting.
- **Vanity lenses.** "Make it more engaging," "make it pop," "make it sound confident" are not lenses — they're vibes. The four named lenses exist because each names a concrete failure mode. Stay inside them.

---

Usage Examples
--------------

- `/rule-of-five on the proposal draft in kaa/sales-call-notes.md`
- `rof this migration SQL`
- `run 5-pass on the cold-email subject lines`
- `review this skill five times` → apply Rule of Five to a SKILL.md
- `rule of five on the plan above` → apply to the most recent plan in context

---

Attribution
-----------

- Origin: Jeffrey Emanuel — formulated the rule and the four-lens progression.
- Popularized by: Steve Yegge — ["Six New Tips for Better Coding With Agents"](https://steve-yegge.medium.com/six-new-tips-for-better-coding-with-agents-d4e9c86e42a9) (Dec 2025) and ["Welcome to Gas Town"](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) (Jan 2026).
- Verbatim prompts from the gastown Rule-of-Five formula, surfaced in [`steveyegge/gastown` discussion #834](https://github.com/steveyegge/gastown/discussions/834).
