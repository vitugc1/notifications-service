// T = tipagem orginal
// R = tipagem que vai ser substituída 

export type Replace<T, R> = Omit<T, keyof R> & R;