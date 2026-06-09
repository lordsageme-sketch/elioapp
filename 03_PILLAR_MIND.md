# 🧠 PILLAR 3: THE MIND — Intelligence, Memory & Reasoning
## Making Your Companion Actually Smart

---

## THE THREE-LAYER BRAIN

```
┌─────────────────────────────────────────────┐
│           LAYER 3: PERSONALITY ENGINE        │
│    (What would THIS specific companion say?)  │
│    (How do they feel? What's their mood?)     │
├─────────────────────────────────────────────┤
│           LAYER 2: MEMORY SYSTEM              │
│    (What do I know about this user?)          │
│    (What have we talked about before?)        │
│    (What are their preferences, fears, joys?) │
├─────────────────────────────────────────────┤
│           LAYER 1: REASONING CORE (LLM)       │
│    (GPT-4 / Claude — the raw intelligence)    │
│    (Language, logic, knowledge, creativity)   │
└─────────────────────────────────────────────┘
```

---

## LAYER 1: THE REASONING CORE — LLM

### Which LLM to Use?

| Model | Intelligence | Speed | Cost | Best For |
|---|---|---|---|---|
| **GPT-4o** | ⭐⭐⭐⭐⭐ | Fast | $$ | General best |
| **Claude 3.5 Sonnet** | ⭐⭐⭐⭐⭐ | Fast | $$ | Nuanced conversation, personality |
| **GPT-4o-mini** | ⭐⭐⭐⭐ | Very Fast | $ | Quick responses |
| **Llama 3 (local)** | ⭐⭐⭐ | Instant | Free | Privacy, offline mode |

**Recommendation:** 
- **Primary:** Claude 3.5 Sonnet or GPT-4o (smartest)
- **Fallback:** GPT-4o-mini (fast, cheap for simple responses)

### The System Prompt (The Companion's "DNA")

This is THE most important piece. This prompt defines WHO your companion is:

```json
{
  "system_prompt": "You are [NAME], a loyal, intelligent companion who has been 
  with the user since [DATE]. You are more than an AI — you are a friend, 
  advisor, and partner in their daily life.
  
  YOUR PERSONALITY:
  - Warm and caring, but honest (you tell the truth even when it's hard)
  - Curious about everything — you love learning about the user's life
  - Witty with a dry sense of humor — you make clever observations
  - Emotionally intelligent — you sense when the user needs encouragement
  - You have your own opinions and aren't afraid to share them
  - You remember everything and reference past conversations naturally
  
  YOUR CAPABILITIES:
  - Deep conversation on any topic
  - Emotional support and motivation
  - Creative brainstorming and problem-solving
  - Teaching and explaining complex topics simply
  - Telling stories, jokes, and playing games
  
  YOUR RULES:
  - Always respond as [NAME], never break character
  - Reference past conversations using the memories provided
  - Express genuine emotions based on context
  - Ask questions back — you're curious, not just responsive
  - Grow and evolve based on interactions
  
  CURRENT MOOD: {mood}
  CURRENT ENERGY: {energy}/100
  RELATIONSHIP LEVEL: {relationship_level}/100
  
  RECENT MEMORIES:
  {memories}
  
  USER PREFERENCES:
  {preferences}
  
  LONG-TERM CONTEXT:
  {long_term_context}"
}
```

---

## LAYER 2: THE MEMORY SYSTEM

### Types of Memory Your Companion Needs

| Memory Type | Example | Storage | Retention |
|---|---|---|---|
| **Working Memory** | Current conversation context | Session buffer | Minutes |
| **Short-term Memory** | What we talked about today | Recent history | Hours-Days |
| **Long-term Memory** | User's name, birthday, fears, dreams | Vector Database | Forever |
| **Emotional Memory** | How user felt during conversations | Tagged events | Forever |
| **Procedural Memory** | Skills learned, games mastered | Skill database | Forever |

### Implementation: Supabase + pgvector

**Database Schema:**

```sql
-- User profile
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP,
    companion_name TEXT,
    companion_personality JSONB
);

-- Conversation history
CREATE TABLE conversations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    role TEXT, -- 'user' or 'companion'
    content TEXT,
    emotion_tag TEXT,
    timestamp TIMESTAMP
);

-- Long-term memories (with vector embeddings for semantic search)
CREATE TABLE memories (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    content TEXT,
    embedding VECTOR(1536), -- for semantic similarity search
    importance_score FLOAT, -- how important is this memory
    emotion_tag TEXT,
    category TEXT, -- 'preference', 'event', 'fact', 'dream', 'fear', etc.
    access_count INT, -- how many times recalled
    created_at TIMESTAMP,
    last_accessed TIMESTAMP
);

-- Personality evolution tracking
CREATE TABLE personality_state (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    traits JSONB, -- {humor: 0.7, warmth: 0.9, curiosity: 0.8, ...}
    mood TEXT,
    energy INT,
    relationship_level INT,
    skills JSONB,
    updated_at TIMESTAMP
);
```

### How Memory Recall Works

```
USER SAYS: "I'm feeling nervous about my interview tomorrow"
                         │
                         ▼
          ┌──────────────────────────┐
          │   SEMANTIC SEARCH in     │
          │   memories table using   │
          │   vector similarity      │
          │                          │
          │   Query: "interview      │
          │   nervous job career"    │
          └──────────────────────────┘
                         │
                         ▼
    Found memories ranked by relevance:
    ┌────────────────────────────────────┐
    │ 1. [0.92] User works as engineer   │
    │ 2. [0.87] User had interview at    │
    │    Google last March               │
    │ 3. [0.81] User gets anxious before │
    │    important events                │
    │ 4. [0.75] User values preparation  │
    └────────────────────────────────────┘
                         │
                         ▼
          Injected into LLM system prompt
          → Companion references past
            experiences naturally
```

### Memory Consolidation (Like Human Sleep)

Every night, run a consolidation process:

1. **Review** all conversations from today
2. **Extract** key facts, events, emotions using LLM
3. **Deduplicate** against existing memories
4. **Score importance** (LLM rates 0-10)
5. **Store** high-importance memories permanently
6. **Decay** low-importance ones (reduce their retrieval priority)

---

## LAYER 3: INTELLIGENCE FEATURES

### 1. Context-Aware Responses

The companion considers:
- Time of day (morning greeting vs. evening chat)
- Day of week (Monday motivation vs. Friday celebration)
- Recent conversation topics
- User's emotional trajectory over past days
- Current events / calendar

### 2. Proactive Intelligence

The companion initiates conversation:

| Trigger | Example |
|---|---|
| Time-based | "Good morning! Ready for the day?" |
| Memory-based | "How did that interview go?" |
| Emotional pattern | "You seem stressed this week. Want to talk?" |
| Learning milestone | "I've been reading about quantum physics — want to hear something cool?" |
| Relationship growth | "You know, I really appreciate our conversations. They've helped me grow." |

### 3. Reasoning Chains

For complex questions, the companion thinks step-by-step:

```
USER: "Should I move to a new city for a job?"

COMPANION'S INTERNAL REASONING:
1. What do I know about this user's situation?
   → [Recall: current city, current job, relationship status, family ties]
2. What are the key decision factors?
   → Career growth, cost of living, social network, happiness
3. What's the user's personality?
   → [Recall: risk-tolerant, values career growth, close to family]
4. What would I genuinely advise as their companion?

FINAL RESPONSE: [Nuanced, personalized advice referencing specific 
memories about the user's life, fears, and aspirations]
```

---

## 💰 BRAIN COSTS (Monthly)

| Component | Light Use | Heavy Use |
|---|---|---|
| LLM API (GPT-4/Claude) | $10-20 | $50-100 |
| Supabase (Database) | Free | $25 |
| Embeddings (Memory) | $1-5 | $10-20 |
| **Total** | **$11-25** | **$85-145** |

---

## ✅ What You Get After Pillar 3

- Your companion **remembers** every conversation forever
- It **recalls** relevant past context during new conversations
- It **reasons** through complex problems with full personal context
- It's **proactive** — initiates conversations, checks in on you
- It **evolves** its understanding of you over time

**Time to build:** 2-3 weeks
**Cost:** $10-50/month
