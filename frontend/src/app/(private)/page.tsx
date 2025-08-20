import Transcription from "@/components/Transcription"
import * as API from "@/store/serverApiAction/serverApis";

const TrancriptionPage = async () => {

    const res = await API.get("/transcriptionList");
    console.log(res)       
    return (
        <Transcription list = {res.data.transcriptData} totalPages = { res.data.totalPages } />
    )
}

export default TrancriptionPage;