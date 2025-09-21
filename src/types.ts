// microCMSのAPIレスポンスの共通の型
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// あなたのAPIスキーマに合わせた、新しいWorkの型定義
export type Work = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
  role: string;
  // required:false のフィールドは ? を付けてオプショナルにする
  detail?: string;
  ingenuity?: string;
  skill: string;
  url?: string;
  category: string[];
};