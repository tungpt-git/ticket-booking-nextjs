export const TotalPrice = ({ value }: { value: string }) => {
  return (
    <div className="flex justify-between py-2">
      <span className="font-medium">Tổng cộng:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};
