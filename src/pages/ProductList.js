import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CgAdd, CgPen } from "react-icons/cg";

const HOST = process.env.REACT_APP_HOST || "https://product-edit.onrender.com";

export default function ProductList() {
  const [location, setLocation] = useLocation();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch(HOST + "/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log("HOST: ", HOST);
  }, []);

  return (
    <article id="article">
      <h2>Products </h2>
      <section id="tables">
        <figure>
          <table role="grid">
            <thead>
              <tr>
                <th scope="col">
                  <Link href="/productedit">
                    <CgAdd />
                  </Link>
                </th>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">ID</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => setLocation("/productedit/" + item._id)}
                >
                  <td>
                    <CgPen />
                  </td>
                  <th scope="row">{index}</th>
                  <td>{item.name}</td>
                  <td>{item.categories}</td>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </section>
      <footer>
        <small>(CC) Høyskolen Kristiania 2023</small>
      </footer>
    </article>
  );
}
