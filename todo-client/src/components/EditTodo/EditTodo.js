import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { createTodo, editTodo, getTodos } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "antd";
import Moment from "moment";

import { DatePicker, Space } from "antd";


const AddTodo = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateAt, setDueDateAt] = useState("");

  const { id } = useParams();

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadTodoDetails();
  }, []);

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

  const loadTodoDetails = async () => {
    const response = await getTodos(id);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setDueDateAt(Moment(response.data.dueDateAt).format("YYYY-MM-DD"));
  };

  const editTodoDetails = async () => {
    const todo = {
      title: title,
      description: description,
      dueDateAt: dueDateAt,
    };
    await editTodo(id, todo);
    navigate("/");
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
            onChange={(e) => onTitleChange(e)}
          />
          <Input
            placeholder="description"
            name="description"
            value={description}
            onChange={(e) => onDescriptionChange(e)}
          />
          <Space direction="vertical">
            <DatePicker
              format="YYYY-MM-DD"
              name="dueDateAt"
              value={Moment(dueDateAt)}
              onChange={dueDateChange}
            />
          </Space>
          {/* <DatePicker placeholder='select date' name="dueDateAt" value={dueDateAt} onChange={(e) => onValueChange(e)} /> */}
          {!state ? (
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={editTodoDetails}
            >
              Edit Todo
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
