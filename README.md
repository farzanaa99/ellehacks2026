# CYBERPINK FINANCE

**Name is a work in progress**

CyberPink Finance is a narrative-driven, educational web game built for hackathon environments. It combines cyberpunk aesthetics, light RPG mechanics, and real-world financial literacy concepts into an interactive experience. Players progress through quests, dialogue, and rewards while learning about budgeting, credit, saving, and financial decision-making.

---

## Project Goals

* Teach foundational financial concepts through gameplay rather than lectures
* Use narrative and choice to make abstract concepts tangible
* Deliver a polished, themed experience within hackathon constraints

---

## Core Gameplay Loop

1. Player starts at the Bank Teller hub
2. Dialogue adapts based on completed quests
3. Player selects and enters the next quest
4. Quest completion updates player state
5. Player returns to Home Base
6. Rewards and new dialogue unlock
7. Loop continues until final quest

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* pnpm

---

## Project Structure (High Level)

```
client/
  src/
    app/            # Providers and app-level setup
    pages/          # Route-level pages (Intro, Base, Map, Quest, End)
    components/     # Reusable UI and game components
    data/           # Dialogue, rewards, quest configuration
    game/           # Types, state logic, helpers
    assets/         # Images and static assets
```

---

## Important Pages

### Intro Page

* Single-use entry page
* Displays lore, warnings, and start button
* Only shown once per session

### Home Base (BasePage)

* Central hub between quests
* Displays robot banker dialogue
* Dialogue changes based on quest progression
* Rewards are granted here

### Quest Pages

* Self-contained quest logic
* On completion, update player state
* Redirect back to Home Base

### End Page

* Final narrative and outcome

---

## Dialogue System

Dialogue is driven by quest progression.

* `getNextQuestId` determines the active quest
* `getHomeBaseDialogue(questId)` returns relevant dialogue
* Dialogue index resets automatically when quest changes
* Fallback dialogue ensures UI stability

This guarantees:

* Players only see dialogue relevant to their current quest
* Past dialogue does not repeat unless intended

---

## Rewards System

Rewards are granted after specific quests.

* Reward logic lives in a single helper function
* Rewards may affect:

  * Inventory
  * Credits
  * Future narrative outcomes

Rewards are intentionally lightweight and symbolic for hackathon scope.

---

## State Management

Global game state is managed via `GameProvider`.

Tracks:

* Player inventory
* Credits
* Completed quests
* Current progression

State updates are explicit and predictable to avoid hidden side effects.

---

## Development Workflow

### Getting Started

1. Install dependencies

```
npm install
```

2. Start the frontend

```
cd client
npm run dev
```

3. Open the app in your browser (Vite will provide the URL)


---

## Hackathon Scope Notes

This project intentionally avoids:

* Authentication
* Backend persistence
* Multiplayer features

---

## Future Improvements (Post-Hackathon)

---

## License

Hackathon prototype. Licensing to be determined.

---
