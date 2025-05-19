import { useEffect, useMemo } from "react";
import { useUser } from "../../hooks/useUserStore";
import { useCurrentTestInstance } from "../../hooks/useTestInstanceStore";
import { useTestsHistoryActions } from "../../hooks/useTestsHistoryStore";
import { EndTestView } from "./EndTestView";

export const EndTestPage = () => {
    const testInstance = useCurrentTestInstance();
    const { setTestInstances } = useTestsHistoryActions();
    const user = useUser();
    const { totalQuestions, correctAnswers } = useMemo((): {
        totalQuestions: number;
        correctAnswers: number;
    } => {
        const defaultValues = {
            totalQuestions: 0,
            correctAnswers: 0,
        };
        if (!testInstance) return defaultValues;
        const correctAnswers = testInstance.questions.filter(
            (question) =>
                question.result?.userAnswerId ===
                question.result?.correctAnswerId
        );
        return {
            totalQuestions: testInstance.questions.length ?? 0,
            correctAnswers: correctAnswers.length ?? 0,
        };
    }, [testInstance]);

    useEffect(() => {
        if (!testInstance) return;
        setTestInstances(testInstance);
    }, [testInstance, setTestInstances]);

    return (
        <EndTestView
            user={user}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
        />
    );
};
