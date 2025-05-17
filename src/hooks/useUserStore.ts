import { create } from "zustand";

interface UserStore {
    user: string | undefined;
    setUser: (user: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    setUser: (user) => {
        set(() => ({ user }));
    }
}));

export const useUser = () => useUserStore((state) => state.user);
export const useSetUser = () => useUserStore((state) => state.setUser); 