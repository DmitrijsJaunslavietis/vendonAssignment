import { Route, Routes } from "react-router";


export const TestsRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<div>Tests</div>} />
            <Route path="/test-instance/:testId" element={<div>Test</div>} />
            <Route path="/test-instance/:testId/end" element={<div>Test end</div>} />
        </Routes>
    );
};