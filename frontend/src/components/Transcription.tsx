"use client";

import { useState, useRef, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import TranscriptionTable from "@/components/TranscriptionTable";
import { addTranscription, getTranscriptionData } from "@/store/actions/transcriptionAction";
import { forSuccess, useDebounce } from "@/utils/CommonService";
import { TranscriptionType, TranscriptionListInput } from "@/types/transcriptType";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/store/reducers/authReducer";
import { ROUTES_PATH } from "@/utils/constant";

const isAudioUrl = (url: string) => {
    // Accepts .mp3, .wav, .ogg, .aac, .flac, .m4a, .opus, .webm (audio only)
    return /\.(mp3|wav|ogg|aac|flac|m4a|opus|webm)$/i.test(url);
};

const Transcription = ({list, totalCount, defaultParams} : {list: TranscriptionType[], totalCount:number, defaultParams:TranscriptionListInput}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [url, setUrl] = useState("");
    const [, forceUpdate] = useState(0);
    const [rows, setRows] = useState(list);
    const [count, setCount] = useState(totalCount);
    const [pagination, setPagination] = useState(defaultParams);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(pagination.search, 500);
    
    useEffect(() => {
        setTranscriptData(pagination);
    }, [debouncedQuery]);

    const handlePageChange = async (page: number) => {
        const paginate = {...pagination, page};
        setPagination(paginate); 
        setTranscriptData(paginate); 
    }

    const handleLimitChange = async (limit: number) => {
        const page = Math.ceil(count / limit);
        const paginate = {...pagination, limit, page};
        setPagination(paginate); 
        setTranscriptData(paginate);
    }

    const setTranscriptData = async (paginate: TranscriptionListInput) =>{
        const result = await getTranscriptionData(paginate);
        if(result.success){
            setRows(result.data.transcriptData);
            setCount(result.data.totalCount);
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const paginate = {...pagination, search: e.target.value };
        setPagination(paginate);
    }

    const handleLogout = () => {
        dispatch(logoutAction());
        router.push(ROUTES_PATH.LOGIN);
    }


    const validator = useRef(new SimpleReactValidator({
        autoForceUpdate: { forceUpdate: () => forceUpdate(n => n + 1) },
        validators: {
            audioUrl: { // custom validator
                message: 'Only audio URLs are allowed (.mp3, .wav, .ogg, .aac, .flac, .m4a, .opus, .webm)',
                rule: (val) => isAudioUrl(val),
            },
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setLoading(true);
            addTranscription({audioUrl: url})
            .then((res)=>{
                if(res.success){
                    setTranscriptData(pagination)
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
            <div className="w-full max-w-xl mb-4 flex justify-end">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-md border border-foreground/20 text-foreground px-4 py-2 hover:bg-foreground/10"
                >
                    Logout
                </button>
            </div>
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
            <TranscriptionTable 
                rows={rows}
                pagination={pagination}
                count={count}
                handlePageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
                handleSearch={handleSearch}
            />
        </div>
    );
};

export default Transcription;