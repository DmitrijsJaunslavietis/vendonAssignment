# Vendon assignment

A simple test system in which the user enters their name, chooses a test, executes
it, and at the end sees their result.

## Main used tech stack

* react
* typescript
* zustand (state management)
* tailwindcss

## Overview

The test consists of 3 different views:
1) Homepage - the user enters their name and chooses one of the available tests
2) Test question view - each question has answer options. One of them is correct.
3) Result view - the user sees their result.

## Application flow

App uses mock test data from tests.json file. Every request for this data is commented with start and end of block, where API function needs to be implemented in the future.

As this application will serve as testing app, the main aspect for data modeling i used, were restriction for test sensitive data to be available before and while test is in progress.

Full tests mock data structure:

```
{
    "id": number,
    "name": string,
    "questions": [
        {
            "id": number,
            "question": string,
            "answers": [
                {
                    id": number,
                    "answer": string,
                    "isCorrect": boolean
                },
                ...
            ]
        },
        ...
    ]
}
```

### Start test page

On starting page users have only tests to chose from, this implementation prevents users from accessing questions and answers as well.
```
Test {
    id: number;
    name: string;
}
```

### Test instance page

Test instance provides all questions and answers but without correct answer flag, this implementation prevents users from accessing correct answer information.

```
Test {
    id: number;
    name: string;
}

Question { 
    id: number;
    testId: number;
    question: string;
    answers: Answer[];
}

Answer {
    id: number;
    questionId: number;
    answer: string;
}

TestInstance {
    id: string;
    user: string;
    testId: number;
    answers: UserAnswer[];
    finished: boolean;
}

UserAnswer extends Answer {
    userAnswerId: number;
    correctAnswerId?: number;
}
```