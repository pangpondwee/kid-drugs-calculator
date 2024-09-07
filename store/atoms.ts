import { Drug } from "@/data/drug";
import { atom } from "jotai";

export const drugAtom = atom<Drug | null>(null);

export const historyDrugAtom = atom<Drug[]>([]);
