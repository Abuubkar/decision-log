import type { AreaFilter, StatusFilter } from "./log.types";

export type LogUrl = {
  status: StatusFilter;
  area: AreaFilter;
  query: string;
  openId: string | null;
};

/**
 * A link carries what the reader is looking at, so a filtered log and a single
 * decision can both be sent to someone else. An area and a status are both any
 * string, so whether this log has them is settled where they are known.
 */
export function readUrl(search: string): LogUrl {
  const params = new URLSearchParams(search);
  return {
    status: params.get("status"),
    area: params.get("area"),
    query: params.get("q") ?? "",
    openId: params.get("id"),
  };
}

/** Only what differs from the default is written, so a plain log has a plain URL. */
export function writeUrl({ status, area, query, openId }: LogUrl) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (area) params.set("area", area);
  if (query.trim()) params.set("q", query.trim());
  if (openId) params.set("id", openId);
  const search = params.toString();
  return `${window.location.pathname}${search ? `?${search}` : ""}`;
}
