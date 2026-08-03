export interface Greeting {
  text: string;
  lang: string;
}

// Most-spoken languages, ordered for the center sequence. Ends on Hello.
export const GREETINGS: Greeting[] = [
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hola", lang: "Spanish" },
  { text: "你好", lang: "Chinese" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "Bonjour", lang: "French" },
  { text: "নমস্কার", lang: "Bengali" },
  { text: "Olá", lang: "Portuguese" },
  { text: "Привет", lang: "Russian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "నమస్కారం", lang: "Telugu" },
  { text: "Hallo", lang: "German" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "สวัสดี", lang: "Thai" },
  { text: "Merhaba", lang: "Turkish" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hello", lang: "English" },
];
