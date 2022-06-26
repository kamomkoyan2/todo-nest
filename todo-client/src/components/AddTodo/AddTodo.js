import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { createTodo } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { DatePicker, Space } from "antd";
import "./todo.css";

const AddTodo = () => {
  // const [todo, setTodo] = useState(initaialValue)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateAt, setDueDateAt] = useState("");

  // const {title, description} = todo;
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState([]);

  const navigate = useNavigate();

  const enterLoading = (index, event) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });
    setTimeout(() => {
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = false;
        return newLoading;
      });
    }, 4000);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const dueDateChange = (dueDate, dateString) => {
    setDueDateAt(dueDate);
  };

  const handleSubmit = (event) => {
    setState(!state);
    const todo = {
      title: title,
      description: description,
      dueDateAt: dueDateAt,
    };
    setTimeout(async () => {
      event.preventDefault();
      await createTodo(todo);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container">
      <Row>
        <Col span={6}>
          <Input
            placeholder="title..."
            name="title"
            value={title}
            onChange={onTitleChange}
          />
          <Input
            placeholder="description"
            name="description"
            value={description}
            onChange={onDescriptionChange}
          />
          <Space direction="vertical">
            <DatePicker
              format="YYYY-MM-DD"
              name="dueDateAt"
              value={dueDateAt}
              onChange={dueDateChange}
            />
          </Space>
          {!state ? (
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={handleSubmit}
            >
              Add Todo
            </Button>
          ) : (
            <Button style={{ width: "100%" }} type="primary" loading></Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AddTodo;
