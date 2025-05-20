import { useEffect } from "react";
import "./App.css";
import { useAssessmentHistory } from "./hooks/useAssessmentHistoryStore";
import { MainLayout } from "./layouts/MainLayout";
import { TestsRouter } from "./routers/TestsRouter";

function App() {
    const assessmentInstances = useAssessmentHistory();

    useEffect(() => {
        console.log("assessmentInstances", assessmentInstances);
    }, [assessmentInstances]);

    return (
        <MainLayout>
            <TestsRouter />
        </MainLayout>
    );
}

export default App;
