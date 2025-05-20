import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    useAssessments,
    useAssessmentsActions,
} from "../../../hooks/useAssessmentsStore";
import data from "../../../mockTests/tests.json";
import { useNavigate } from "react-router";
import { useSetUser, useUser } from "../../../hooks/useUserStore";
import { TextInput } from "../../../components/TextInput";
import { Select } from "../../../components/Select";
import { ErrorBadge } from "../../../components/ErrorBadge";
import { Button } from "../../../components/Button";
import { useAssessmentInstanceActions } from "../../../hooks/useAssessmentInstanceStore";
import { useAssessmentHistoryActions } from "../../../hooks/useAssessmentHistoryStore";

export const StartAssessmentPage = () => {
    const navigate = useNavigate();
    const renderCount = useRef(0);
    renderCount.current += 1;
    const assessments = useAssessments();
    const user = useUser();
    const setUser = useSetUser();
    const { setAssessments } = useAssessmentsActions();
    const { setCurrentInstance } = useAssessmentInstanceActions();
    const { setAssessmentInstances } = useAssessmentHistoryActions();
    const [selectedAssessment, setSelectedAssessment] = useState<
        number | undefined
    >(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    //to start assessment we create a new assessment instance, which will be used through assessmentinstance flow.
    //questions array is empty at the beginning, because user doesnt need to see them yet, even in dev tools.
    const handleStartAssessment= useCallback(() => {
        setLoading(true);
        if (selectedAssessment && user) {
            // API call start
            const newInstance = {
                id: uuid(),
                user: user,
                assessmentId: selectedAssessment,
                questions: [],
                finished: false,
            };
            setCurrentInstance(newInstance);
            setAssessmentInstances(newInstance);
            navigate(`/assessment-instance`);
        } else {
            setError("Please select a test and enter your name.");
        }
        setTimeout(() => setLoading(false), 1000); //imitating API call
        // API call end
    }, [
        navigate,
        selectedAssessment,
        setCurrentInstance,
        setAssessmentInstances,
        user,
    ]);

    //useEffect to set assessments from API - only name and id for select, user cannot see questions and answers yet (for hackermans in dev tools)
    useEffect(() => {
        setLoading(true);
        const fetchAssessments = () => {
            const assessmentsData = data.map((assessment) => ({
                id: assessment.id,
                name: assessment.name,
            }));
            setAssessments(assessmentsData);
            setLoading(false);
        };
        fetchAssessments();
    }, [setAssessments]);

    return (
        <div className="max-w-[360px] mx-auto mt-10 p-10 border border-gray-300 rounded shadow">
            <h1 className="mb-4 text-3xl">Testing app</h1>
            <div className="flex flex-col gap-5">
                <TextInput
                    data-testid="nameinput"
                    label="Enter your name:"
                    type="text"
                    value={user}
                    onChange={(e) => {
                        setError(undefined);
                        setUser(e.target.value);
                    }}
                />
                <Select
                    data-testid="testselect"
                    label="Select a test:"
                    options={assessments}
                    onChange={(e) => {
                        setError(undefined);
                        setSelectedAssessment(Number(e.target.value));
                    }}
                />
                {error && <ErrorBadge error={error} />}
                <Button onClick={handleStartAssessment} disabled={loading}>
                    Start Test
                </Button>
            </div>
        </div>
    );
};
