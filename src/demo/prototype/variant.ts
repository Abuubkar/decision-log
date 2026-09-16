// THROWAWAY. Which change-history variant is showing.
export type Variant = "A" | "B" | "C";

export const VARIANTS: Variant[] = ["A", "B", "C"];

export const VARIANT_NAMES: Record<Variant, string> = {
  A: "Section in the drawer",
  B: "Tabs in the drawer",
  C: "Feed of its own",
};

export function currentVariant(): Variant {
  const value = new URLSearchParams(location.search).get("variant")?.toUpperCase();
  return VARIANTS.includes(value as Variant) ? (value as Variant) : "A";
}

export function goToVariant(variant: Variant) {
  const url = new URL(location.href);
  url.searchParams.set("variant", variant);
  location.href = url.toString();
}
