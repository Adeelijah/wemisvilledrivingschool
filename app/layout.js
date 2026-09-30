import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

export const metadata = {
  title: "Wemisville Driving School | FRSC Accredited | Akure",
  icons: {
    icon: "/faviconnew.png",
  },
  description:
    "FRSC-accredited driving school in Oba-Ile, Akure. Basic, advanced simulator, and corporate driver training. 4.9★ from 402+ Google reviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
