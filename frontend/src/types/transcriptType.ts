export type TranscriptionType = {
    _id: number;
    audioUrl: string;
    transcription: string;
    createdAt: string;
};

export type TranscriptionInput = {
    audioUrl: string;
};

export type TranscriptionListInput = {
    limit: number;
    page: number;
    search: string;
};
