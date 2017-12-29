import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlogTile from './subcomponents/BlogTile';

// import axios
import axios from 'axios';

class User extends Component{
    constructor(){
        super()

        this.state={
            user: {},
            posts: []
        }
    }

    // insert componentWillMount
    componentWillMount(){
        axios.get(`/api/user/${this.props.match.params.id}`).then( res => {
            console.log(res.data);
            this.setState({ user: res.data });
        }).catch( err => console.log(err) );

        axios.get(`/api/blogs?userID=${this.props.match.params.id}`).then( res => {
            console.log(res.data);
            this.setState({ posts: res.data });
        }).catch( err => console.log(err) );

        // BLACK DIAMOND
        // axios.all(
        //     () => axios.get(`/api/user/${this.props.match.params.id}`),
        //     () => axios.get(`/api/blogs?userID=${this.props.match.params.id}`)
        // ).then( axios.spread( ( usr, blgs ) => {
        //     console.log(usr, blgs);
        //     this.setState({ 
        //         user: usr.data, 
        //         posts: blgs 
        //     });
        // })).catch( err => console.log(err) );
    }
    

    render(){
        const user = this.state.user
        const posts = this.state.posts.map((c,i)=><BlogTile key={i} blog={c}/>)
        return (
            <div className='content'>
                <div className="profile">
                        {user.img ? <img src={user.img} alt="profile pic"/> :<img src={'https://unsplash.it/300/?random'} alt="profile pic"/>}
                        <span>
                            <h1>{user.name}</h1>
                            <p>{user.desc}</p>
                            <Link to={`/user/${user.id}/edit`}>
                                <button className="edit-user">Edit User</button>
                            </Link>
                        </span>
                </div>
                <div className="post-list">
                    <h2>Posts by User:</h2>
                    {posts.length? posts : <p>No Blog Posts from this User</p>}
                </div>
            </div>
        )
    }
}

export default User