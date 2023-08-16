'use client'

import { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ( {children} ) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <MenuContext.Provider value={{
            isOpen, 
            setIsOpen,
            closeMenu,
        }}>
            {children}
        </MenuContext.Provider>
    )

} 