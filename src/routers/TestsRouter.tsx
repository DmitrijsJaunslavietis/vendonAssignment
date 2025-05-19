import { Route, Routes } from "react-router";
import { StartTestPage } from "../features/testsFeature/StartTestPage";
import { TestInstancePage } from "../features/testsFeature/TestInstancePage";
import { EndTestPage } from "../features/testsFeature/EndTestPage";


export const TestsRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<StartTestPage />} />
            <Route path="/test-instance/:instanceId" element={<TestInstancePage />} />
            <Route path="/test-instance/:instanceId/end" element={<EndTestPage />} />
        </Routes>
    );
};