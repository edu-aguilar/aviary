export interface BirdCreationQuery {
  bornAt: Date;
  name?: string;
  description?: string;
  images?: string[];
  parentsId?: string[];
  partnerId?: string;
  ringId?: string;
  sex?: string;
}
