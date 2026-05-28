import { Poppins, Inter, Outfit } from 'next/font/google';

const OutfitFont = Outfit({
  variable: '--font-Outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const PoppinsFont = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const InterFont = Inter({
  variable: '--font-Inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export { OutfitFont, PoppinsFont, InterFont };
