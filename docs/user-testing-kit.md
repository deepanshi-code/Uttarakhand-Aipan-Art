# User Testing Kit: Uttarakhand Aipan Art

A ready-to-run plan for testing both sites with 5 people. Print this, or keep it open on a laptop while the participant uses a phone.

**Live site:** <https://deepanshi-code.github.io/Uttarakhand-Aipan-Art/>

---

## 1. What you are trying to learn

1. Can people **find and choose a product** within a budget?
2. Do people **understand what Aipan is** after a short visit?
3. Can people **contact the shop** about a specific product?
4. Which design, **traditional (Devbhoomi)** or **modern (Kumaon)**, do people prefer, and why?

Write your own answers to these as hypotheses *before* testing (for example: "I expect most people to prefer Kumaon because…"). Comparing hypotheses with results makes a stronger report.

## 2. Participants

- **How many:** 5. Usability research commonly finds that around 5 users uncover most major problems in a design; it is a rule of thumb, not a guarantee.
- **Who:** people who buy gifts, decor or handicrafts. Mix ages if you can. Avoid classmates who already know this project; if you must include one, mark them in your results.
- **IDs:** call them P1–P5. Do **not** record names, phone numbers or other personal data.
- **Order:** give odd-numbered participants (P1, P3, P5) the Devbhoomi tasks first and even-numbered participants Kumaon first, so the first site isn't always favoured.

## 3. Before you start: checklist

- [ ] Test on a **phone**, ideally the participant's own, with the live link open.
- [ ] Check that WhatsApp is installed if you want to observe Task 3 fully. (The demo button opens WhatsApp's chat picker; ask the participant to stop there and not send anything.)
- [ ] Have a stopwatch (phone timer) and this sheet ready.
- [ ] Ask permission before any screen or audio recording. Notes alone are fine.

## 4. Script (read aloud)

> "Thanks for helping. I'm testing two prototype websites I made for small Aipan art businesses from Uttarakhand. I'm testing the **websites, not you**: if something is confusing, that's exactly what I need to find out.
>
> Please **think aloud**: say what you're looking at, what you expect, and anything that surprises you. Some content, like prices and contact details, is sample data.
>
> I'll give you a few short tasks. I won't help during a task, but you can stop at any time. Is it okay if I take notes? [Ask separately about recording.]"

## 5. Tasks

Read each task, start the timer, and stay quiet. Stop the timer when the participant succeeds, gives up, or after **3 minutes**.

| # | Start on | Say | Counts as success |
|---|---|---|---|
| T1 | Kumaon home | "You want a gift under ₹1,000 for a colleague. Find one you'd consider and tell me its price." | Names a product under ₹1,000 (e.g. coasters ₹450, tote ₹650, gift box ₹990) |
| T2 | Devbhoomi home | "A friend asks you what Aipan is. Use the site to find out what it is and what it's painted with." | Mentions red clay (Geru) and rice paste (Biswar), or equivalent |
| T3 | Devbhoomi home | "You like the Goddess Lakshmi Chowki. Ask the shop about it." | Opens the product and reaches WhatsApp **or** the contact form (stop before sending) |
| T4 | Kumaon home | "Find out where the studio is." | Finds the address or map on the Contact page |
| T5 | Kumaon home | "Your company wants 50 gift sets. Start an enquiry." | Fills in the contact form and picks a suitable inquiry type |
| T6 | Landing page | "Look at each site's home page for about 30 seconds. Which shop would you rather buy from, and why?" | (Opinion: record the choice and the reasons) |

**After each task**, ask: *"On a scale of 1 to 5, how easy was that? (1 = very hard, 5 = very easy)"*

### What to note during tasks

- Where they tapped first, and any wrong turns
- Hesitations ("um…", scrolling back and forth)
- Exact quotes, especially surprises or complaints
- Anything that looked broken

## 6. After the tasks

### System Usability Scale (SUS)

Ask the participant to rate each statement from **1 (strongly disagree)** to **5 (strongly agree)**, thinking about the site they used most.

1. I think that I would like to use this website frequently.
2. I found the website unnecessarily complex.
3. I thought the website was easy to use.
4. I think that I would need the support of a technical person to be able to use this website.
5. I found the various functions in this website were well integrated.
6. I thought there was too much inconsistency in this website.
7. I would imagine that most people would learn to use this website very quickly.
8. I found the website very cumbersome to use.
9. I felt very confident using the website.
10. I needed to learn a lot of things before I could get going with this website.

**Scoring:** for odd items, subtract 1 from the answer; for even items, subtract the answer from 5. Add the ten results and multiply by 2.5, giving a score from 0 to 100. A score around **68** is commonly cited as average; check this against a published source before quoting it in your report.

### Open questions

1. "What was the most confusing moment?"
2. "What did you like most?"
3. "If you could change one thing, what would it be?"
4. "Would you trust this shop enough to buy from it? Why or why not?"

## 7. Results sheet (one per participant)

**Participant:** P__  **Device:** __________  **Order:** Devbhoomi first / Kumaon first  **Knew the project?** Y / N

| Task | Success (Y / Partial / N) | Time (s) | Ease (1–5) | Wrong turns / notes |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | |
| T4 | | | | |
| T5 | | | | |

**T6 preference:** Devbhoomi / Kumaon  **Reasons:**

**SUS answers (1–10):** __ __ __ __ __ __ __ __ __ __  **SUS score:** ____

**Quotes:**

## 8. Summarising the results

Fill these in after all sessions.

### Task summary

| Task | Success rate (out of 5) | Average time (s) | Average ease (1–5) |
|---|---|---|---|
| T1 | | | |
| T2 | | | |
| T3 | | | |
| T4 | | | |
| T5 | | | |

**Average SUS:** ____  **T6 preference:** Devbhoomi __ / Kumaon __

### Problems found

List each problem once, with how many participants hit it. Rate severity: **3** = stopped someone finishing a task, **2** = slowed them down or caused errors, **1** = minor annoyance.

| Problem | Seen by (of 5) | Severity (1–3) | Where | Fix idea |
|---|---|---|---|---|
| | | | | |

Fix the problems with the highest *seen by × severity* first. Then, if you can, **re-test with 2–3 new people** to check whether the fixes worked. A before-and-after comparison is strong evidence for your report.

## 9. Lighthouse scores (5 minutes)

1. Open the live site in **Chrome** on a laptop, in an **incognito window** (Ctrl + Shift + N) so extensions don't affect the results.
2. Press **F12**, open the **Lighthouse** tab (it may be under the `>>` menu).
3. Select **Mobile** and all four categories, then click **Analyze page load**.
4. Screenshot the scores and note them below. Repeat for each page.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Landing page | | | | |
| Devbhoomi home | | | | |
| Devbhoomi products | | | | |
| Kumaon home | | | | |
| Kumaon products | | | | |

Scores vary a little between runs; run each page twice and record the lower score, or the average.
