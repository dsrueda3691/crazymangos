import "./globals.css";
import { Bowlby_One, Bricolage_Grotesque } from "next/font/google";
const d = Bowlby_One({ weight: "400", subsets: ["latin"], variable: "--f-display" });
const b = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-body" });
export const metadata = { title: "Crazy Mango's · Santa Marta", description: "Mango, maracumango y chamoy en El Pando, Santa Marta." };
export default function L({ children }: { children: React.ReactNode }) {
  return <html lang="es" className={`${d.variable} ${b.variable}`}><body className="grain">{children}</body></html>;
}
