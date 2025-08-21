import Transcription from "@/components/Transcription";
import {TranscriptionListInput} from "@/types/transcriptType";
import * as API from "@/store/serverApiAction/serverApis";
import { API_PATH } from "@/utils/apiPath";

const TrancriptionPage = async () => {
    const defaultParams: TranscriptionListInput = {
       limit: 10,
       page:1,
       search:''     
    }
    const res = await API.get(API_PATH.TRANSCRIPTION_LIST, defaultParams);
    return (
        <Transcription list = {res?.data?.transcriptData} defaultParams={defaultParams} totalCount = { res?.data?.totalCount } />
    )
}

export default TrancriptionPage;