/**
 * Designer entity type
 * Mirrors backend `designers.models.Designer`
 */
export interface Designer {
  id: string;            // UUID or numeric depending on backend
  name: string;          // Designer's full name
  bio?: string;          // Short biography or description
  avatarUrl?: string;    // Profile image URL
  createdAt: string;     // ISO timestamp
  updatedAt: string;     // ISO timestamp
}

/**
 * Payload when fetching multiple designers
 */
export interface DesignerListResponse {
  data: Designer[];
  success: boolean;
  message?: string;
}

/**
 * Payload when fetching a single designer
 */
export interface DesignerResponse {
  data: Designer;
  success: boolean;
  message?: string;
}
