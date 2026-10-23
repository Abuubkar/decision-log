import { STATUSES } from "@/domain/types";
import type { Status } from "@/domain/types";
import type { AreaFilter, StatusFilter } from "./log.types";

export type LogUrl = {
  status: StatusFilter;
  area: AreaFilter;
  query: string;
  openId: string | null;
};

const isStatus = (value: string | null): value is Status => STATUSES.includes(value as Status);

/**
 * A link carries what the reader is looking at, so a filtered log and a single
 * decision can both be sent to someone else. An area is any string, so whether
 * it is one this log has is settled where the areas are known, not here.
 */
export function readUrl(search: string): LogUrl {
  const params = new URLSearchParams(search);
  const status = params.get("status");
  return {
    status: isStatus(status) ? status : "all",
    area: params.get("area"),
    query: params.get("q") ?? "",
    openId: params.get("id"),
  };
}

/** Only what differs from the default is written, so a plain log has a plain URL. */
export function writeUrl({ status, area, query, openId }: LogUrl) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (area) params.set("area", area);
  if (query.trim()) params.set("q", query.trim());
  if (openId) params.set("id", openId);
  const search = params.toString();
  return `${window.location.pathname}${search ? `?${search}` : ""}`;
}
