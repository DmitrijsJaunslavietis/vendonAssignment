import { useEffect, useMemo } from "react";
import { useUser } from "../../../hooks/useUserStore";
import { useCurrentAssessmentInstance } from "../../../hooks/useAssessmentInstanceStore";
import { useAssessmentHistoryActions } from "../../../hooks/useAssessmentHistoryStore";
import { EndAssessmentView } from "../views/EndAssessmentView";

export const EndAssessmentPage = () => {
    const currentInstance = useCurrentAssessmentInstance();
    const { setAssessmentInstances } = useAssessmentHistoryActions();
    const user = useUser();

    //useMemo is used to avoid unnecessary recalculations
    //totalQuestions and correctAnswers are calculated from currentInstance
    //correctAnswers are filtered from currentInstance.questions array
    //default values are set to 0 if currentInstance is not available
    const { totalQuestions, correctAnswers } = useMemo((): {
        totalQuestions: number;
        correctAnswers: number;
    } => {
        const defaultValues = {
            totalQuestions: 0,
            correctAnswers: 0,
        };
        if (!currentInstance) return defaultValues;
        const correctAnswers = currentInstance.questions.filter(
            (question) =>
                question.result?.userAnswerId ===
                question.result?.correctAnswerId
        );
        return {
            totalQuestions: currentInstance.questions.length ?? 0,
            correctAnswers: correctAnswers.length ?? 0,
        };
    }, [currentInstance]);

    //useEffect to set currentInstance in testsHistory store
    //this is used to show test results in history
    //in the future, could be used to review past tests of user
    useEffect(() => {
        if (!currentInstance) return;
        setAssessmentInstances(currentInstance);
    }, [currentInstance, setAssessmentInstances]);

    return (
        <EndAssessmentView
            user={user}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
        />
    );
};
