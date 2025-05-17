import { Route, Routes } from "react-router";
import { StartTestPage } from "../features/testsFeature/StartTestPage";
import { TestInstance } from "../features/testsFeature/TestInstance";
import { EndTestPage } from "../features/testsFeature/EndTestPage";


export const TestsRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<StartTestPage />} />
            <Route path="/test-instance/:instanceId" element={<TestInstance />} />
            <Route path="/test-instance/:instanceId/end" element={<EndTestPage />} />
        </Routes>
    );
};