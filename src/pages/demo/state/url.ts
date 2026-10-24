import { AREAS, STATUSES } from "@/domain/types";
import type { Area, Status } from "@/domain/types";
import type { AreaFilter, StatusFilter } from "./log.types";

export type LogUrl = {
  status: StatusFilter;
  area: AreaFilter;
  query: string;
  openId: string | null;
};

const isStatus = (value: string | null): value is Status => STATUSES.includes(value as Status);

const isArea = (value: string | null): value is Area => AREAS.includes(value as Area);

/**
 * A link carries what the reader is looking at, so a filtered log and a single
 * decision can both be sent to someone else. Anything the URL cannot be trusted
 * about falls back rather than throwing: a link outlives the log it points into.
 */
export function readUrl(search: string): LogUrl {
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const area = params.get("area");
  return {
    status: isStatus(status) ? status : "all",
    area: isArea(area) ? area : "all",
    query: params.get("q") ?? "",
    openId: params.get("id"),
  };
}

/** Only what differs from the default is written, so a plain log has a plain URL. */
export function writeUrl({ status, area, query, openId }: LogUrl) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (area !== "all") params.set("area", area);
  if (query.trim()) params.set("q", query.trim());
  if (openId) params.set("id", openId);
  const search = params.toString();
  return `${window.location.pathname}${search ? `?${search}` : ""}`;
}
