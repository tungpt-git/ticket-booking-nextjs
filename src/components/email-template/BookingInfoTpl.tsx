import { formatPrice } from "@/core/seat/price";

interface EmailTemplateProps {
  seats: string;
  name: string;
  phone: string;
  email: string;
  popcorn: number;
  drink: number;
  combo: number;
  total: number;
}

export const BookingInfoTpl: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phone,
  email,
  popcorn,
  drink,
  combo,
  seats,
  total,
}) => (
  <div>
    <table>
      <tr>
        <th style={{ textAlign: "left" }}>Name:</th>
        <td>{name}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Telephone:</th>
        <td>{phone}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Email:</th>
        <td>{email}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Seats</th>
        <td>{seats}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Popcorn:</th>
        <td>{popcorn}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Drink:</th>
        <td>{drink}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Combo:</th>
        <td>{combo}</td>
      </tr>
      <tr>
        <th style={{ textAlign: "left" }}>Total:</th>
        <td>{formatPrice(total)}</td>
      </tr>
    </table>
  </div>
);
