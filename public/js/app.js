class UserDashboard extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    client.getUsers((users) => {
      this.setState({
        users: users,
      });
    });
  };

  handleLoginChange = (id, input) => {
    let users = this.state.users.map((user) => {
      if (user.id === id) {
        user.login = input.target.value;
      }
      return user;
    });
    this.setState({
      users,
    });
  };

  handleLoginEditingModeChange = (id) => {
    let users = this.state.users.map((user) => {
      if (user.id === id) {
        user.isEditing = !user.isEditing;
      }
      return user;
    });
    this.setState({
      users,
    });
  };

  handleDeleteUsert = (id) => {
    let users = this.state.users.filter((user) => user.id !== id);
    this.setState({
      users,
    });
  };

  onFormSubmit = (user) => {
    let users = this.state.users;
    let id = users.length > 0 ? users[users.length - 1].id + 1 : 0;
    user.id = id;
    users.push(user);
    this.setState({ users });
  };

  render() {
    return (
      <div className="ui unstackable items">
        <UserList
          users={this.state.users}
          handleLoginChange={this.handleLoginChange}
          handleLoginEditingModeChange={this.handleLoginEditingModeChange}
          handleDeleteUsert={this.handleDeleteUsert}
        />
        <ToggleableUserForm onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

class UserList extends React.Component {
  render() {
    let users = this.props.users;
    let userCards = users.map((user) => {
      return (
        <UserInfoCard
          key={user.id}
          id={user.id}
          login={user.login}
          image={user.avatar_url}
          url={user.html_url}
          handleLoginChange={this.props.handleLoginChange}
          handleLoginEditingModeChange={this.props.handleLoginEditingModeChange}
          isEditing={user.isEditing}
          handleDeleteUsert={this.props.handleDeleteUsert}
        />
      );
    });
    return <div className="ui unstackable items">{userCards}</div>;
  }
}

class UserInfoCard extends React.Component {
  render() {
    let login;
    if (this.props.isEditing) {
      login = (
        <input
          type="text"
          value={this.props.login}
          onChange={(input) =>
            this.props.handleLoginChange(this.props.id, input)
          }
        />
      );
    } else {
      login = this.props.login;
    }

    return (
      <div className="item">
        <div className="image">
          <img src={this.props.image} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            Login: {login} &nbsp;
            <a
              onClick={() =>
                this.props.handleLoginEditingModeChange(this.props.id)
              }
            >
              {this.props.isEditing ? "Done" : "Edit"}
            </a>
          </div>
          <div className="description">
            You can visit github page by clicking url below
            <a href={this.props.url}>github url</a>
          </div>
          <div className="middle aligned content">
            <a
              onClick={() => this.props.handleDeleteUsert(this.props.id)}
              style={{ color: "red" }}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableUserForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (user) => {
    this.props.onFormSubmit(user);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <UserForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class UserForm extends React.Component {
  state = {
    login: this.props.login || "",
    image: this.props.login || "",
    url: this.props.image || "",
  };

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };

  handleimageChange = (e) => {
    this.setState({ image: e.target.value });
  };

  handleUrlChange = (e) => {
    this.setState({ url: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      login: this.state.login,
      avatar_url: this.state.image,
      html_url: this.state.url,
    });
  };

  render() {
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Login</label>
              <input
                type="text"
                value={this.state.login}
                onChange={this.handleLoginChange}
              />
            </div>
            <div className="field">
              <label>Image Url</label>
              <input
                type="text"
                value={this.state.image}
                onChange={this.handleimageChange}
              />
            </div>
            <div className="field">
              <label>Github Url</label>
              <input
                type="text"
                value={this.state.url}
                onChange={this.handleUrlChange}
              />
            </div>
            <div className="ui two bottom attached buttons">
              <button
                className="ui basic blue button"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <button
                className="ui basic red button"
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<UserDashboard />, document.getElementById("content"));
