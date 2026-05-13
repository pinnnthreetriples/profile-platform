// Profile feature types
export type UserProfile = {
  id: string;
  userId: string;
  paymentStatus: "pending" | "paid";
  createdAt: string;
  updatedAt: string;
};
