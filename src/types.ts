export interface Content {
    placeholder?: string;
    buttonSubmit?: string;
    buttonCancel?: string;
}

export interface Event {
    value: string;
    success: 'HIT' | 'MISS';
}

export interface Cache {
    [key: string]: Result;
}

export interface Result {
    type: 'results' | 'suggestions' | 'empty';
    items: string[];
    time: number;
}
