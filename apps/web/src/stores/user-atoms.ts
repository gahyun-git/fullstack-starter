import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage<"light" | "dark" | "system">("theme", "system");

interface User {
  id: string;
  name: string;
  email: string;
}

export const userAtom = atom<User | null>(null);
export const isLoggedInAtom = atom((get) => get(userAtom) !== null);
