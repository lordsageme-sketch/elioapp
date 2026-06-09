# 🚀 GETTING STARTED — Phase 1 Step-by-Step Guide
## From Zero to Talking Companion in 3 Weeks (No Coding Skills Required)

---

## 📋 WEEK 1: SETUP & CHARACTER

### Day 1-2: Install & Learn Unity
- [ ] Download Unity Hub: https://unity.com/download
- [ ] Install Unity 2023 LTS (Long Term Support = stable)
- [ ] During install, select: "Mobile (iOS + Android)" modules
- [ ] Watch: "Unity for Beginners - Complete Course" (Brackeys, YouTube)
  - Just the first 2 hours — enough to navigate the interface

### Day 3: Create Your Character
- [ ] Go to https://readyplayer.me
- [ ] Upload a selfie OR choose a base character
- [ ] Customize: face, hair, clothing, body type
- [ ] Download as "Unity (.glb)" format
- [ ] Import into Unity (drag into Assets folder)

### Day 4: Add Animations
- [ ] Go to https://www.mixamo.com (free Adobe account needed)
- [ ] Upload your character GLB file
- [ ] Download these animations (in FBX format):
  - "Standing Idle" (default pose)
  - "Walking Forward" (movement)
  - "Talking" (conversation)
  - "Waving" (greeting)
  - "Happy Idle" (joy)
  - "Thinking" (processing)
- [ ] Import all into Unity
- [ ] Create Animator Controller → connect animations with transitions

### Day 5: Scene Setup
- [ ] Create a simple environment (floor plane + skybox)
- [ ] Place your character in the scene
- [ ] Add camera framing (close-up for conversation, wide for walking)
- [ ] Add lighting (Directional Light + soft fill light)
- [ ] Test: Character should be standing, idle animation playing

**Milestone:** Your character is alive on screen! 🎉

---

## 📋 WEEK 2: INTELLIGENCE & VOICE

### Day 6-7: Set Up AI Brain
- [ ] Get OpenAI API key: https://platform.openai.com/api-keys
  - Add $10 credit to start
- [ ] OR get Anthropic API key: https://console.anthropic.com
- [ ] Get ElevenLabs account: https://elevenlabs.io
  - Choose a voice for your companion
  - Note the Voice ID

### Day 8-9: Connect LLM to Unity (No-Code Method)

**Option A: Using Unity Visual Scripting + HTTP**
- [ ] In Unity, open Window > Visual Scripting > Visual Scripting Editor
- [ ] Create a new Script Graph
- [ ] Add nodes:
  1. **Custom Event** "OnSendMessage"
  2. **HTTP POST** node → URL: `https://api.openai.com/v1/chat/completions`
  3. **Header:** `Authorization: Bearer YOUR_API_KEY`
  4. **Header:** `Content-Type: application/json`
  5. **Body:** JSON with your system prompt + user message
  6. **Parse Response** → extract assistant's reply text
  7. **Trigger TTS** → send text to ElevenLabs
  8. **Play Audio** → play returned audio on character
  9. **Trigger Animation** → switch to "Talking" animation while audio plays

**Option B: Using an Existing Unity Plugin (EASIEST)**
- [ ] Search Unity Asset Store for "Chat GPT" or "AI Chat"
- [ ] Recommended: **"AI Chatbot for Unity"** plugins that handle API calls
- [ ] These come with pre-built UI + API integration = drag and drop
- [ ] Configure your API key in the plugin settings
- [ ] Done — you have a chat interface!

### Day 10-11: Add Voice

**Speech-to-Text (Hearing):**
- [ ] Use OpenAI's Whisper API
- [ ] In Unity Visual Scripting:
  1. Record microphone input
  2. Send audio to Whisper API
  3. Get back text
  4. Send to LLM

**Pre-built solution (recommended):**
- [ ] Search Unity Asset Store for "Voice Recognition" or "Speech to Text"
- [ ] Many free/cheap plugins handle this automatically

**Text-to-Speech (Speaking):**
- [ ] Sign up at ElevenLabs
- [ ] In Unity Visual Scripting:
  1. Take LLM response text
  2. HTTP POST to: `https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}`
  3. Header: `xi-api-key: YOUR_KEY`
  4. Receive audio file back
  5. Play audio through character's AudioSource
  6. Trigger "Talking" animation while playing

**Milestone:** Your character can hear you, think, and respond with voice! 🗣️

---

## 📋 WEEK 3: POLISH & MOBILE BUILD

### Day 12-13: Add Lip Sync
- [ ] Get **Salsa LipSync Suite** from Unity Asset Store ($65)
  - Or use free **Oculus LipSync** plugin
- [ ] Attach to character's face
- [ ] Configure: link AudioSource → LipSync component
- [ ] Now mouth moves when companion speaks

### Day 14-15: Emotion System (Simple Version)
- [ ] Ask LLM to include emotion tag in every response:
  ```
  Response format: [EMOTION: happy] I'm so glad to hear that!
  ```
- [ ] Parse emotion tag in Unity Visual Scripting
- [ ] Switch animation based on emotion:
  - happy → "Happy Idle"
  - sad → "Sad Idle"
  - thinking → "Thinking"
  - excited → "Excited"
  - calm → "Standing Idle"

### Day 16: Touch to Walk
- [ ] Add touch input: tap on ground → character walks there
- [ ] Use Unity's NavMesh system (built-in, visual setup):
  1. Mark ground as "Walkable"
  2. Add NavMeshAgent to character
  3. On touch → SetDestination(touchPoint)
  4. Animator switches to "Walking" while moving

### Day 17-18: Memory System (Simple Version)
- [ ] Use **PlayerPrefs** (Unity's built-in save system) for basics:
  - User's name
  - Key preferences
  - Last conversation date
- [ ] Include these in the LLM system prompt each time

### Day 19-20: Mobile Build
- [ ] Switch platform to Android in Unity Build Settings
- [ ] Configure: orientation, resolution, icon
- [ ] Build APK
- [ ] Install on your phone!
- [ ] Test everything works on mobile

### Day 21: Celebrate 🎉
- **You now have an AI companion on your phone that:**
  - ✅ Looks realistic
  - ✅ Talks to you with a natural voice
  - ✅ Hears you speak
  - ✅ Has emotional expressions
  - ✅ Walks around when you tap
  - ✅ Remembers your name and basics

---

## 🔗 KEY RESOURCES

| Resource | URL | Purpose |
|---|---|---|
| Unity Download | unity.com/download | Game engine |
| Ready Player Me | readyplayer.me | 3D character |
| Mixamo | mixamo.com | Animations |
| OpenAI API | platform.openai.com | AI brain |
| ElevenLabs | elevenlabs.io | Voice |
| Supabase | supabase.com | Database (Phase 2) |
| Unity Asset Store | assetstore.unity.com | Plugins |
| Brackeys YouTube | youtube.com/@Brackeys | Tutorials |

---

## 🆘 WHEN YOU GET STUCK

1. **Unity Visual Scripting confused?** → Search "[your problem] + Unity visual scripting" on YouTube
2. **API not connecting?** → Check API key, check billing, test in Postman first
3. **Animations not blending?** → Use "Has Exit Time: false" and short transition duration (0.2s)
4. **Voice sounds robotic?** → Adjust ElevenLabs stability slider (lower = more expressive)
5. **Phone running hot?** → Lower graphics quality settings in Unity URP

**Golden Rule:** When stuck, break the problem into the smallest possible piece and solve that first. Then move to the next.
