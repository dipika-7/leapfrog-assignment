import { PaginationQuery } from "./pagination";

export interface GetAllUsersQuery extends PaginationQuery {
  search?: string;
  completed?: boolean;
}
