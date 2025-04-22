// src/pages/listaProdutos/ListaProdutosPage.styles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const AddProductButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ProductItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductName = styled.span`
  flex-grow: 1;
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  color: #4caf50;
  margin-left: 10px;
`;

export const DeleteButton = styled.button`
  margin-left: 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`;

export const EmptyMessage = styled.p`
  color: #777;
  font-style: italic;
`;
