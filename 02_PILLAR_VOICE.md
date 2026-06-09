# 🗣️ PILLAR 2: THE VOICE — Speech Input & Output
## Making Your Companion Speak Naturally and Hear You Clearly

---

## ARCHITECTURE

```
YOU SPEAK ──► [Whisper STT] ──► Text ──► [LLM Brain] ──► Response Text
                                                          │
                    ◄── [ElevenLabs TTS] ◄── Audio ◄──────┘
                     │
                     ▼
              [Lip Sync] ──► Character Mouth Moves
```

---

## Component 1: Speech-to-Text (Hearing You)
**Tool: OpenAI Whisper API**

| Spec | Detail |
|---|---|
| Accuracy | 95%+ in most languages |
| Latency | ~300-500ms |
| Languages | 99 languages supported |
| Cost | $0.006/minute |

**How it works:**
1. User presses mic button (or companion listens continuously)
2. Audio recorded → sent to Whisper API
3. API returns text transcription
4. Text fed to LLM brain

**No-code integration:** Unity's visual scripting + HTTP request nodes

---

## Component 2: Text-to-Speech (The Companion Speaks)
**Tool: ElevenLabs**

| Spec | Detail |
|---|---|
| Voice Quality | Near-human, emotionally expressive |
| Latency | ~200-400ms |
| Languages | 29 languages |
| Voice Cloning | Can clone any voice from 3 minutes of audio |
| Cost | $5/month (30,000 characters) |

**Why ElevenLabs over alternatives:**
| Competitor | Voice Quality | Emotion | Price |
|---|---|---|---|
| **ElevenLabs** | ⭐⭐⭐⭐⭐ | Excellent | $5/mo |
| OpenAI TTS | ⭐⭐⭐⭐ | Good | Pay-per-use |
| Google Cloud TTS | ⭐⭐⭐ | Decent | Free tier |
| Azure TTS | ⭐⭐⭐⭐ | Good | Free tier |

**How to create your companion's unique voice:**
1. Choose from 100+ preset voices on ElevenLabs, OR
2. Upload 3-5 minutes of audio of a voice you like → Voice Clone, OR
3. Design a custom voice using Voice Design feature

**Recommended voices for a companion:**
- **Rachel** — Warm, friendly, female
- **Adam** — Calm, wise, male
- **Bella** — Young, energetic, female
- **Antoni** — Deep, reassuring, male

---

## Component 3: Real-Time Conversation Flow

```
TIMING DIAGRAM:
───────────────────────────────────────────────────────

User:  "Hey, how are you today?"
       ▓▓▓▓▓▓▓▓▓▓▓                  ← User speaks (1.5s)

       [Whisper processes]           ← STT (0.3s)

       [LLM thinks...]               ← GPT-4 generates (1-2s)

       "I'm doing great! Really      ← TTS generates audio (0.4s)
        excited to talk to you
        today!"

       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ← Companion speaks (2s)
       [Lips move in sync]

Total response time: ~2-3 seconds
───────────────────────────────────────────────────────
```

**To minimize latency:**
- Use **streaming** for both LLM and TTS (start speaking before full response is generated)
- Cache common greetings/responses locally
- Use WebSocket connections instead of REST

---

## Component 4: Voice Activity Detection (VAD)

Your companion needs to know when you're done talking.

**Options:**
| Method | How It Works | No-Code? |
|---|---|---|
| **Push-to-talk button** | User holds mic button | ✅ Yes |
| **Silence detection** | Stop recording after 1s silence | ✅ Yes (Unity plugin) |
| **Smart VAD** | AI detects sentence boundaries | 🟡 Needs plugin |

**Recommendation for Phase 1:** Push-to-talk (simplest, most reliable)
**Phase 2 upgrade:** Automatic silence detection

---

## Component 5: Emotional Voice Modulation

The companion's voice should match its emotional state:

| Emotion | Voice Setting | ElevenLabs Parameter |
|---|---|---|
| Happy | Higher pitch, faster, energetic | stability=0.3, similarity=0.7 |
| Sad | Lower pitch, slower, softer | stability=0.9, similarity=0.5 |
| Excited | Louder, faster, varied pitch | stability=0.2, similarity=0.8 |
| Calm | Steady, warm, moderate pace | stability=0.7, similarity=0.7 |
| Angry | Sharp, intense, faster | stability=0.4, similarity=0.9 |

**Implementation:** The LLM outputs emotion tags with each response → Unity reads tag → adjusts ElevenLabs API call → voice matches mood.

---

## 💰 VOICE COSTS (Monthly Estimate)

| Usage | Cost |
|---|---|
| Light (30 min/day) | ~$10/month |
| Medium (1 hr/day) | ~$20/month |
| Heavy (2+ hrs/day) | ~$40/month |

---

## ✅ What You Get After Pillar 2

- Your companion **hears** you speak (Whisper)
- Your companion **responds** with a realistic, unique voice (ElevenLabs)
- Voice **matches emotional state** (happy sounds happy, sad sounds sad)
- **Lip sync** makes mouth movements match speech
- **Low latency** (2-3 second total response time)

**Time to build:** 1 week
**Cost:** $5-20/month
