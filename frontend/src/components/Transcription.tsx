"use client";

import { useState, useRef } from "react";
import SimpleReactValidator from 'simple-react-validator';
import TranscriptionTable from "@/components/TranscriptionTable";
import { addTranscription } from "@/store/actions/transcriptionAction";
import { forSuccess } from "@/utils/CommonService";

const isAudioUrl = (url: string) => {
    // Accepts .mp3, .wav, .ogg, .aac, .flac, .m4a, .opus, .webm (audio only)
    return /\.(mp3|wav|ogg|aac|flac|m4a|opus|webm)$/i.test(url);
};

const initialRows = [
    { _id: 1, audioUrl: "https://example.com/audio1.mp3", transcription: "Sample transcription 1", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 2, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 3, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 4, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 5, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 6, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 7, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 8, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 9, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 10, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 11, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 12, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 13, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 14, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 15, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 16, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 17, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 18, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 19, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 20, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 21, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 22, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 23, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 24, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
    { _id: 25, audioUrl: "https://example.com/audio2.wav", transcription: "Sample transcription 2", createdAd: "2025-08-20T19:39:28.223+00:00" },
];

const AddTranscriptionAudioPage = () => {
    const [url, setUrl] = useState("");
    const [rows, setRows] = useState(initialRows);
    const [, forceUpdate] = useState(0);
    const validator = useRef(new SimpleReactValidator({
        autoForceUpdate: { forceUpdate: () => forceUpdate(n => n + 1) },
        validators: {
            audioUrl: { // custom validator
                message: 'Only audio URLs are allowed (.mp3, .wav, .ogg, .aac, .flac, .m4a, .opus, .webm)',
                rule: (val) => isAudioUrl(val),
            },
        },
    }));
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setLoading(true);
            addTranscription({audioUrl: url})
            .then((res)=>{
                if(res.success){
                    setRows([
                        { ...res.data.transcript },
                        ...rows
                    ]);
                    setUrl("");
                    forSuccess("Add successfully.");
                    validator.current.hideMessages();
                }
            })
            .finally(()=>  setLoading(false))
            
        } else {
            validator.current.showMessages();
            forceUpdate(n => n + 1);
        }
    };

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center bg-secondary/90 text-background py-12">
            <div className="w-full max-w-xl">
                <div className="bg-background/95 border border-foreground/10 shadow-xl rounded-2xl p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <div className="text-3xl font-heading tracking-wide text-foreground">Add Transcription Audio URL</div>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label className="block text-sm font-medium text-foreground/80">Audio URL</label>
                            <div className="mt-2 relative">
                                <input
                                    type="url"
                                    placeholder="Enter audio file URL (.mp3, .wav, etc.)"
                                    className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                />
                            </div>
                            <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                {validator.current.message('url', url, 'required|audioUrl')}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center rounded-md bg-primary text-background px-4 py-3 font-medium hover:bg-primary/90"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Loading...</span>
                            ) : (
                                "Add URL"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            {/* Table Section */}
            <TranscriptionTable rows={rows} />
        </div>
    );
};

export default AddTranscriptionAudioPage;