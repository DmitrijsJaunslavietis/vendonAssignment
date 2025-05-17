import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    useTests,
    useTestsActions,
} from "../../hooks/useTestsStore";
import data from "../../mockTests/tests.json";
import { useNavigate } from "react-router";
import { useSetUser, useUser } from "../../hooks/useUserStore";

export const StartTestPage = () => {
    const navigate = useNavigate();
    const renderCount = useRef(0);
    renderCount.current += 1;
    const tests = useTests();
    const user = useUser();
    const setUser = useSetUser();
    const { addTestInstance, setTests } = useTestsActions();
    const [selectedTest, setSelectedTest] = useState<number | undefined>(
        undefined
    );

    const handleStartTest = () => {
        if (selectedTest && user) {
            const testInstance = {
                id: uuid(),
                user: user,
                testId: selectedTest,
                answers: [],
                finished: false,
            };
            addTestInstance(testInstance);
            navigate(`/test-instance/${testInstance.id}`);
        }
    };

    useEffect(() => {
        const fetchTests = () => {
            const testsData = data.map((test) => ({
                id: test.id,
                name: test.name,
            }));
            setTests(testsData);
        };
        fetchTests();
    }, [setTests]);

    return (
        <div className="start-test-page">
            <h1>Start Test</h1>
            <p>rerender count: {renderCount.current}</p>
            <input
                type="text"
                placeholder="name"
                value={user}
                onChange={(e) => {
                    setUser(e.target.value);
                }}
            />
            <select
                value={selectedTest}
                onChange={(e) => {
                    setSelectedTest(e ? Number(e.target.value) : undefined);
                }}
            >
                <option selected value={undefined}> -- select a test -- </option>
                {tests.map((test) => (
                    <option key={test.id} value={test.id}>
                        {test.name}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleStartTest}>
                Start Test
            </button>
        </div>
    );
};
