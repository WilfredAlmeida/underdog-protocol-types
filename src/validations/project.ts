import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import {
  nftPaginatedResponseSchema,
  paginatedQuerySchema,
  projectPaginatedResponseSchema,
  projectParamsSchema,
  projectTransactionResponseSchema,
  sortQuerySchema,
} from "../api";
import { metadataSchema, projectSchema, sellerFeeBasisPointsSchema } from "../models";
import { registry } from "../openapi";

extendZodWithOpenApi(z);

export const createProjectRequestSchema = registry.register(
  "CreateProjectRequest",
  z.object({
    body: projectSchema
      .pick({
        name: true,
        symbol: true,
        description: true,
        image: true,
        semifungible: true,
        isPublic: true,
        animationUrl: true,
        externalUrl: true,
        attributes: true,
      })
      .merge(z.object({ sellerFeeBasisPoints: sellerFeeBasisPointsSchema.optional() })),
  })
);

export const createProjectResponseSchema = registry.register(
  "CreateProjectResponse",
  projectTransactionResponseSchema
);

export type CreateProjectRequest = z.infer<typeof createProjectRequestSchema>;
export type CreateProjectResponse = z.infer<typeof createProjectResponseSchema>;

export const getProjectsRequestSchema = registry.register(
  "GetProjectsRequest",
  z.object({ query: paginatedQuerySchema.merge(sortQuerySchema) })
);

export const getProjectsResponseSchema = registry.register(
  "GetProjectsResponse",
  projectPaginatedResponseSchema
);

export type GetProjectsRequest = z.infer<typeof getProjectsRequestSchema>;
export type GetProjectsResponse = z.infer<typeof getProjectsResponseSchema>;

export const searchProjectsRequestSchema = registry.register(
  "SearchProjectsRequest",
  z.object({ query: paginatedQuerySchema.merge(sortQuerySchema).merge(z.object({ query: z.string() })) })
);

export const searchProjectsResponseSchema = registry.register(
  "SearchProjectsResponse",
  projectPaginatedResponseSchema
);

export type SearchProjectsRequest = z.infer<typeof searchProjectsRequestSchema>;
export type SearchProjectsResponse = z.infer<typeof searchProjectsResponseSchema>;

export const getProjectRequestSchema = registry.register(
  "GetProjectRequest",
  z.object({
    params: projectParamsSchema,
    query: paginatedQuerySchema.merge(sortQuerySchema),
  })
);

export const getProjectResponseSchema = registry.register(
  "GetProjectResponse",
  projectSchema.merge(z.object({ nfts: nftPaginatedResponseSchema }))
);

export type GetProjectRequest = z.infer<typeof getProjectRequestSchema>;
export type GetProjectResponse = z.infer<typeof getProjectResponseSchema>;

export const getProjectStatsRequestSchema = registry.register(
  "GetProjectStatsRequest",
  z.object({
    params: projectParamsSchema,
  })
);

export const getProjectStatsResponseSchema = registry.register(
  "GetProjectStatsResponse",
  z.object({
    total: z.number().openapi({ description: "Total number of NFTs in the Project" }),
    confirmed: z.number().openapi({ description: "Number NFTs confirmed on-chain" }),
    processing: z.number().openapi({ description: "Number of NFTs currently minting" }),
    pending: z.number().openapi({ description: "Number of NFTs lazily minted" }),
  })
);

export type GetProjectStatsRequest = z.infer<typeof getProjectStatsRequestSchema>;
export type GetProjectStatsResponse = z.infer<typeof getProjectStatsResponseSchema>;

export const updateProjectRequestSchema = registry.register(
  "UpdateProjectRequest",
  z.object({
    params: projectParamsSchema,
    body: metadataSchema.omit({ name: true, symbol: true }),
  })
);

export const updateProjectResponseSchema = registry.register("UpdateProjectResponse", projectSchema);

export type UpdateProjectRequest = z.infer<typeof updateProjectRequestSchema>;
export type UpdateProjectResponse = z.infer<typeof updateProjectResponseSchema>;

export const partialUpdateProjectRequestSchema = registry.register(
  "PartialUpdateProjectRequest",
  z.object({
    params: projectParamsSchema,
    body: metadataSchema.omit({ name: true, symbol: true }).partial(),
  })
);

export const partialUpdateProjectResponseSchema = registry.register(
  "PartialUpdateProjectResponse",
  projectSchema
);

export type PartialUpdateProjectRequest = z.infer<typeof partialUpdateProjectRequestSchema>;
export type PartialUpdateProjectResponse = z.infer<typeof partialUpdateProjectResponseSchema>;

export const updateProjectMetadataRequestSchema = registry.register(
  "UpdateProjectMetadataRequest",
  z.object({
    params: projectParamsSchema,
    body: metadataSchema
      .pick({ name: true, symbol: true })
      .merge(z.object({ sellerFeeBasisPoints: sellerFeeBasisPointsSchema })),
  })
);

export const updateProjectMetadataResponseSchema = registry.register(
  "UpdateProjectNameResponse",
  projectTransactionResponseSchema.omit({ transferable: true, compressed: true })
);

export type UpdateProjectMetadataRequest = z.infer<typeof updateProjectMetadataRequestSchema>;
export type UpdateProjectMetadataResponse = z.infer<typeof updateProjectMetadataResponseSchema>;

export const partialUpdateProjectMetadataRequestSchema = registry.register(
  "PartialUpdateProjectMetadataRequest",
  z.object({
    params: projectParamsSchema,
    body: metadataSchema
      .pick({ name: true, symbol: true })
      .merge(z.object({ sellerFeeBasisPoints: sellerFeeBasisPointsSchema }))
      .partial(),
  })
);

export const partialUpdateProjectMetadataResponseSchema = registry.register(
  "PartialUpdateProjectNameResponse",
  projectTransactionResponseSchema.omit({ transferable: true, compressed: true })
);

export type PartialUpdateProjectMetadataRequest = z.infer<typeof partialUpdateProjectMetadataRequestSchema>;
export type PartialUpdateProjectMetadataResponse = z.infer<typeof partialUpdateProjectMetadataResponseSchema>;
