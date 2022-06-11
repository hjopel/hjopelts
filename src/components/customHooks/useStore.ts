import create from "zustand";
import * as THREE from "three";
export interface Image {
  src: string;
  id: string;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  // texture?: THREE.
}
interface StoreState {
  activeRef: HTMLElement;
  imgs: Image[];
  setActiveRef: (ref: HTMLElement) => void;
  setImgs: (imgs: Image[]) => void;
}
const useStore = create<StoreState>((set) => ({
  activeRef: undefined,
  imgs: [],
  setActiveRef: (img) => set((state) => ({ activeRef: img })),
  setImgs: (nImgs) => set((state) => ({ imgs: nImgs })),
}));

export default useStore;
