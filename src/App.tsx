import { useEffect } from "react";
import "./App.css";
import { useTestsHistory } from "./hooks/useTestsHistoryStore";
import { MainLayout } from "./layouts/MainLayout";
import { TestsRouter } from "./routers/TestsRouter";

function App() {
    const testInstances = useTestsHistory();

    useEffect(() => {
        console.log("testInstances", testInstances);
    }, [testInstances]);

    return (
        <MainLayout>
            <TestsRouter />
        </MainLayout>
    );
}

export default App;
