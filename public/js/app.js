class UserDashboard extends React.Component {
    state = {
        users: [],
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        client.getUsers((users) => {
                console.log("users", users)
                this.setState({users: users})
            }
        );
    };

    handleLoginChange = (id, input) => {
      let users = this.state.users.map(user => {
        if (user.id === id) {
          user.login = input.target.value
        }
        return user
      })
      this.setState({ users })
    };

    handleLoginEditingModeChange = (id) => {
      let users = this.state.users.map(user => {
        if (user.id === id) {
          user.isEditing = !user.isEditing
        }
        return user
      })
      this.setState({ users })
    }

    handleDeleteUsert = (id) => {
      let users = this.state.users.filter(user => user.id !== id )
      this.setState({ users })
    };

    render() {
      let users = this.state.users
      let userCards = users.map((user) => {
          console.log(user.id)
          return <UserInfoCard
              key = {user.id}
              id = {user.id}
              login = {user.login}
              image = {user.avatar_url}
              url = {user.html_url}
              handleLoginChange = {this.handleLoginChange}
              handleLoginEditingModeChange = {this.handleLoginEditingModeChange}
              isEditing = {user.isEditing}
              handleDeleteUsert = {this.handleDeleteUsert}
              />
      })
      return (
            <div className='ui unstackable items'>
            {userCards}
            </div>
        )
    }
}

class UserInfoCard extends React.Component {

    handleUpVote() {
      console.log("upvote")
    }

    render() {
      let login

      if (this.props.isEditing) {
          login =  <input
            type='text'
            value={this.props.login}
            onChange={(input) => this.props.handleLoginChange(this.props.id, input)}
            />
      } else {
        login = this.props.login
      }


        return (
            <div className='item'>
            <div className='image'>
            <img src={this.props.image} />
            </div>
        <div className='middle aligned content'>
            <div className='header'>
            Login: { login } &nbsp;
            <a onClick={() => this.props.handleLoginEditingModeChange(this.props.id)}>
            {this.props.isEditing ? "Done" : "Edit"}
            </a>
    </div>
        <div className='description'>
            You can visit github page by clicking url below
            <p>
            some description
            </p>
            <a href={this.props.url}>
            github url
            </a>
            </div>
            <div className='middle aligned content'>
              <a onClick={() => this.props.handleDeleteUsert(this.props.id)} style ={{color: 'red'}}>
              Delete
              </a>
            </div>
        </div>

        </div>
    );
    }
}



ReactDOM.render(
< UserDashboard / >,
    document.getElementById('content')
)
