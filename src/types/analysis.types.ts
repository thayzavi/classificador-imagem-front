export interface Analysis {
  id: number;
  imageUrl: string;
  status: "detected" | "safe";
  description: string;
  recommendations: string;
  neighborhood: string;
  location: string;
  date: string;
}