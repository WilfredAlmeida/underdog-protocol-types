import { z } from "zod";

import {
  memberPaginatedResponseSchema,
  memberTransactionResponseSchema,
  orgPaginatedResponseSchema,
  paginatedQuerySchema,
} from "../api";
import { idSchema, orgSchema, publicKeyValueSchema } from "../models";

export const getOrgsRequestSchema = z.object({
  query: paginatedQuerySchema,
});
export type GetOrgsRequest = z.infer<typeof getOrgsRequestSchema>;

export const getOrgsResponseSchema = orgPaginatedResponseSchema;
export type GetOrgsResponse = z.infer<typeof getOrgsResponseSchema>;

export const getOrgRequestSchema = z.object({
  params: z.object({
    orgId: idSchema,
  }),
});
export type GetOrgRequest = z.infer<typeof getOrgRequestSchema>;

export const getOrgResponseSchema = orgSchema;
export type GetOrgResponse = z.infer<typeof getOrgResponseSchema>;

export const updateOrgRequestSchema = z.object({
  params: z.object({
    orgId: idSchema,
  }),
  body: z.object({
    name: z.string(),
  }),
});
export type UpdateOrgRequest = z.infer<typeof updateOrgRequestSchema>;

export const updateOrgResponseSchema = orgSchema;
export type UpdateOrgResponse = z.infer<typeof updateOrgResponseSchema>;

export const getMembersRequestSchema = z.object({
  query: paginatedQuerySchema,
  params: z.object({
    orgId: idSchema,
  }),
});
export type GetMembersRequest = z.infer<typeof getMembersRequestSchema>;

export const getMembersResponseSchema = memberPaginatedResponseSchema;
export type GetMembersResponse = z.infer<typeof getMembersResponseSchema>;

export const addMemberRequestSchema = z.object({
  params: z.object({
    orgId: idSchema,
  }),
  body: z.object({
    name: z.string(),
    memberAddress: publicKeyValueSchema,
  }),
});
export type AddMemberRequest = z.infer<typeof addMemberRequestSchema>;

export const addMemberResponseSchema = memberTransactionResponseSchema;
export type AddMemberResponse = z.infer<typeof addMemberResponseSchema>;
