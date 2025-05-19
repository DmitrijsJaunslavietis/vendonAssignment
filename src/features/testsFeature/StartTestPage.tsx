import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTests, useTestsActions } from "../../hooks/useTestsStore";
import data from "../../mockTests/tests.json";
import { useNavigate } from "react-router";
import { useSetUser, useUser } from "../../hooks/useUserStore";
import { useTestInstanceActions } from "../../hooks/useTestInstanceStore";
import { useTestsHistoryActions } from "../../hooks/useTestsHistoryStore";
import { TextInput } from "../../components/TextInput";
import { Select } from "../../components/Select";
import { ErrorBadge } from "../../components/ErrorBadge";
import { Button } from "../../components/Button";

export const StartTestPage = () => {
    const navigate = useNavigate();
    const renderCount = useRef(0);
    renderCount.current += 1;
    const tests = useTests();
    const user = useUser();
    const setUser = useSetUser();
    const { setTests } = useTestsActions();
    const { setCurrentInstance } = useTestInstanceActions();
    const { setTestInstances } = useTestsHistoryActions();
    const [selectedTest, setSelectedTest] = useState<number | undefined>(
        undefined
    );
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    //to start test we create a new test instance, which will be used through testinstance flow.
    //questions array is empty at the beginning, because user doesnt need to see them yet, even in dev tools.
    const handleStartTest = useCallback(() => {
        setLoading(true);
        if (selectedTest && user) {
            // API call start
            const testInstance = {
                id: uuid(),
                user: user,
                testId: selectedTest,
                questions: [],
                finished: false,
            };
            setCurrentInstance(testInstance);
            setTestInstances(testInstance);
            navigate(`/test-instance`);
        } else {
            setError("Please select a test and enter your name.");
        }
        setTimeout(() => setLoading(false), 1000); //imitating API call
        // API call end
    }, [navigate, selectedTest, setCurrentInstance, setTestInstances, user]);

    //useEffect to set tests from API - only name and id for select, user cannot see questions and answers yet (for hackermans in dev tools)
    useEffect(() => {
        setLoading(true);
        const fetchTests = () => {
            const testsData = data.map((test) => ({
                id: test.id,
                name: test.name,
            }));
            setTests(testsData);
            setLoading(false);
        };
        fetchTests();
    }, [setTests]);

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
                    options={tests}
                    onChange={(e) => {
                        setError(undefined);
                        setSelectedTest(Number(e.target.value));
                    }}
                />
                {error && <ErrorBadge error={error} />}
                <Button
                    onClick={handleStartTest}
                    disabled={loading}
                >
                    Start Test
                </Button>
            </div>
        </div>
    );
};
