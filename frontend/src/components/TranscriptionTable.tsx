import Link from "next/link";
import React, { useState, useRef, useCallback } from "react";
import moment from "moment";
import {TranscriptionType, TranscriptionListInput} from "@/types/transcriptType"

type Props = {
  rows: TranscriptionType[];
  pagination: TranscriptionListInput;
  count: number;
  handlePageChange: (page:number) => void;
  handleLimitChange: (limit:number) => void;
  handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const TranscriptionTable: React.FC<Props> = ({ rows, pagination, count, handlePageChange, handleLimitChange, handleSearch }) => {
  const [inputPage, setInputPage] = useState("");
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
  const totalPages = Math.ceil(count / pagination.limit);
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex =  startIndex + pagination.limit;
  const lastPageRef = useRef<number | null>(null);
  // const goToPage = (page: number) => {
  //   if (page < 1 || page > totalPages) return;
  //   handlePageChange(page)
  //   setInputPage("");
  // };

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;

    // prevent re-calling same page
    if (lastPageRef.current === page) return;

    lastPageRef.current = page;
    handlePageChange(page);
  }, [totalPages, handlePageChange]);

  return (
    <div className="w-full max-w-6xl mt-12">
      {/* Search and page counts */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by ID, URL, or Text"
          className="rounded-md border border-foreground/20 bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full max-w-xs"
          value={pagination.search}
          onChange={handleSearch}
        />
        <span className="text-xs text-foreground/60 sm:text-right">
          {rows.length === 0
            ? "No results"
            : `Showing ${startIndex+1}-${Math.min(endIndex, count)} of ${rows.length}`}
        </span>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-foreground/10 bg-background/95">
        <table className="min-w-full divide-y divide-foreground/10">
          <thead>
            <tr className="bg-secondary/80">
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Audio URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Transcribed Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-foreground/60">No results found.</td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row._id} className="hover:bg-secondary/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/90">{i+startIndex+1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/90">{row._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary underline break-all">
                    <Link href={row.audioUrl} target="_blank" rel="noopener noreferrer" title={row.audioUrl}>
                      {row.audioUrl.length > 30 ? `${row.audioUrl.slice(0, 20)}...` : row.audioUrl}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80" title={row.transcription}>{row.transcription}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination - bottom right */}
      <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
        <div className="flex items-center gap-2 text-xs text-foreground/80">
          <span>Rows per page:</span>
          <select
            className="rounded border border-foreground/20 bg-background px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={pagination.limit}
            onChange={e => {
              handleLimitChange(Number(e.target.value))
            }}
          >
            {ROWS_PER_PAGE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span>{startIndex}-{endIndex} of {totalPages}</span>
          <button
            className="px-4 py-2 rounded text-base disabled:opacity-50 hover:underline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            aria-label="Previous page"
          >
            &laquo;
          </button>
          {totalPages ? Array.from({length: Math.min(5, totalPages)}, (_, i)=>{
            const pageNumber = i+1;
            return(
              <button
                key={pageNumber}
                className={`px-2 py-1 rounded ${pagination.page === pageNumber ? 'bg-primary text-background' : 'hover:underline'}`}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pagination.page === pageNumber}
              >{pageNumber}</button>
            )
          }) : 
          totalPages}
          <button
            className="px-4 py-2 rounded text-base disabled:opacity-50 hover:underline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            aria-label="Next page"
          >
            &raquo;
          </button>
          <form
            className="flex items-center gap-1 ml-2"
            onSubmit={e => {
              e.preventDefault();
              const page = parseInt(inputPage, 10);
              if (!isNaN(page)) goToPage(page);
            }}
          >
            <input
              type="number"
              min={1}
              max={totalPages}
              value={inputPage}
              onChange={e => setInputPage(e.target.value)}
              disabled = { totalPages === 0 }
              className="w-12 px-2 py-1 rounded border border-foreground/20 bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="px-2 py-1 rounded bg-primary text-background text-xs font-medium hover:bg-primary/90"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionTable;
