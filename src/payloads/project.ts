import { z } from "zod";

import { idSchema, metadataSchema, publicKeySchema, sellerFeeBasisPointsSchema } from "../models";
import { orgPayloadSchema } from "./org";

export const createProjectPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    mintAddress: publicKeySchema,
    sellerFeeBasisPoints: sellerFeeBasisPointsSchema.optional(),
  })
);
export type CreateProjectPayload = z.infer<typeof createProjectPayloadSchema>;

export const updateProjectPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    name: z.string(),
    symbol: z.string(),
    sellerFeeBasisPoints: sellerFeeBasisPointsSchema,
  })
);
export type UpdateProjectPayload = z.infer<typeof updateProjectPayloadSchema>;

export const createProjectNftPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    nftId: idSchema,
    metadata: metadataSchema,
    treeAddress: publicKeySchema,
    receiverAddress: publicKeySchema,
    delegated: z.boolean().optional().default(false),
  })
);
export type CreateProjectNftPayload = z.infer<typeof createProjectNftPayloadSchema>;

export const createProjectSftPayloadSchema = createProjectNftPayloadSchema.omit({ metadata: true });
export type CreateProjectSftPayload = z.infer<typeof createProjectSftPayloadSchema>;

export const batchProjectNftPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    treeAddress: publicKeySchema,
    batch: z
      .object({
        receiverAddress: publicKeySchema,
        nftId: idSchema,
        metadata: metadataSchema,
        delegated: z.boolean().optional(),
      })
      .array(),
  })
);
export type BatchProjectNftPayload = z.infer<typeof batchProjectNftPayloadSchema>;

export const batchProjectSftPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    treeAddress: publicKeySchema,
    batch: z
      .object({
        receiverAddress: publicKeySchema,
        nftId: idSchema,
        delegated: z.boolean().optional(),
      })
      .array(),
  })
);
export type BatchProjectSftPayload = z.infer<typeof batchProjectSftPayloadSchema>;

export const transferProjectNftPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    nftId: idSchema,
    receiverAddress: publicKeySchema,
  })
);
export type TransferProjectNftPayload = z.infer<typeof transferProjectNftPayloadSchema>;

export const burnProjectAssetPayloadSchema = orgPayloadSchema.merge(
  z.object({
    projectId: idSchema,
    nftId: idSchema,
  })
);
export type BurnProjectAssetPayload = z.infer<typeof burnProjectAssetPayloadSchema>;
