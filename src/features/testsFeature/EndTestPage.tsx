import { useEffect, useMemo, useRef } from "react";
import { useUser } from "../../hooks/useUserStore";
import { useCurrentTestInstance } from "../../hooks/useTestInstanceStore";
import { useTestsHistoryActions } from "../../hooks/useTestsHistoryStore";

export const EndTestPage = () => {
    const renderCount = useRef(0);
    renderCount.current += 1;
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
        <div className="max-w-[600px] mx-auto mt-10 p-10 border border-gray-300 rounded shadow">
            <p>rerender count: {renderCount.current}</p>
            <h1 className="mb-4 text-3xl">Thank you, {user}!</h1>
            <p>
                You have answered correctly {correctAnswers} out of{" "}
                {totalQuestions} questions.
            </p>
        </div>
    );
};
