import React, { createContext, useContext } from 'react';
import { EuroDollarStore } from './EuroDollarStore';

class RootStore {
    euroDollarStore: EuroDollarStore;

    constructor() {
        this.euroDollarStore = new EuroDollarStore();
    }
}

// Создаём экземпляр стора
const rootStore = new RootStore();

// Создаём контекст
const MobxStoreContext = createContext<RootStore | null>(null);

// Провайдер для оборачивания приложения
export const MobxStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MobxStoreContext.Provider value={rootStore} >
        {children}
    </MobxStoreContext.Provider>
);

// Хук для удобного доступа к сторам
export const useMobxStore = () => {
    const context = useContext(MobxStoreContext);
    if (!context) {
        throw new Error('useMobxStore must be used within RootStoreProvider');
    }
    return context;
};