export type Situation =
  | "late_to_work"
  | "didnt_reply"
  | "unfinished_task"
  | "missed_gym"
  | "didnt_study"
  | "ghosted"
  | "left_on_read"
  | "skipped_class"
  | "late_to_college"
  | "forgot_bday"
  | "mood_off"
  | "overslept";

export type Audience =
  | "boss"
  | "teacher"
  | "friend"
  | "partner"
  | "parents"
  | "gym_buddy"
  | "client"
  | "myself"
  | "crush"
  | "roommate"
  | "sibling"
  | "hr";

export type Mode = "believable" | "corporate" | "insane";

export type Personality =
  | "professional"
  | "passive_aggressive"
  | "overconfident"
  | "victim_mode"
  | "technically_true"
  | "gen_z"
  | "corporate_npc"
  | "main_character"
  | "unhinged"
  | "desi_genz"
  | "delhi_swag"
  | "soft_boy"
  | "chaotic_neutral"
  | "cringe_core";

export type Language = "english" | "hinglish" | "hindi";

export type ExcuseFormat =
  | "chat_reply"
  | "voice_note"
  | "formal_message"
  | "story_caption"
  | "meme_pov"
  | "meme_nobody"
  | "cringe_confession";

export interface ExcuseRequest {
  situation: Situation;
  audience: Audience;
  mode: Mode;
  personality: Personality;
  intensity: number;
  language: Language;
  format: ExcuseFormat;
  context?: string | undefined;
}

export interface ExcuseScores {
  believability: number;
  suspicion: number;
  corporateBS: number;
}

export interface ExcuseResult {
  excuse: string;
  shortVersion: string;
  scores: ExcuseScores;
  verdict: string;
  category: string;
}

export const SITUATIONS: { value: Situation; label: string; emoji: string }[] = [
  { value: "late_to_work", label: "Late to work", emoji: "🏢" },
  { value: "didnt_reply", label: "Didn't reply", emoji: "💬" },
  { value: "unfinished_task", label: "Didn't finish task", emoji: "💻" },
  { value: "missed_gym", label: "Missed gym", emoji: "🏋️" },
  { value: "didnt_study", label: "Didn't study", emoji: "📚" },
  { value: "ghosted", label: "Ghosted them", emoji: "👻" },
  { value: "left_on_read", label: "Left on read", emoji: "👀" },
  { value: "skipped_class", label: "Skipped class", emoji: "🏫" },
  { value: "late_to_college", label: "Late to college", emoji: "🎓" },
  { value: "forgot_bday", label: "Forgot birthday", emoji: "🎂" },
  { value: "mood_off", label: "Mood off", emoji: "🫠" },
  { value: "overslept", label: "Overslept", emoji: "😴" },
];

export const AUDIENCES: { value: Audience; label: string }[] = [
  { value: "boss", label: "Boss" },
  { value: "teacher", label: "Teacher" },
  { value: "friend", label: "Friend" },
  { value: "partner", label: "Partner" },
  { value: "parents", label: "Parents" },
  { value: "gym_buddy", label: "Gym buddy" },
  { value: "client", label: "Client" },
  { value: "crush", label: "Crush" },
  { value: "roommate", label: "Roommate" },
  { value: "sibling", label: "Sibling" },
  { value: "hr", label: "HR" },
  { value: "myself", label: "Myself" },
];

export const MODES: { value: Mode; label: string; description: string }[] = [
  {
    value: "believable",
    label: "BELIEVABLE",
    description: "Sounds like something that could actually happen.",
  },
  {
    value: "corporate",
    label: "CORPORATE",
    description: "Maximum professionalism. Minimum accountability.",
  },
  {
    value: "insane",
    label: "ABSOLUTELY INSANE",
    description: "Logic has left the building.",
  },
];

export const PERSONALITIES: { value: Personality; label: string; emoji: string }[] = [
  { value: "professional", label: "Professional", emoji: "🎩" },
  { value: "passive_aggressive", label: "Passive aggressive", emoji: "🙃" },
  { value: "overconfident", label: "Overconfident", emoji: "😎" },
  { value: "victim_mode", label: "Victim mode", emoji: "😢" },
  { value: "technically_true", label: "Technically true", emoji: "🤓" },
  { value: "gen_z", label: "Gen-Z", emoji: "💅" },
  { value: "desi_genz", label: "Desi Gen-Z", emoji: "🫶" },
  { value: "delhi_swag", label: "Delhi swag", emoji: "🔥" },
  { value: "soft_boy", label: "Soft boy", emoji: "🥺" },
  { value: "chaotic_neutral", label: "Chaotic neutral", emoji: "🎲" },
  { value: "cringe_core", label: "Cringe core", emoji: "😳" },
  { value: "corporate_npc", label: "Corporate NPC", emoji: "🧑‍💼" },
  { value: "main_character", label: "Main character", emoji: "🌟" },
  { value: "unhinged", label: "Unhinged", emoji: "🤪" },
];

export const LANGUAGES: {
  value: Language;
  label: string;
  description: string;
}[] = [
  {
    value: "english",
    label: "ENGLISH",
    description: "Clean slang, zero cringe.",
  },
  {
    value: "hinglish",
    label: "HINGLISH",
    description: "Yaar-level Roman Hinglish.",
  },
  {
    value: "hindi",
    label: "HINDI",
    description: "Devanagari, still unhinged.",
  },
];

export const FORMATS: {
  value: ExcuseFormat;
  label: string;
  description: string;
}[] = [
  {
    value: "chat_reply",
    label: "Chat reply",
    description: "Drop it in WhatsApp / texts.",
  },
  {
    value: "voice_note",
    label: "Voice note",
    description: "Script you'd actually send as a VN.",
  },
  {
    value: "formal_message",
    label: "Formal msg",
    description: "Email / proper message energy.",
  },
  {
    value: "story_caption",
    label: "Story caption",
    description: "Built for IG / Snap vibes.",
  },
  {
    value: "meme_pov",
    label: "POV meme",
    description: "POV: you ghosted them and now…",
  },
  {
    value: "meme_nobody",
    label: "Nobody:",
    description: "Nobody: / Me to my boss: two-liner.",
  },
  {
    value: "cringe_confession",
    label: "Cringe confess",
    description: "Oversharing story confession energy.",
  },
];

export type Chaos = "safe" | "sus" | "unhinged";

export const PRIMARY_SITUATIONS: {
  value: Situation;
  label: string;
  emoji: string;
  micro: string;
}[] = [
  { value: "late_to_work", label: "Late to work", emoji: "💼", micro: "Boss is already typing..." },
  { value: "didnt_reply", label: "Didn't reply", emoji: "👻", micro: "It's been 3 business days." },
  { value: "didnt_study", label: "Didn't study", emoji: "📚", micro: "Exam tomorrow. Obviously." },
  { value: "missed_gym", label: "Missed gym", emoji: "🏋️", micro: "The protein can wait." },
  {
    value: "ghosted",
    label: "Ghosted someone",
    emoji: "❤️",
    micro: "Left on read. Character arc.",
  },
  {
    value: "forgot_bday",
    label: "Forgot something",
    emoji: "📝",
    micro: "It was... important. Probably.",
  },
  {
    value: "unfinished_task",
    label: "Missed something important",
    emoji: "😵",
    micro: "Deadline said hi.",
  },
  { value: "mood_off", label: "Something else", emoji: "➕", micro: "Spill the lore below." },
];

export const PRIMARY_AUDIENCES: { value: Audience; label: string; emoji: string }[] = [
  { value: "boss", label: "Boss", emoji: "👔" },
  { value: "teacher", label: "Teacher", emoji: "👨‍🏫" },
  { value: "partner", label: "Partner", emoji: "❤️" },
  { value: "friend", label: "Friend", emoji: "👯" },
  { value: "parents", label: "Parents", emoji: "👨‍👩‍👦" },
];

export const CHAOS: {
  value: Chaos;
  label: string;
  emoji: string;
  description: string;
}[] = [
  { value: "safe", label: "SAFE", emoji: "🙂", description: "Actually believable." },
  { value: "sus", label: "SUS", emoji: "😏", description: "Sounds believable... probably." },
  {
    value: "unhinged",
    label: "UNHINGED",
    emoji: "💀",
    description: "You're committing to the bit.",
  },
];

export function chaosFields(
  chaos: Chaos,
): Pick<ExcuseRequest, "mode" | "personality" | "intensity" | "format"> {
  switch (chaos) {
    case "sus":
      return { mode: "believable", personality: "gen_z", intensity: 65, format: "chat_reply" };
    case "unhinged":
      return vibeFields("insane");
    default:
      return vibeFields("believable");
  }
}

export function believabilityLabel(value: number): string {
  if (value >= 90) return "NPC SAFE";
  if (value >= 70) return "Pretty believable";
  if (value >= 40) return "Kinda sus";
  return "You're cooked";
}

export type Vibe = "believable" | "corporate" | "insane" | "cringe";

export const VIBES: {
  value: Vibe;
  label: string;
  description: string;
}[] = [
  { value: "believable", label: "BELIEVABLE", description: "Could actually send this." },
  { value: "corporate", label: "CORPORATE", description: "Sir/ma'am energy." },
  { value: "insane", label: "INSANE", description: "Logic has left the chat." },
  { value: "cringe", label: "CRINGE", description: "Painfully sendable." },
];

export function vibeFields(
  vibe: Vibe,
): Pick<ExcuseRequest, "mode" | "personality" | "intensity" | "format"> {
  switch (vibe) {
    case "corporate":
      return {
        mode: "corporate",
        personality: "corporate_npc",
        intensity: 50,
        format: "formal_message",
      };
    case "insane":
      return { mode: "insane", personality: "unhinged", intensity: 85, format: "chat_reply" };
    case "cringe":
      return {
        mode: "insane",
        personality: "cringe_core",
        intensity: 70,
        format: "cringe_confession",
      };
    default:
      return { mode: "believable", personality: "desi_genz", intensity: 50, format: "chat_reply" };
  }
}

export function intensityLabel(value: number): string {
  if (value <= 20) return "Almost true";
  if (value <= 40) return "Sus but cute";
  if (value <= 60) return "A little too convenient";
  if (value <= 80) return "Nobody is buying this";
  return "You're cooked";
}
