import { Route, Routes } from "react-router";
import { StartTestPage } from "../features/testsFeature/StartTestPage";
import { TestInstance } from "../features/testsFeature/TestInstance";
import { EndTestPage } from "../features/testsFeature/EndTestPage";


export const TestsRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<StartTestPage />} />
            <Route path="/test-instance/:testId" element={<TestInstance />} />
            <Route path="/test-instance/:testId/end" element={<EndTestPage />} />
        </Routes>
    );
};