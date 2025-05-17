export interface Test {
    id: string;
    name: string;
    questions: Question[];
}

export interface Question {
    id: string;
    text: string;
    answers: Answer[];
}

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface TestInstance {
    id: string;
    user: string;
    testId: string;
    answers: Answer[];
}

export interface UserAnswer {
    questionId: string;
    answerId: string;
}

export interface UserTests {
    user: string;
    testInstances: TestInstance[];
}