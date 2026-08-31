import styled from "styled-components";

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  margin-left: 5px;
  border-radius: 50%;
  background: #e2a321;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

function CartBadge({ count }) {
  return <Badge>{count}</Badge>;
}

export default CartBadge;