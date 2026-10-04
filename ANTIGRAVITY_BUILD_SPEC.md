# HackPulse Jaipur — Business Operations Agent
## Antigravity Implementation Specification

> **Purpose:** Build a polished, hackathon-ready prototype of a Business Operations Agent for small businesses.
>
> **Primary goal:** A business owner should be able to open the application and immediately answer:
> - Where do we stand?
> - What changed?
> - What needs attention?
> - Who has the ball?
> - What are we waiting on?
> - What should I do next?
>
> **Important:** This is a prototype/demo. Use synthetic/demo data. Do not connect to real business systems, send messages, modify records, or perform real-world writes.

---

# 1. Product Vision

Build an AI-powered **Business Operations Copilot** that converts scattered operational information into a single actionable dashboard.

The application should feel like an intelligent operations manager rather than a generic chatbot.

Instead of making the user ask:
> "What is happening in my business?"

the application should proactively show:

1. **Business health**
2. **Important changes**
3. **Tasks requiring attention**
4. **Delayed/waiting items**
5. **Ownership**
6. **Recommended next actions**
7. **Natural-language explanations**

The prototype should demonstrate how an agent can reason over structured business data and turn it into decisions.

---

# 2. Target User

Primary user:

- Small-business owner
- Operations manager
- Startup founder
- Store/restaurant/service-business manager

The user is busy and does not want to inspect multiple tools.

The product should therefore prioritize:

- clarity
- speed
- actionability
- trust
- explainability
- minimal clicks

---

# 3. Core Product Concept

The application has five conceptual layers:

```text
Demo Business Data
        ↓
Data / Adapter Layer
        ↓
Operations Intelligence Layer
        ↓
Agent / Recommendation Layer
        ↓
Operations Dashboard + Copilot UI
```

The UI should make this pipeline feel seamless.

---

# 4. Prototype Scope

## MUST HAVE

### A. Operations Dashboard

Show:

- Overall business status
- Revenue/orders/operations snapshot
- Open tasks
- Overdue items
- Waiting items
- Recent changes
- Critical alerts
- Recommended actions

### B. Business Switcher

Support at least two synthetic businesses.

Example:

- Sunrise Café
- Jaipur Tech Services

The user can switch between them and the entire dashboard updates.

### C. Operations Health

Create a simple health score, for example:

```text
Operations Health
82 / 100
Healthy
```

Break the score into:

- Revenue
- Orders / Workload
- Tasks
- Delays
- Customer issues

Use clear visual indicators.

### D. "What Changed?"

Show important changes since the previous period.

Examples:

```text
Orders increased 18%
3 tasks became overdue
Supplier delivery is delayed
Customer complaints increased
Team workload shifted to Rahul
```

Each change should explain:

- What changed
- Why it matters
- Recommended action

### E. "Needs Attention"

Prioritize issues.

Example:

```text
HIGH
Supplier delivery delayed by 2 days
Owner: Operations

MEDIUM
12 unresolved customer requests
Owner: Support

LOW
Weekly inventory review pending
Owner: Manager
```

### F. "Who's Got the Ball?"

Show ownership.

Columns:

```text
Person | Task | Status | Due | Priority
```

Example:

```text
Rahul | Confirm supplier | Waiting | Today | High
Priya | Resolve complaint | In Progress | Today | Medium
Amit  | Inventory review | Pending | Tomorrow | Low
```

### G. "Waiting On"

Create a dedicated section for blocked/waiting work.

Examples:

- Waiting for supplier confirmation
- Waiting for customer payment
- Waiting for employee response
- Waiting for approval

Show:

```text
Item
Waiting since
Responsible person
Expected next step
```

### H. AI Operations Copilot

Add a conversational interface.

The user should be able to ask:

```text
How are we doing?

What changed today?

What needs my attention?

Why is our health score down?

Who is overloaded?

What are we waiting for?

What should I do first?

Summarize today's operations.
```

The AI response should use the current demo business data.

For the prototype, this can be implemented using deterministic/mock reasoning rather than requiring a live LLM API.

### I. Recommended Actions

The system should produce actionable recommendations.

Example:

```text
Recommended next action

Contact supplier regarding delayed delivery.

Why:
The delivery is already 2 days late and may affect
tomorrow's orders.

Impact:
High
```

Do NOT actually send the message.

Use:

```text
[Review Action]
```

instead of:

```text
[Send]
```

---

# 5. Differentiating Feature

The main differentiator should be:

## "From Dashboard to Decision"

Most dashboards only display information.

This application should:

```text
Data
 ↓
Detect change
 ↓
Understand impact
 ↓
Prioritize
 ↓
Assign ownership
 ↓
Recommend next action
```

For every important issue, display:

```text
WHAT HAPPENED
WHY IT MATTERS
WHO OWNS IT
WHAT SHOULD HAPPEN NEXT
```

This should be the central UX principle.

---

# 6. UI / UX Specification

## Overall Style

Build a modern SaaS-style dashboard.

Visual direction:

- Premium
- Minimal
- Professional
- Clean
- Slightly futuristic
- AI-powered but not gimmicky

Avoid:

- Excessive gradients
- Excessive animations
- Huge cards
- Clutter
- Generic chatbot-only interface

Use:

- White/light neutral background OR sophisticated dark mode
- Strong typography
- Rounded cards
- Subtle borders
- Clear spacing
- Small status badges
- Simple charts
- Consistent icons

---

# 7. Application Layout

Use a desktop-first layout.

```text
┌──────────────────────────────────────────────────────────────┐
│ Logo       Business ▼          Search       Notifications 👤 │
├──────────────┬───────────────────────────────────────────────┤
│              │                                               │
│ Dashboard    │  Good morning, Owner                          │
│              │  Here's what needs your attention.            │
│ Overview     │                                               │
│              │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │
│ Changes      │  │ Health │ │ Revenue│ │ Tasks  │ │Waiting │ │
│              │  └────────┘ └────────┘ └────────┘ └────────┘ │
│ Attention    │                                               │
│              │  ┌──────────────────┐ ┌────────────────────┐ │
│ Ownership    │  │ What Changed?     │ │ Needs Attention    │ │
│              │  │                  │ │                    │ │
│ Waiting      │  │ • ...            │ │ 🔴 ...             │ │
│              │  │ • ...            │ │ 🟡 ...             │ │
│ Copilot      │  │ • ...            │ │                    │ │
│              │  └──────────────────┘ └────────────────────┘ │
│              │                                               │
│              │  ┌───────────────────────────────────────────┐│
│              │  │ Recommended Next Actions                  ││
│              │  └───────────────────────────────────────────┘│
└──────────────┴───────────────────────────────────────────────┘
```

---

# 8. Sidebar

Sidebar items:

```text
● Overview
○ Changes
○ Needs Attention
○ Ownership
○ Waiting On
○ Copilot
```

At the bottom:

```text
Demo Mode
Synthetic Data
NO SEND / NO WRITE
```

This reinforces that the application is safe for demonstration.

---

# 9. Top Navigation

Top bar should include:

### Business selector

Example:

```text
Sunrise Café ▼
```

Dropdown:

```text
Sunrise Café
Jaipur Tech Services
```

### Date

Example:

```text
October 4, 2026
```

### Notification icon

Show number of important alerts.

### User profile

Use:

```text
Owner
```

No authentication is required for the prototype.

---

# 10. Dashboard Hero Section

Display:

```text
Good morning, Owner.

Here's what needs your attention today.
```

Under it:

```text
Operations Health
82 / 100
Healthy

↓ 4 points from yesterday
```

Include a small explanation:

```text
Health decreased mainly because of supplier delay
and 3 overdue tasks.
```

---

# 11. KPI Cards

Create four primary cards:

### Operations Health

```text
82
/ 100

Healthy
↓ 4%
```

### Revenue

```text
₹1.84L

+12.4%
vs last week
```

### Open Tasks

```text
18

3 overdue
```

### Waiting On

```text
5

2 high priority
```

The values should come from the demo dataset.

---

# 12. "What Changed?" Component

Create a prominent card.

Title:

```text
What Changed?
```

Each item:

```text
↑ Orders increased 18%
Compared with last week
Impact: Positive
```

```text
⚠ Supplier delivery delayed
Expected delivery moved from Oct 3 → Oct 5
Impact: High
```

```text
↓ Support response time worsened
Average response increased by 21%
Impact: Medium
```

Clicking an item opens a detail drawer/modal.

---

# 13. "Needs Attention" Component

Use priority levels:

```text
Critical
High
Medium
Low
```

Example:

```text
HIGH
Supplier delivery delayed

2 days overdue
Owner: Operations

[View Issue]
```

Another:

```text
MEDIUM
Customer requests unresolved

12 open requests
Owner: Support

[View Issue]
```

---

# 14. Ownership View

Create a table:

| Owner | Work | Status | Due | Priority |
|---|---|---|---|---|
| Rahul | Supplier confirmation | Waiting | Today | High |
| Priya | Customer complaint | In Progress | Today | Medium |
| Amit | Inventory review | Pending | Tomorrow | Low |

Add small workload indicators.

Example:

```text
Rahul
████████░░ 80%
```

The goal is to help answer:

> "Who has the ball?"

---

# 15. Waiting On View

Display waiting items as cards.

Each card:

```text
Waiting for supplier confirmation

Since:
Oct 2

Owner:
Rahul

Impact:
High

Next expected event:
Supplier response

[View Context]
```

---

# 16. Copilot UI

The Copilot should feel integrated with the dashboard.

Do not make it a generic full-screen ChatGPT clone.

Use a right-side panel or dedicated page.

Header:

```text
Operations Copilot
Your business, explained.
```

Suggested prompts:

```text
How are we doing?
What changed?
What needs attention?
Why is health down?
Who is overloaded?
What should I do first?
```

When the user clicks a suggestion, generate a response from the current demo data.

Example:

```text
You asked:
What should I do first?

Copilot:

Your highest-impact action is to follow up on the
supplier delay.

Why:
• Delivery is 2 days late
• It affects tomorrow's orders
• Rahul is waiting for confirmation

Recommended:
Review the supplier follow-up.

[Review Action]
```

---

# 17. AI Response Design

Every important AI answer should follow:

```text
Answer
↓
Evidence
↓
Reasoning
↓
Action
```

Example:

```text
Your operations are stable, but there are 3 issues
worth addressing today.

Evidence:
• 3 overdue tasks
• Supplier delivery delayed 2 days
• Support response time increased 21%

Priority:
1. Supplier delay
2. Overdue customer issue
3. Support workload

Recommended first step:
Confirm the supplier delivery timeline.
```

Avoid vague AI language.

---

# 18. Data Architecture

Use a clean data model.

Suggested structure:

```text
src/
  components/
  pages/
  data/
  services/
  agent/
  utils/
```

Demo data:

```text
data/
  businesses.js
  tasks.js
  changes.js
  metrics.js
  alerts.js
```

Business object:

```javascript
{
  id: "sunrise-cafe",
  name: "Sunrise Café",
  type: "Restaurant",
  location: "Jaipur",
  metrics: {},
  tasks: [],
  alerts: [],
  changes: [],
  waitingItems: []
}
```

---

# 19. Agent Architecture

Create a lightweight agent service.

Suggested modules:

```text
agent/
  operationsAgent.js
  healthScore.js
  changeDetector.js
  priorityEngine.js
  recommendationEngine.js
  copilot.js
```

Responsibilities:

### healthScore.js

Calculate business health.

Example:

```text
Health =
Revenue health
+ Task health
+ Delay health
+ Customer health
+ Workload health
```

Normalize to 0–100.

### changeDetector.js

Compare current vs previous data.

Return:

```javascript
{
  type: "supplier_delay",
  title: "Supplier delivery delayed",
  impact: "high",
  explanation: "...",
  metricChange: "2 days"
}
```

### priorityEngine.js

Rank issues.

Factors:

- urgency
- business impact
- deadline
- dependency
- owner availability

### recommendationEngine.js

Turn issues into actions.

Example:

```javascript
{
  action: "Confirm supplier delivery",
  reason: "...",
  impact: "high",
  owner: "Rahul"
}
```

### copilot.js

Interpret simple user intents.

Support:

```text
status
changes
attention
ownership
waiting
recommendation
health
summary
```

The prototype does not require a real LLM API.

---

# 20. Demo Data

Create realistic but synthetic data.

## Business 1: Sunrise Café

Metrics:

```text
Revenue: ₹1,84,000
Orders: 428
Open Tasks: 18
Overdue: 3
Waiting: 5
Health: 82
```

Changes:

```text
Orders increased 18%
Revenue increased 12.4%
Supplier delivery delayed 2 days
Support response time increased 21%
```

Tasks:

```text
Confirm milk supplier delivery
Resolve customer complaint
Review inventory
Update weekend staffing
Approve purchase order
```

---

## Business 2: Jaipur Tech Services

Metrics:

```text
Monthly Revenue: ₹4,82,000
Active Projects: 7
Open Tasks: 26
Overdue: 4
Waiting: 6
Health: 76
```

Changes:

```text
Project workload increased
Two client approvals delayed
One project is at risk
Support tickets decreased
```

The two businesses should have noticeably different data and operational problems.

---

# 21. Interaction Requirements

The prototype should support:

### Business switching

Changing the business must update:

- KPIs
- health
- changes
- alerts
- tasks
- ownership
- waiting items
- copilot answers

### Issue details

Clicking an alert should open a modal/drawer containing:

```text
Issue
What happened
Evidence
Business impact
Owner
Recommended action
```

### Filters

At minimum:

```text
All
Critical
High
Medium
Low
```

### Search

Allow searching tasks/issues.

### Copilot suggestions

Clicking suggestions should populate the response.

---

# 22. Responsive Design

Desktop is the primary hackathon presentation target.

Still support:

- tablet
- mobile

On mobile:

```text
Sidebar → bottom navigation / menu
Cards → stacked
Tables → cards
Copilot → full screen
```

Do not let content overflow horizontally.

---

# 23. Animations

Use subtle animations only.

Examples:

- KPI number fade-in
- card hover
- modal transition
- sidebar transition
- health score animation

Do NOT over-animate.

The product should feel reliable and professional.

---

# 24. Accessibility

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- readable contrast
- accessible buttons
- aria labels where appropriate

Do not rely only on color to communicate priority.

---

# 25. Technical Requirements

Use the existing project structure if one exists.

Before modifying the project:

1. Inspect the repository.
2. Identify the current framework.
3. Identify the package manager.
4. Identify the existing entry point.
5. Identify reusable components.
6. Preserve useful existing code.
7. Do not unnecessarily rewrite the entire repository.

Prefer the project's existing technology stack.

If no frontend exists, use:

```text
React
Vite
JavaScript/TypeScript
CSS or Tailwind
```

Use a component-based architecture.

---

# 26. Important Prototype Constraint

This application must remain:

```text
DEMO MODE
SYNTHETIC DATA
NO SEND
NO WRITE
```

Do NOT implement:

- real email sending
- real WhatsApp sending
- real payment actions
- database writes
- CRM modifications
- external business-system writes
- destructive actions

If an action appears executable, make it:

```text
Review Action
```

or:

```text
Preview
```

---

# 27. Recommended Folder Structure

Adapt to the existing repository, but aim for something similar to:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Topbar
│   │   └── BusinessSelector
│   │
│   ├── dashboard/
│   │   ├── HealthCard
│   │   ├── MetricCard
│   │   ├── ChangesCard
│   │   ├── AttentionCard
│   │   ├── OwnershipCard
│   │   └── WaitingCard
│   │
│   ├── copilot/
│   │   ├── CopilotPanel
│   │   ├── SuggestedPrompt
│   │   └── CopilotResponse
│   │
│   └── common/
│       ├── Badge
│       ├── Button
│       ├── Modal
│       └── EmptyState
│
├── pages/
│   ├── Dashboard
│   ├── Changes
│   ├── Attention
│   ├── Ownership
│   ├── Waiting
│   └── Copilot
│
├── data/
│   ├── businesses
│   ├── metrics
│   ├── tasks
│   ├── alerts
│   └── changes
│
├── agent/
│   ├── operationsAgent
│   ├── healthScore
│   ├── changeDetector
│   ├── priorityEngine
│   ├── recommendationEngine
│   └── copilot
│
└── App
```

---

# 28. Implementation Plan

## Phase 1 — Repository Inspection

Before coding:

- inspect repository
- understand current structure
- identify frontend
- identify build system
- identify dependencies
- run the application
- inspect existing UI
- determine what can be reused

Do not start by blindly creating files.

---

# Phase 2 — Application Skeleton

Create:

- app shell
- sidebar
- top navigation
- business selector
- page routing/state
- responsive layout

First objective:

> The application should open successfully and have the correct navigation structure.

---

# Phase 3 — Demo Data

Create the two synthetic businesses.

Implement:

```text
Sunrise Café
Jaipur Tech Services
```

Ensure all dashboard components read from the selected business.

Do not hardcode the same values directly into UI components.

---

# Phase 4 — Operations Intelligence

Implement:

1. Health score
2. Change detection
3. Priority ranking
4. Waiting detection
5. Ownership analysis
6. Recommendation engine

These should be separate functions/modules.

---

# Phase 5 — Dashboard

Build:

- Hero
- Health card
- KPI cards
- What Changed
- Needs Attention
- Ownership
- Waiting On
- Recommended Actions

Prioritize visual polish.

---

# Phase 6 — Copilot

Implement the operations copilot.

Start with deterministic intent handling.

Example:

```javascript
if intent === "status"
    return businessSummary()

if intent === "changes"
    return recentChanges()

if intent === "attention"
    return highestPriorityIssues()

if intent === "ownership"
    return ownershipSummary()

if intent === "waiting"
    return waitingSummary()

if intent === "recommendation"
    return recommendedAction()
```

Then connect the UI to it.

---

# Phase 7 — Interactions

Implement:

- business switching
- filters
- issue modal
- recommendation preview
- copilot suggested prompts
- navigation
- search

---

# Phase 8 — Visual Polish

Improve:

- typography
- spacing
- hierarchy
- card design
- status badges
- charts
- empty states
- loading states
- hover states
- transitions

The dashboard should look competition-ready.

---

# Phase 9 — Demo Flow

Create a smooth 2–3 minute demo.

Recommended flow:

### Step 1

Open dashboard.

Show:

> "Operations Health: 82"

### Step 2

Point to:

> "What Changed?"

Explain that the system detected the supplier delay automatically.

### Step 3

Open the issue.

Show:

```text
What happened
Why it matters
Who owns it
What to do next
```

### Step 4

Go to:

> "Who's Got the Ball?"

Show ownership and workload.

### Step 5

Go to:

> "Waiting On"

Show dependencies/blockers.

### Step 6

Open Copilot.

Ask:

> "What should I do first?"

Show the prioritized recommendation.

### Step 7

Switch to Jaipur Tech Services.

Show that the entire operational picture changes.

This demonstrates that the system is not a static dashboard.

---

# 29. Critical UX Principle

Every screen should answer a business question.

| Screen | Question |
|---|---|
| Overview | Where do we stand? |
| Changes | What changed? |
| Attention | What needs attention? |
| Ownership | Who has the ball? |
| Waiting | What are we waiting on? |
| Copilot | What should I do? |

If a UI element does not help answer one of these questions, consider removing it.

---

# 30. Demo Storytelling

The product story should be:

```text
Businesses already have data.

The problem is not lack of data.

The problem is knowing what matters.

Our agent watches the operational picture,
detects meaningful changes,
understands their impact,
identifies ownership,
finds blockers,
and recommends the next action.
```

The key message:

> **"Don't just show me my business. Tell me what needs my attention."**

---

# 31. Quality Checklist

Before considering the prototype complete, verify:

## Functionality

- [ ] Application starts without errors
- [ ] Dashboard loads
- [ ] Business switcher works
- [ ] Both businesses have different data
- [ ] KPI cards update
- [ ] Health score updates
- [ ] Changes update
- [ ] Attention list updates
- [ ] Ownership updates
- [ ] Waiting items update
- [ ] Copilot responds
- [ ] Suggested prompts work
- [ ] Issue details open
- [ ] Filters work
- [ ] Search works

## UI

- [ ] No broken layouts
- [ ] No horizontal overflow
- [ ] Consistent spacing
- [ ] Consistent typography
- [ ] Clear priority indicators
- [ ] Responsive behavior
- [ ] Professional visual hierarchy
- [ ] Loading states where necessary
- [ ] Empty states where necessary

## Safety

- [ ] All data is synthetic
- [ ] No real credentials
- [ ] No real business integrations
- [ ] No external write operations
- [ ] No messages are actually sent
- [ ] Actions are preview/review only

---

# 32. Performance

Keep the prototype lightweight.

Avoid:

- unnecessary dependencies
- huge libraries
- excessive network calls
- complicated state management

For demo data, local/static data is preferred.

The application should feel instantaneous.

---

# 33. Error Handling

The UI should never show raw JavaScript errors.

Use friendly messages such as:

```text
Something went wrong while loading this view.
Try again.
```

For missing data:

```text
No operational data available.
```

For empty tasks:

```text
You're all caught up.
```

---

# 34. Final Antigravity Execution Instructions

Follow this sequence strictly:

```text
1. Inspect repository
2. Run existing application
3. Identify current architecture
4. Preserve useful existing code
5. Establish application shell
6. Add synthetic business data
7. Implement business state/switching
8. Implement operations intelligence
9. Build dashboard
10. Build Changes view
11. Build Attention view
12. Build Ownership view
13. Build Waiting view
14. Build Copilot
15. Add interactions
16. Add responsive behavior
17. Polish UI
18. Test all flows
19. Fix errors
20. Run final production/build check
```

Do not jump directly to visual polishing before the data and interaction model works.

---

# 35. Definition of Done

The implementation is complete when a user can:

```text
Open application
      ↓
Select a business
      ↓
See business health
      ↓
Understand what changed
      ↓
See what needs attention
      ↓
See who owns each issue
      ↓
See what is blocked/waiting
      ↓
Ask the Copilot
      ↓
Receive an evidence-based recommendation
      ↓
Review the proposed action
```

without needing any real external integration.

The final result should look like a **real Business Operations Agent product**, not a collection of disconnected demo screens.

---

# 36. Priority Order

If time is limited, implement in this exact priority:

### P0 — Must work

1. Dashboard
2. Business switching
3. Health score
4. What Changed
5. Needs Attention
6. Ownership
7. Waiting On
8. Copilot
9. Recommended action

### P1 — Important polish

10. Issue details
11. Filters
12. Search
13. Responsive design
14. Animations
15. Empty/loading states

### P2 — Optional

16. Charts
17. Advanced analytics
18. More businesses
19. More sophisticated natural-language understanding
20. Additional integrations

Do not sacrifice P0 functionality for P2 features.

---

# 37. Final Product Positioning

Name the prototype appropriately, for example:

## OpsPulse

Possible tagline:

> **Your business, explained.**

Alternative:

> **Know what changed. Know what matters. Know what to do next.**

The UI should reinforce this positioning throughout the product.

---

# FINAL INSTRUCTION TO ANTIGRAVITY

Build the application described in this document as a cohesive product.

Do not merely create mock screens.

The dashboard, intelligence layer, business data, ownership model, waiting model, recommendations, and Copilot must be connected.

The final prototype should make the following experience obvious within 30 seconds:

> **"This agent understands my business operations and tells me what I should care about next."**

Prioritize a working, polished, believable prototype over unnecessary complexity.

Use synthetic data only.

Maintain **NO SEND / NO WRITE** throughout the prototype.
