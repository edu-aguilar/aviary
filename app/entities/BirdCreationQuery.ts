export interface BirdCreationQuery {
  bornAt: Date;
  description?: string;
  images?: string[];
  name?: string;
  parentsId?: string[];
  partnerId?: string;
  ringId?: string;
  sex?: string;
}
