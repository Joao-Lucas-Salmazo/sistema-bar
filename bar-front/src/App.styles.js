import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
  font-family: sans-serif;
`;

export const Header = styled.header`
  background-color: #f0f0f0;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permitir que os itens quebrem para a próxima linha em telas menores */
`;

export const MainTitle = styled.h1`
  color: #333;
  margin: 0;
  font-size: 24px;
  margin-bottom: 10px; /* Adicionar um pouco de espaço abaixo do título em telas menores */
  width: 100%; /* Ocupar a largura total em telas menores */
  text-align: center; /* Centralizar o título em telas menores */

  @media (min-width: 768px) {
    width: auto;
    text-align: left;
  }
`;

export const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center; /* Centralizar os links em telas menores */
  }

  li {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }

    @media (max-width: 768px) {
      margin-left: 10px;
    }
    @media (max-width: 480px) {
      margin-left: 5px;
    }
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupar a largura total para a navegação */
    margin-top: 10px; /* Adicionar espaço acima da navegação */
  }

  @media (max-width: 480px) {
    ul {
      flex-direction: column; /* Empilhar os links em telas muito pequenas */
      align-items: center;
    }
    li {
      margin: 5px 0;
    }
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  transition: color 0.3s ease;
  font-size: 1em;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 480px) {
    font-size: 1.1em; /* Aumentar um pouco a fonte em telas pequenas para facilitar o toque */
    padding: 8px 12px; /* Adicionar um pouco de padding para facilitar o toque */
    border-bottom: 1px solid #eee; /* Adicionar separador visual */
    width: 100%;
    text-align: center;
  }
`;

export const PageContent = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;
