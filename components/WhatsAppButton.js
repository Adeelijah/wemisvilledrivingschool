import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi Wemisville, I'd like to ask about your driving courses.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wemisville Driving School on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-road px-4 py-3 text-paper shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.24c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.15-4.94-4.34-.15-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.4.27-.28.58-.35.78-.35h.56c.18 0 .42-.02.65.5.24.55.8 1.9.87 2.04.07.14.12.3.02.49-.1.19-.15.3-.29.46-.15.16-.31.36-.44.48-.15.14-.3.3-.13.6.17.3.76 1.26 1.64 2.04 1.12 1 2.07 1.31 2.37 1.46.3.14.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.24.66-.14.27.1 1.7.8 1.99 .95.29.14.48.21.55.34.07.13.07.75-.17 1.43Z" />
      </svg>
      <span className="hidden text-sm font-medium sm:inline">WhatsApp Us</span>
    </a>
  );
}
