import Post from './post'
import './styles/styles.css'
import svg from './assets/download.svg'

const post = new Post('New post title', svg)

console.log('Post to string', post.toString()) 