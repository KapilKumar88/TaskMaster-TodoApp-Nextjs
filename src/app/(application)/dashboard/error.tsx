"use client";

export default function Error({ error, reset }: any) {
  return <h1>{error?.message ?? "Error page"}</h1>;
}
