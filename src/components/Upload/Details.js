import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UploadNav from "./UploadNav";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      title: "",
      desc: "",
      price: "",
      category: "",
    };
  }

  componentDidUpdate() {
    if (this.state.error === false) {
      this.props.onSuccess(this.state);
    }
  }

  // On Change
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //   On Submit
  handleSubmit = (e) => {
    e.preventDefault();
    let TheError = false;
    const { title, price, desc, category } = this.state;
    if (title.length < 5) TheError = "Title Is Too Short";
    else if (desc.length < 15) TheError = "Description Is Too Short";
    else if (price === "") TheError = "Input A Valid Price";
    else if (category === "") TheError = "Choose A Category";
    this.setState({ error: TheError });
  };

  render() {
    return (
      <div className="upload">
        <div className="drop">
          <form className="upload-form" noValidate onSubmit={this.handleSubmit}>
            <UploadNav active="Details" />
            <div className="outerContainer">
              <div className="form-control">
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  className="input"
                  id="title"
                  value={this.state.title}
                  placeholder="Enter the title"
                  name="title"
                  onChange={this.handleChange}
                  autoFocus="autofocus"
                  noValidate
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="input"
                  id="description"
                  value={this.state.desc}
                  placeholder="Description"
                  name="desc"
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className="flex">
                <span className="custom-dropdown">
                  <select onChange={this.handleChange} name="category">
                    <option value="" selected disabled hidden>
                      Category
                    </option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Vehicles</option>
                    <option>Fashion</option>
                    <option>Houses</option>
                    <option>Hobbies</option>
                    <option>Other</option>
                  </select>
                </span>
                <span className="unit">$</span>
                <input
                  className="input"
                  id="price"
                  placeholder=" Price"
                  type="number"
                  name="price"
                  noValidate
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
              <div className="hint" id="err" style={{ color: "red" }}>
                {this.state.error}
              </div>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                <span>Next</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
