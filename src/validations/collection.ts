import { z } from "zod";

import { createPaginatedResponseSchema, paginatedQuerySchema } from "../api";
import { collectionSchema, publicKeyValueSchema, publicNftSchema } from "../models";

export const getCollectionsRequestSchema = z.object({
  query: paginatedQuerySchema.merge(z.object({ ownerAddress: publicKeyValueSchema })),
});

export type GetCollectionsRequest = z.infer<typeof getCollectionsRequestSchema>;

export const getCollectionsResponseSchema = createPaginatedResponseSchema(collectionSchema);

export type GetCollectionsResponse = z.infer<typeof getCollectionsResponseSchema>;

export const getCollectionRequestSchema = z.object({
  params: z.object({
    mintAddress: publicKeyValueSchema,
  }),
  query: paginatedQuerySchema,
});

export type GetCollectionRequest = z.infer<typeof getCollectionRequestSchema>;

export const getCollectionResponseSchema = collectionSchema.merge(
  z.object({ nfts: createPaginatedResponseSchema(publicNftSchema) })
);

export type GetCollectionResponse = z.infer<typeof getCollectionResponseSchema>;
