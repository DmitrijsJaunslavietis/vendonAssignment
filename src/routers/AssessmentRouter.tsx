import { Route, Routes } from "react-router";
import { StartAssessmentPage } from "../features/assessments/pages/StartAssessmentPage";
import { AssessmentInstancePage } from "../features/assessments/pages/AssessmentInstancePage";
import { EndAssessmentPage } from "../features/assessments/pages/EndAssessmentPage";

export const AssessmentRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<StartAssessmentPage />} />
            <Route
                path="/assessment-instance"
                element={<AssessmentInstancePage />}
            />
            <Route
                path="/assessment-instance/end"
                element={<EndAssessmentPage />}
            />
        </Routes>
    );
};
