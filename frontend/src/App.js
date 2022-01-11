import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductList from "./pages/products/ProductList";
import SingleProduct from "./pages/products/SingleProduct";
import Thanks from "./pages/Thanks";

import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/join"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/thank-you" element={<Thanks />} />

        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
        </Route>
        <Route path="/product">
          <Route path=":productId" element={<SingleProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
