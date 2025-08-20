import Link from "next/link";
import React, { useState, useMemo } from "react";

type Row = {
  _id: number;
  audioUrl: string;
  transcription : string;
  createdAd: string;
};

type Props = {
  rows: Row[];
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

function getPageNumbers(current: number, total: number) {
  const delta = 2;
  const range = [];
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }
  if (current - delta > 2) range.unshift('...');
  if (current + delta < total - 1) range.push('...');
  range.unshift(1);
  if (total > 1) range.push(total);
  return range.filter((v, i, arr) => arr.indexOf(v) === i);
}

const TranscriptionTable: React.FC<Props> = ({ rows }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter rows by id, url, or text
  const filteredRows = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(row =>
      row._id.toString().includes(s) ||
      row.audioUrl.toLowerCase().includes(s) ||
      row.transcription.toLowerCase().includes(s)
    );
  }, [rows, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handle page change
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    setInputPage("");
  };

  // Reset to page 1 on search or rowsPerPage change
  React.useEffect(() => { setPage(1); }, [search, rowsPerPage]);

  // Page counts
  const startIdx = filteredRows.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIdx = Math.min(page * rowsPerPage, filteredRows.length);

  // Pagination numbers
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="w-full max-w-4xl mt-12">
      {/* Search and page counts */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by ID, URL, or Text"
          className="rounded-md border border-foreground/20 bg-background px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="text-xs text-foreground/60 sm:text-right">
          {filteredRows.length === 0
            ? "No results"
            : `Showing ${startIdx}-${endIdx} of ${filteredRows.length}`}
        </span>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-foreground/10 bg-background/95">
        <table className="min-w-full divide-y divide-foreground/10">
          <thead>
            <tr className="bg-secondary/80">
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Audio URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">Transcribed Text</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-foreground/60">No results found.</td>
              </tr>
            ) : (
              paginatedRows.map(row => (
                <tr key={row._id} className="hover:bg-secondary/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/90">{row._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary underline break-all">
                    <Link href={row.audioUrl} target="_blank" rel="noopener noreferrer">{row.audioUrl}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{row.transcription}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">{row.createdAd}</td>
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
            value={rowsPerPage}
            onChange={e => setRowsPerPage(Number(e.target.value))}
          >
            {ROWS_PER_PAGE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span>{startIdx}-{endIdx} of {filteredRows.length}</span>
          <button
            className="px-4 py-2 rounded text-base disabled:opacity-50 hover:underline"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            &laquo;
          </button>
          {pageNumbers.map((num, idx) =>
            typeof num === 'number' ? (
              <button
                key={num}
                className={`px-2 py-1 rounded ${page === num ? 'bg-primary text-background' : 'hover:underline'}`}
                onClick={() => goToPage(num)}
                disabled={page === num}
              >
                {num}
              </button>
            ) : (
              <span key={"ellipsis-" + idx} className="px-2">...</span>
            )
          )}
          <button
            className="px-4 py-2 rounded text-base disabled:opacity-50 hover:underline"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            &raquo;
          </button>
          <form
            className="flex items-center gap-1 ml-2"
            onSubmit={e => {
              e.preventDefault();
              const p = parseInt(inputPage, 10);
              if (!isNaN(p)) goToPage(p);
            }}
          >
            <input
              type="number"
              min={1}
              max={totalPages}
              value={inputPage}
              onChange={e => setInputPage(e.target.value)}
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
