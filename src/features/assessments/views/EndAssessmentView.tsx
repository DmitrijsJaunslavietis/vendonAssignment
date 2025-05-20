interface EndAssessmentViewProps {
    user: string | undefined;
    totalQuestions: number;
    correctAnswers: number;
}

export const EndAssessmentView = ({
    user,
    totalQuestions,
    correctAnswers,
}: EndAssessmentViewProps) => {
    return (
        <div className="max-w-[600px] mx-auto mt-10 p-10 border border-gray-300 rounded shadow">
            <h1 data-testid="user-name" className="mb-4 text-3xl">
                Thank you, {user}!
            </h1>
            <p data-testid="test-results">
                You have answered correctly {correctAnswers} out of{" "}
                {totalQuestions} questions.
            </p>
        </div>
    );
};
