import Transcription from "@/components/Transcription";
import {TranscriptionListInput} from "@/types/transcriptType";
import * as API from "@/store/serverApiAction/serverApis";

const TrancriptionPage = async () => {
    const defaultParams: TranscriptionListInput = {
       limit: 10,
       page:1,
       search:''     
    }
    const res = await API.get("/transcriptionList", defaultParams);
    return (
        <Transcription list = {res?.data?.transcriptData} defaultParams={defaultParams} totalCount = { res?.data?.totalCount } />
    )
}

export default TrancriptionPage;