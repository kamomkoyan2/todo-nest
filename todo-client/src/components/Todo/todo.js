import React, { useEffect, useState } from "react";
import Moment from "moment";
import { deleteTodos, getTodos } from "../../services/api";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Input } from "antd";
import { Col, Row, Button } from "antd";
import "./todo.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTodos();
    setTimeout(() => {
      setLoading(!loading);
    }, 2000);
  }, []);

  const getAllTodos = async () => {
    let response = await getTodos();
    setTodos(response.data);
  };

  const deleteTodo = async (id) => {
    setTimeout(async () => {
      await deleteTodos(id);
      await getAllTodos();
    });
  };

  // eslint-disable-next-line no-lone-blocks

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Input
          style={{ maxWidth: "800px" }}
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <Row>
        {todos
          .filter((todo) => {
            if (searchTerm === "") {
              return todo;
            } else if (
              todo.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return todo;
            }
          })
          .map((todo) => (
            <Col span={12} key={todo._id}>
              <Card
                actions={[
                  <SettingOutlined key="setting" />,
                  <Link component={Link} type="link" to={`/edit/${todo._id}`}>
                    {" "}
                    <EditOutlined key="edit" />
                  </Link>,
                  <DeleteOutlined
                    className="delete"
                    onClick={() => deleteTodo(todo._id)}
                    key="ellipsis"
                  />,
                ]}
                loading={loading}
              >
                {!loading ? (
                  <>
                    <Meta title={todo.title} description={todo.description} />
                    <p>{Moment(todo.dueDateAt).format("DD/MM/YYYY")}</p>
                  </>
                ) : (
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      title="Card title"
                      description="This is the description"
                    />
                  </Skeleton>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Todo;
