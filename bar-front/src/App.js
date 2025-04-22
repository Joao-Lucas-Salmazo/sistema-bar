import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ComandaDetalhe from "./pages/comandaDetalhe/ComandaDetalhe";
import CadastroProduto from "./pages/cadastroProduto/CadastroProduto";
import ListaProdutosPage from "./pages/listaProdutos/ListaProdutosPage";
import ListaComandasPage from "./pages/listaComanda/ListaComandasPage";
import AbrirComanda from "./pages/abrirComanda/AbrirComanda";
import * as S from "./App.styles";

function App() {
  return (
    <S.AppContainer>
      <S.Header>
        <S.MainTitle>Sistema de Bar</S.MainTitle>
        <S.Navigation>
          <ul>
            <li>
              <S.NavLink to="/">Comandas</S.NavLink>
            </li>
            <li>
              <S.NavLink to="/lista-produtos">Lista de Produtos</S.NavLink>
            </li>
            <li>
              <S.NavLink to="/cadastro-produto">Cadastrar Produto</S.NavLink>
            </li>
            {/* Adicione mais links de navegação conforme necessário */}
          </ul>
        </S.Navigation>
      </S.Header>

      <S.PageContent>
        <Routes>
          <Route path="/" element={<ListaComandasPage />} />
          <Route path="/comanda/:id" element={<ComandaDetalhe />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/lista-produtos" element={<ListaProdutosPage />} />
          <Route path="/abrir-comanda" element={<AbrirComanda />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </S.PageContent>
    </S.AppContainer>
  );
}

export default App;
