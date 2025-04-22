import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center; /* Centralizar o título em telas menores */
`;

export const NewComandaButton = styled(Link)`
  display: block; /* Tornar o botão ocupar a largura total em telas menores */
  background-color: #5cb85c;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #4cae4c;
  }

  @media (min-width: 768px) {
    display: inline-block; /* Voltar ao inline-block em telas maiores */
    margin-right: 15px; /* Adicionar margem direita em telas maiores */
  }
`;

export const ComandasList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ComandaItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* Empilhar informações em telas menores */
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row; /* Voltar ao layout de linha em telas maiores */
    justify-content: space-between;
    align-items: center;
  }
`;

export const ComandaInfo = styled.span`
  margin-bottom: 10px; /* Adicionar espaço abaixo das informações em telas menores */
  width: 100%; /* Ocupar a largura total em telas menores */

  @media (min-width: 768px) {
    margin-bottom: 0;
    width: auto;
    flex-grow: 1;
  }
`;

export const DetailsLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-left: 0; /* Remover margem esquerda em telas menores */
  width: 100%; /* Ocupar a largura total para o link em telas menores */
  text-align: center; /* Centralizar o link em telas menores */
  padding: 8px 0;
  border-top: 1px solid #eee; /* Adicionar um separador visual */

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    margin-left: 15px; /* Voltar à margem esquerda em telas maiores */
    width: auto;
    text-align: left;
    border-top: none;
    padding: 0;
  }
`;

export const EmptyMessage = styled.p`
  color: #777;
  font-style: italic;
  text-align: center;
`;
