import { Request, Response } from 'express';
import { MessageUtil, StatusUtil, AppError, CommonUtils } from '../utils';
import { TranscriptDocument, TranscriptInput, TranscriptListInput } from '../types';
import mongoose from 'mongoose';
import TranscriptModel from '@/models/transcript.model';

class TranscriptController {

    public async transcript(req: Request, res: Response): Promise<void> {
        const { audioUrl } = req.body as TranscriptInput;

        await CommonUtils.downloadWithRetry(audioUrl);

        const data: TranscriptDocument = await TranscriptModel.create({
            audioUrl,
            transcription: CommonUtils.generateRandomText()
        });

        res.status(StatusUtil.OK).json({ success: true, message: MessageUtil.ADD_SUCCESSFULLY, transcript: data });
    }

    public async transcriptList(req: Request, res: Response): Promise<void> {
        const { limit = 10, page = 1 } = req.query as TranscriptListInput;

        if (limit === 0) throw new AppError(MessageUtil.LIMIT_ZERO, StatusUtil.BAD_REQUEST);

        const skip = (page - 1) * limit;

        const pipeline: mongoose.PipelineStage[] = [
            {
                $facet: {
                    data: [
                        { $sort: { _id: -1 } }, // sort first
                        { $skip: skip },       // skip docs
                        { $limit: limit },     // limit docs
                    ],
                    totalCount: [
                        { $count: 'count' },   // count total docs
                    ],
                },
            },
            {
                $unwind: {
                    path: '$totalCount',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        const result = await TranscriptModel.aggregate<{
            data: TranscriptDocument[];
            totalCount?: { count: number };
        }>(pipeline);

        const data = result[0]?.data || [];
        const totalCount = result[0]?.totalCount?.count || 0;

        const totalPages = Math.ceil(totalCount / limit);

        res.status(StatusUtil.OK).json({
            success: true,
            message: MessageUtil.DATA_FOUND,
            totalCount,
            page,
            limit,
            totalPages,
            transcriptData: data,
        });
    }


}

export default new TranscriptController();