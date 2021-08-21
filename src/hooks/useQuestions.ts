import { useContext } from 'react';
import { QuestionsContext } from '../contexts/QuestionsContext';

export function useQuestionsContext() {
    const context = useContext(QuestionsContext);

    return context;
}
