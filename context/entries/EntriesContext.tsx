
import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
     entries: Entry[];

     //Methods
     addNewEntry: (description: string) => void;
     onEntryUpdated: (entry: Entry, showSnackBar?: boolean) => void;
     onDeleteEntry: (entry: Entry) => Promise<void>;
     refreshEntries: () => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps)