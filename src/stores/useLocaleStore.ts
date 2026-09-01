import { create } from 'zustand';

export type Locale = 'fr' | 'en';

interface LocaleStore {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  hydrate: () => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'fr',
  hydrated: false,
  hydrate: () => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'fr' || saved === 'en')) {
      set({ locale: saved, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },
  setLocale: (locale) => {
    if (typeof window !== 'undefined') localStorage.setItem('locale', locale);
    set({ locale });
  },
  toggle: () => set((s) => {
    const next = s.locale === 'fr' ? 'en' : 'fr';
    if (typeof window !== 'undefined') localStorage.setItem('locale', next);
    return { locale: next };
  }),
}));
