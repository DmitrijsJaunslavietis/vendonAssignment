import { useEffect } from "react";
import "./App.css";
import { useAssessmentHistory } from "./hooks/useAssessmentHistoryStore";
import { MainLayout } from "./layouts/MainLayout";
import { AssessmentRouter } from "./routers/AssessmentRouter";

function App() {
    const assessmentInstances = useAssessmentHistory();

    useEffect(() => {
        console.log("assessmentInstances", assessmentInstances);
    }, [assessmentInstances]);

    return (
        <MainLayout>
            <AssessmentRouter />
        </MainLayout>
    );
}

export default App;
