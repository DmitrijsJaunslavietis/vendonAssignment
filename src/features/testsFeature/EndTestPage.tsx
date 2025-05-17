import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useTestInstances, useTestsActions } from "../../hooks/useTestsStore";
import { useUser } from "../../hooks/useUserStore";

export const EndTestPage = () => {
    const { instanceId } = useParams();
    const user = useUser();
    const testInstances = useTestInstances();
    const { getCurrentTestInstance } = useTestsActions();
    const { totalQuestions, correctAnswers } = useMemo((): {
        totalQuestions: number;
        correctAnswers: number;
    } => {
        const defaultValues = {
            totalQuestions: 0,
            correctAnswers: 0,
        };
        if (!instanceId) return defaultValues;
        const testInstance = getCurrentTestInstance(instanceId);
        if (!testInstance) return defaultValues;
        const correctAnswers = testInstance.answers.filter(
            (answer) => answer.correctAnswerId === answer.userAnswerId
        );
        return {
            totalQuestions: testInstance.answers.length ?? 0,
            correctAnswers: correctAnswers.length ?? 0,
        };
    }, [testInstances, instanceId]);

    useEffect(() => {
        // Logic to handle the end of the test
    }, []);

    return (
        <div>
            <h1>Thank you, {user}!</h1>
            <p>
                You have answered correctly {correctAnswers} out of {totalQuestions} questions.
            </p>
        </div>
    );
};
