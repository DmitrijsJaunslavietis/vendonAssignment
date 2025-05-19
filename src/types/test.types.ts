export interface Test {
    id: number;
    name: string;
}
export interface Question { 
    id: number;
    question: string;
    answers: Answer[];
    result?: UserAnswer;
}

export interface Answer {
    id: number;
    answer: string;
}

export interface TestInstance {
    id: string;
    user: string;
    testId: number;
    questions: Question[];
    finished: boolean;
}

export interface UserAnswer {
    userAnswerId: number;
    correctAnswerId?: number;
}

export interface UserTests {
    user: string;
    testInstances: TestInstance[];
}

export interface CorrectAnswer {
    correctAnswerId: number;
    questionId: number;
}